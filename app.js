/**
 * ============================================================================
 * NovaStream Live TV — Web App Engine (Android TV & Mobile WebApp Ready)
 * ============================================================================
 */

// Load verified channels from tamil-channels.js (or fallback to empty array if not loaded)
const MANUALLY_ADDED_CHANNELS = (typeof VERIFIED_TAMIL_CHANNELS !== 'undefined' ? VERIFIED_TAMIL_CHANNELS : []).map((ch, idx) => ({
  id: ch.id || 'tam_user_' + idx,
  name: ch.name || 'Tamil Channel ' + (idx + 1),
  category: ch.category || 'General',
  language: ch.language || 'Tamil',
  country: ch.country || 'IN',
  logo: ch.logo || 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=TV',
  url: ch.url
}));

// Create lookup set of pre-verified URLs so they are NEVER filtered out
const VERIFIED_URLS_SET = new Set(MANUALLY_ADDED_CHANNELS.map(ch => ch.url));

// Stream Quality Validator & Dead Link Filter
function isStreamUrlWorkingAndPublic(url, name = '') {
  if (!url || !url.startsWith('http')) return false;
  
  // Whitelist all user-provided & verified built-in links
  if (VERIFIED_URLS_SET.has(url)) return true;
  
  const lowerUrl = url.toLowerCase();
  const lowerName = name.toLowerCase();

  // Filter out known broken / geoblocked / DRM protected commercial channel names from unverified IPTV dumps
  if (lowerName.includes('colors tamil') || lowerName.includes('colors tv tamil') || 
      lowerName.includes('star vijay hd') || lowerName.includes('vijay takkar')) {
    return false;
  }

  // Filter out private / local cable network IP ranges & non-public streaming ports (unless whitelisted above)
  if (lowerUrl.includes('://103.') || lowerUrl.includes('://149.') || lowerUrl.includes('://202.') || 
      lowerUrl.includes('://45.77.') || lowerUrl.includes(':8080/') || lowerUrl.includes(':8000/') || 
      lowerUrl.includes(':8002/') || lowerUrl.includes(':5001/') || lowerUrl.includes(':1935/')) {
    return false;
  }

  // Filter out DASH (.mpd), scraping scripts (.php), and time-bound expired token URLs (hmac / exp)
  if (lowerUrl.endsWith('.mpd') || lowerUrl.includes('.php?id=') || lowerUrl.includes('hmac=') || lowerUrl.includes('~exp=')) {
    return false;
  }

  return true;
}

// Application State (ALL CHANNELS IN 1 PAGE: pageSize = 1000!)
const state = {
  allChannels: [],
  filteredChannels: [],
  categories: new Map(),
  favorites: new Set(JSON.parse(localStorage.getItem('novastream_favorites') || '[]')),
  activeCategory: 'all', // Start on Main Page with ALL Tamil channels sorted first at the top!
  searchQuery: '',
  currentPage: 1,
  pageSize: 1000, // 1000 items per page ensures all Tamil & Indian channels list together in 1 page!
  currentChannelIndex: -1,
  currentChannel: null,
  hlsInstance: null,
  viewMode: 'grid',
  autoProxyActive: false,
  dataSaver: true // Data Saver enabled silently in background
};

// DOM Elements
const elements = {
  videoPlayer: document.getElementById('video-player'),
  videoContainer: document.getElementById('video-container'),
  videoOverlay: document.getElementById('video-overlay'),
  playerTitle: document.getElementById('player-channel-title'),
  playerLogo: document.getElementById('player-channel-logo'),
  playerCategory: document.getElementById('player-category-badge'),
  playerLanguage: document.getElementById('player-language-badge'),
  playerStatus: document.getElementById('player-status-badge'),
  statusText: document.getElementById('status-text'),
  
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  categoryList: document.getElementById('category-list'),
  channelGrid: document.getElementById('channel-grid'),
  emptyState: document.getElementById('empty-state'),
  currentCategoryTitle: document.getElementById('current-category-title'),
  visibleCountBadge: document.getElementById('visible-count-badge'),
  totalChannelsCount: document.getElementById('total-channels-count'),
  
  pagePrevBtn: document.getElementById('page-prev-btn'),
  pageNextBtn: document.getElementById('page-next-btn'),
  pageIndicator: document.getElementById('page-indicator'),
  
  viewGridBtn: document.getElementById('view-grid-btn'),
  viewListBtn: document.getElementById('view-list-btn'),
  
  favoriteToggleBtn: document.getElementById('favorite-toggle-btn'),
  pipBtn: document.getElementById('pip-btn'),
  prevChannelBtn: document.getElementById('prev-channel-btn'),
  nextChannelBtn: document.getElementById('next-channel-btn'),
  fullscreenBtn: document.getElementById('fullscreen-btn'),
  fullscreenBackBtn: document.getElementById('fullscreen-back-btn'),
  aspectSelect: document.getElementById('aspect-select'),
  
  loadingOverlay: document.getElementById('loading-overlay'),
  loadingTitle: document.getElementById('loading-title'),
  loadingStatus: document.getElementById('loading-status'),
  progressBar: document.getElementById('progress-bar'),
  
  welcomeModal: document.getElementById('welcome-modal'),
  closeWelcomeModalBtn: document.getElementById('close-welcome-modal-btn'),
  confirmWelcomeBtn: document.getElementById('confirm-welcome-btn'),
  
  offlineModal: document.getElementById('offline-modal'),
  closeOfflineModalBtn: document.getElementById('close-offline-modal-btn'),
  popupNextBtn: document.getElementById('popup-next-btn'),
  offlineMessage: document.getElementById('offline-message'),
  
  playlistModal: document.getElementById('playlist-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  playlistUrlInput: document.getElementById('playlist-url-input'),
  reloadPlaylistBtn: document.getElementById('reload-playlist-btn'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  
  logoHomeBtn: document.getElementById('logo-home-btn'),
  
  // Bottom Nav Tabs
  tabHome: document.getElementById('tab-home'),
  tabSearch: document.getElementById('tab-search'),
  tabFav: document.getElementById('tab-fav'),
  tabSettings: document.getElementById('tab-settings')
};

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  
  // Show welcome educational disclaimer modal if not acknowledged
  if (!localStorage.getItem('novastream_edu_disclaimer_ack')) {
    if (elements.welcomeModal) elements.welcomeModal.classList.remove('hidden');
  }

  loadPlaylist(elements.playlistUrlInput ? elements.playlistUrlInput.value : 'https://iptv-org.github.io/iptv/index.m3u');
});

/**
 * Setup UI Event Listeners
 */
function setupEventListeners() {
  if (elements.logoHomeBtn) {
    elements.logoHomeBtn.addEventListener('click', () => {
      setActiveBottomTab(elements.tabHome);
      selectCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Welcome Modal Actions
  if (elements.closeWelcomeModalBtn) {
    elements.closeWelcomeModalBtn.addEventListener('click', () => {
      elements.welcomeModal.classList.add('hidden');
      localStorage.setItem('novastream_edu_disclaimer_ack', 'true');
    });
  }
  if (elements.confirmWelcomeBtn) {
    elements.confirmWelcomeBtn.addEventListener('click', () => {
      elements.welcomeModal.classList.add('hidden');
      localStorage.setItem('novastream_edu_disclaimer_ack', 'true');
    });
  }

  // Search
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (elements.clearSearchBtn) elements.clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
      applyFilters();
    });
  }

  if (elements.clearSearchBtn) {
    elements.clearSearchBtn.addEventListener('click', () => {
      elements.searchInput.value = '';
      state.searchQuery = '';
      elements.clearSearchBtn.classList.add('hidden');
      applyFilters();
    });
  }

  // Offline Popup Modal Actions
  if (elements.closeOfflineModalBtn) {
    elements.closeOfflineModalBtn.addEventListener('click', () => elements.offlineModal.classList.add('hidden'));
  }
  if (elements.popupNextBtn) {
    elements.popupNextBtn.addEventListener('click', () => {
      elements.offlineModal.classList.add('hidden');
      playNextChannel();
    });
  }

  // Bottom Nav Tabs
  if (elements.tabHome) {
    elements.tabHome.addEventListener('click', () => {
      setActiveBottomTab(elements.tabHome);
      selectCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (elements.tabSearch) {
    elements.tabSearch.addEventListener('click', () => {
      setActiveBottomTab(elements.tabSearch);
      if (elements.searchInput) elements.searchInput.focus();
      window.scrollTo({ top: elements.channelGrid.offsetTop - 80, behavior: 'smooth' });
    });
  }

  if (elements.tabFav) {
    elements.tabFav.addEventListener('click', () => {
      setActiveBottomTab(elements.tabFav);
      selectCategory('favorites');
      window.scrollTo({ top: elements.channelGrid.offsetTop - 80, behavior: 'smooth' });
    });
  }

  if (elements.tabSettings) {
    elements.tabSettings.addEventListener('click', () => {
      setActiveBottomTab(elements.tabSettings);
      if (elements.playlistModal) elements.playlistModal.classList.remove('hidden');
    });
  }

  // View Mode & Pagination
  if (elements.viewGridBtn) elements.viewGridBtn.addEventListener('click', () => setViewMode('grid'));
  if (elements.viewListBtn) elements.viewListBtn.addEventListener('click', () => setViewMode('list'));

  if (elements.pagePrevBtn) {
    elements.pagePrevBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderGrid();
        window.scrollTo({ top: elements.channelGrid.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  if (elements.pageNextBtn) {
    elements.pageNextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(state.filteredChannels.length / state.pageSize);
      if (state.currentPage < totalPages) {
        state.currentPage++;
        renderGrid();
        window.scrollTo({ top: elements.channelGrid.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  // Player Controls
  if (elements.prevChannelBtn) elements.prevChannelBtn.addEventListener('click', playPreviousChannel);
  if (elements.nextChannelBtn) elements.nextChannelBtn.addEventListener('click', playNextChannel);
  if (elements.fullscreenBtn) elements.fullscreenBtn.addEventListener('click', toggleFullScreen);
  if (elements.fullscreenBackBtn) elements.fullscreenBackBtn.addEventListener('click', toggleFullScreen);

  document.addEventListener('fullscreenchange', updateFullscreenButtonState);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);

  if (elements.aspectSelect) {
    elements.aspectSelect.addEventListener('change', (e) => {
      elements.videoPlayer.className = '';
      if (e.target.value !== 'default') {
        elements.videoPlayer.classList.add(`aspect-${e.target.value.replace(':', '-')}`);
      }
    });
  }

  if (elements.favoriteToggleBtn) {
    elements.favoriteToggleBtn.addEventListener('click', () => {
      if (state.currentChannel) {
        toggleFavorite(state.currentChannel);
        updatePlayerFavoriteIcon();
        updateSidebarCounts();
        if (state.activeCategory === 'favorites') applyFilters();
        else renderGrid();
      }
    });
  }

  if (elements.pipBtn) {
    elements.pipBtn.addEventListener('click', async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (elements.videoPlayer !== document.pictureInPictureElement) {
          await elements.videoPlayer.requestPictureInPicture();
        }
      } catch (err) { console.warn('PiP not supported', err); }
    });
  }

  // Playlist Modal
  if (elements.closeModalBtn) {
    elements.closeModalBtn.addEventListener('click', () => elements.playlistModal.classList.add('hidden'));
  }
  
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (elements.playlistUrlInput) elements.playlistUrlInput.value = e.target.getAttribute('data-url');
    });
  });

  if (elements.reloadPlaylistBtn) {
    elements.reloadPlaylistBtn.addEventListener('click', () => {
      if (elements.playlistModal) elements.playlistModal.classList.add('hidden');
      loadPlaylist(elements.playlistUrlInput ? elements.playlistUrlInput.value : 'https://iptv-org.github.io/iptv/index.m3u', true);
    });
  }

  if (elements.resetFiltersBtn) {
    elements.resetFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Keyboard & D-Pad Remote Control Shortcuts (Android TV)
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Set Active Bottom Navigation Tab
 */
function setActiveBottomTab(activeTab) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  if (activeTab) activeTab.classList.add('active');
}

/**
 * Android TV & Keyboard Shortcuts Handler (Remote D-Pad support)
 */
function handleKeyboardShortcuts(e) {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
  switch (e.key) {
    case ' ':
    case 'Enter':
      // If focused element is a button or channel card, click it!
      if (document.activeElement && (document.activeElement.classList.contains('channel-card') || document.activeElement.tagName === 'BUTTON')) {
        document.activeElement.click();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (elements.videoPlayer.paused) elements.videoPlayer.play();
        else elements.videoPlayer.pause();
      }
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleFullScreen();
      break;
    case 'm':
    case 'M':
      elements.videoPlayer.muted = !elements.videoPlayer.muted;
      break;
    case 'ArrowLeft':
      if (!document.activeElement || document.activeElement === document.body) {
        e.preventDefault();
        playPreviousChannel();
      }
      break;
    case 'ArrowRight':
      if (!document.activeElement || document.activeElement === document.body) {
        e.preventDefault();
        playNextChannel();
      }
      break;
    case '/':
      e.preventDefault();
      if (elements.searchInput) elements.searchInput.focus();
      break;
  }
}

/**
 * Toggle Full Screen for TV & Mobile Users
 */
async function toggleFullScreen() {

    try {

        if (!document.fullscreenElement) {

            await elements.videoContainer.requestFullscreen();

            if (screen.orientation && screen.orientation.lock) {
                try {
                    await screen.orientation.lock("landscape");
                } catch(e){}
            }

        } else {

            await document.exitFullscreen();

            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }

        }

    } catch(err){
        console.log(err);
    }

    updateFullscreenButtonState();
}
document.addEventListener("fullscreenchange", () => {

    updateFullscreenButtonState();

    if (!document.fullscreenElement) {

        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }

    }

});

/**
 * Update Fullscreen Back Button Visibility State
 */
function updateFullscreenButtonState() {
  if (!elements.fullscreenBackBtn) return;
  const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
  elements.fullscreenBackBtn.classList.toggle('hidden', !isFull);
  if (elements.videoContainer) elements.videoContainer.classList.toggle('is-fullscreen', isFull);
}

/**
 * Set View Mode
 */
function setViewMode(mode) {
  state.viewMode = mode;
  if (elements.viewGridBtn) elements.viewGridBtn.classList.toggle('active', mode === 'grid');
  if (elements.viewListBtn) elements.viewListBtn.classList.toggle('active', mode === 'list');
  if (elements.channelGrid) elements.channelGrid.className = `channel-grid ${mode}-mode`;
}

/**
 * Ultra-fast string hash for IDs
 */
function fastHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Ultra-fast attribute extractor using native indexOf
 */
function getAttr(line, attr) {
  const target = attr + '="';
  const idx = line.indexOf(target);
  if (idx === -1) return '';
  const start = idx + target.length;
  const end = line.indexOf('"', start);
  return end !== -1 ? line.substring(start, end) : '';
}

/**
 * Identify Language of Channel from metadata or title
 */
function detectChannelLanguage(name, category, country, url) {
  const text = `${name} ${category} ${url}`.toLowerCase();
  
  if (text.includes('tamil') || text.includes('sun tv') || text.includes('ktv') || text.includes('vijay') || 
      text.includes('puthiya') || text.includes('thanthi') || text.includes('polimer') || text.includes('kalaignar') || 
      text.includes('podhigai') || text.includes('/tam') || text.includes('raj tv') || text.includes('sathiyam') || 
      text.includes('lotus') || text.includes('makkal') || text.includes('captain') || text.includes('chithiram') || 
      text.includes('siripoli') || text.includes('murasu') || text.includes('roja') || text.includes('shalini') || text.includes('olitv') ||
      text.includes('tangotv') || text.includes('ottlive.co.in') || text.includes('pishow.tv') || text.includes('massstream.net') ||
      text.includes('smartplaytv.in') || text.includes('sivantv') || text.includes('cmr24.fm') || text.includes('d6-pro.com')) {
    return 'Tamil';
  }
  if (text.includes('hindi') || text.includes('aaj tak') || text.includes('ndtv india') || text.includes('abp news') || 
      text.includes('star plus') || text.includes('zee tv') || text.includes('/hin') || text.includes('sony')) {
    return 'Hindi';
  }
  if (text.includes('telugu') || text.includes('maa tv') || text.includes('etv telugu') || text.includes('/tel') || text.includes('gemini tv')) {
    return 'Telugu';
  }
  if (text.includes('kannada') || text.includes('colors kannada') || text.includes('suvarna') || text.includes('/kan') || text.includes('udaya tv')) {
    return 'Kannada';
  }
  if (text.includes('malayalam') || text.includes('asianet') || text.includes('manorama') || text.includes('/mal') || text.includes('surya tv')) {
    return 'Malayalam';
  }
  if (country === 'IN') {
    return 'Indian';
  }
  if (text.includes('english') || text.includes('bbc') || text.includes('cnn') || text.includes('sky news') || text.includes('/eng')) {
    return 'English';
  }
  return 'Other';
}

/**
 * Sort Channels by Priority (Tamil First -> Indian Languages -> Other)
 */
function sortChannelsByPriority(channelsList) {
  return channelsList.sort((a, b) => {
    const getPriorityScore = (ch) => {
      if (ch.id && (ch.id.startsWith('tam_') || ch.id.startsWith('tam_user_'))) return 0; // Manual & verified Tamil channels FIRST!
      if (ch.language === 'Tamil' || (ch.name && ch.name.toLowerCase().includes('tamil'))) return 1;
      if (['Hindi', 'Telugu', 'Kannada', 'Malayalam', 'Indian'].includes(ch.language) || ch.country === 'IN') return 2;
      return 3;
    };
    const scoreA = getPriorityScore(a);
    const scoreB = getPriorityScore(b);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Merge manual Tamil channels with any playlist and sort them first
 */
function mergeAndSortChannels(incomingChannels) {
  const combined = [...MANUALLY_ADDED_CHANNELS];
  const existingUrls = new Set(combined.map(c => c.url));
  
  if (incomingChannels && Array.isArray(incomingChannels)) {
    for (const ch of incomingChannels) {
      if (ch && ch.url && !existingUrls.has(ch.url)) {
        if (!isStreamUrlWorkingAndPublic(ch.url, ch.name)) continue;
        combined.push(ch);
        existingUrls.add(ch.url);
      }
    }
  }
  return sortChannelsByPriority(combined);
}

/**
 * IndexedDB Caching Engine
 */
const DB_NAME = 'NovaStreamCacheDB';
const STORE_NAME = 'playlists';

function openCacheDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCachedPlaylist(url) {
  try {
    const db = await openCacheDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(url);
      req.onsuccess = () => {
        const data = req.result;
        if (data && data.channels && (Date.now() - data.timestamp < 86400000)) resolve(data.channels);
        else resolve(null);
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) { return null; }
}

async function saveCachedPlaylist(url, channels) {
  try {
    const db = await openCacheDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ timestamp: Date.now(), channels: channels }, url);
  } catch (err) { console.warn('Cache error:', err); }
}

/**
 * Load and Parse M3U Playlist (With Filtered Working Streams)
 */
async function loadPlaylist(url, forceReload = false) {
  if (elements.loadingOverlay) elements.loadingOverlay.classList.remove('fade-out', 'hidden');
  if (elements.loadingTitle) elements.loadingTitle.textContent = 'Loading Live TV Channels...';
  if (elements.loadingStatus) elements.loadingStatus.textContent = 'Filtering and validating working Tamil streams...';
  if (elements.progressBar) elements.progressBar.style.width = '20%';

  if (!forceReload) {
    const cachedChannels = await getCachedPlaylist(url);
    if (cachedChannels && cachedChannels.length > 0) {
      if (elements.loadingStatus) elements.loadingStatus.textContent = 'Loaded from instant cache! Prioritizing Tamil channels...';
      if (elements.progressBar) elements.progressBar.style.width = '90%';
      setTimeout(() => {
        const mergedCache = mergeAndSortChannels(cachedChannels);
        applyParsedChannels(mergedCache);
        if (elements.progressBar) elements.progressBar.style.width = '100%';
        setTimeout(() => {
          if (elements.loadingOverlay) {
            elements.loadingOverlay.classList.add('fade-out');
            setTimeout(() => elements.loadingOverlay.classList.add('hidden'), 300);
          }
        }, 150);
      }, 20);
      return;
    }
  }

  try {
    if (elements.loadingTitle) elements.loadingTitle.textContent = 'Extracting Live Channels...';
    if (elements.loadingStatus) elements.loadingStatus.textContent = 'Downloading M3U playlists from online repositories...';
    if (elements.progressBar) elements.progressBar.style.width = '40%';

    // Fetch primary M3U AND official iptv-org Tamil playlist in parallel
    const [mainRes, tamilRes] = await Promise.allSettled([
      fetch(url),
      fetch('https://iptv-org.github.io/iptv/languages/tam.m3u')
    ]);

    let m3uText = '';
    if (mainRes.status === 'fulfilled' && mainRes.value.ok) {
      m3uText = await mainRes.value.text();
    }
    let tamilText = '';
    if (tamilRes.status === 'fulfilled' && tamilRes.value.ok) {
      tamilText = await tamilRes.value.text();
    }
    
    if (elements.loadingStatus) elements.loadingStatus.textContent = 'Lightning-fast parsing & quality stream filtering...';
    if (elements.progressBar) elements.progressBar.style.width = '80%';

    setTimeout(() => {
      const parsedMain = m3uText ? parseM3UFast(m3uText) : [];
      const parsedTamil = tamilText ? parseM3UFast(tamilText) : [];
      
      const sortedChannels = mergeAndSortChannels([...parsedTamil, ...parsedMain]);
      applyParsedChannels(sortedChannels);
      saveCachedPlaylist(url, sortedChannels);
      
      if (elements.progressBar) elements.progressBar.style.width = '100%';
      setTimeout(() => {
        if (elements.loadingOverlay) {
          elements.loadingOverlay.classList.add('fade-out');
          setTimeout(() => elements.loadingOverlay.classList.add('hidden'), 300);
        }
      }, 150);
    }, 20);

  } catch (error) {
    console.error('Error loading M3U playlist:', error);
    applyParsedChannels(sortChannelsByPriority([...MANUALLY_ADDED_CHANNELS]));
    if (elements.loadingOverlay) {
      elements.loadingOverlay.classList.add('fade-out');
      setTimeout(() => elements.loadingOverlay.classList.add('hidden'), 300);
    }
  }
}

/**
 * Ultra-Fast M3U Parser
 */
function parseM3UFast(content) {
  const lines = content.split(/\r?\n/);
  const channels = [];
  let currentChannel = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      currentChannel = {};
      const nameAttr = getAttr(line, 'tvg-name');
      const logoAttr = getAttr(line, 'tvg-logo');
      const groupAttr = getAttr(line, 'group-title');
      const countryAttr = getAttr(line, 'tvg-country');
      
      const commaIndex = line.lastIndexOf(',');
      const titleAfterComma = commaIndex !== -1 ? line.substring(commaIndex + 1).trim() : 'Unknown Channel';

      currentChannel.name = nameAttr ? nameAttr.trim() : titleAfterComma;
      currentChannel.logo = logoAttr ? logoAttr.trim() : '';
      
      let category = groupAttr ? groupAttr.trim() : 'General';
      if (category.includes(';')) category = category.split(';')[0].trim();
      if (!category) category = 'General';
      currentChannel.category = category;

      let country = countryAttr ? countryAttr.trim().toUpperCase() : 'INTL';
      if (country.length > 4) country = 'INTL';
      currentChannel.country = country;
      
    } else if (!line.startsWith('#')) {
      if (line.startsWith('http://') || line.startsWith('https://')) {
        currentChannel.url = line;
        currentChannel.id = 'ch_' + channels.length + '_' + fastHash(currentChannel.url);
        currentChannel.language = detectChannelLanguage(currentChannel.name, currentChannel.category, currentChannel.country, currentChannel.url);
        
        if (currentChannel.name && currentChannel.url && isStreamUrlWorkingAndPublic(currentChannel.url, currentChannel.name)) {
          channels.push({ ...currentChannel });
        }
      }
    }
  }
  return channels;
}

/**
 * Apply extracted channels to state and UI
 */
function applyParsedChannels(channels) {
  state.categories.clear();

  for (let i = 0; i < channels.length; i++) {
    const ch = channels[i];
    const catCount = state.categories.get(ch.category) || 0;
    state.categories.set(ch.category, catCount + 1);
  }

  state.allChannels = channels;
  if (elements.totalChannelsCount) elements.totalChannelsCount.textContent = channels.length.toLocaleString();

  renderSidebarCategories();
  selectCategory(state.activeCategory);

  if (channels.length > 0 && !state.currentChannel) {
    previewChannelMeta(channels[0]);
  }
}

/**
 * Render Categories in Sidebar
 */
function renderSidebarCategories() {
  const container = elements.categoryList;
  if (!container) return;
  
  const allBtn = container.querySelector('[data-category="all"]');
  const tamilBtn = container.querySelector('[data-category="tamil"]');
  const favBtn = container.querySelector('[data-category="favorites"]');
  
  if (allBtn) allBtn.querySelector('.cat-count').textContent = state.allChannels.length;
  if (tamilBtn) tamilBtn.querySelector('.cat-count').textContent = state.allChannels.filter(ch => ch.language === 'Tamil').length;
  if (favBtn) favBtn.querySelector('.cat-count').textContent = state.favorites.size;

  container.innerHTML = '';
  if (allBtn) container.appendChild(allBtn);
  if (tamilBtn) container.appendChild(tamilBtn);
  if (favBtn) container.appendChild(favBtn);

  const sortedCategories = Array.from(state.categories.entries()).sort((a, b) => b[1] - a[1]);

  sortedCategories.forEach(([category, count]) => {
    if (count === 0) return;
    const btn = document.createElement('button');
    btn.className = `category-item ${state.activeCategory === category ? 'active' : ''}`;
    btn.setAttribute('data-category', category);
    btn.setAttribute('tabindex', '0'); // Android TV focusable!
    
    let icon = 'fa-tv';
    const lower = category.toLowerCase();
    if (lower.includes('news')) icon = 'fa-newspaper';
    else if (lower.includes('movie') || lower.includes('cinema')) icon = 'fa-film';
    else if (lower.includes('sport')) icon = 'fa-basketball';
    else if (lower.includes('music')) icon = 'fa-music';
    else if (lower.includes('kid') || lower.includes('anim')) icon = 'fa-child';
    else if (lower.includes('docu')) icon = 'fa-compass';
    else if (lower.includes('enter')) icon = 'fa-masks-theater';

    btn.innerHTML = `
      <span class="cat-icon"><i class="fa-solid ${icon}"></i></span>
      <span class="cat-name" title="${category}">${category}</span>
      <span class="cat-count">${count}</span>
    `;
    btn.addEventListener('click', () => selectCategory(category));
    container.appendChild(btn);
  });
}

/**
 * Select Category Filter
 */
function selectCategory(category) {
  state.activeCategory = category;
  document.querySelectorAll('.category-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-category') === category);
  });
  
  if (elements.currentCategoryTitle) elements.currentCategoryTitle.textContent = category === 'all' ? 'All Channels' : category === 'tamil' ? '🔥 Tamil Channels' : category === 'favorites' ? 'Favorites' : category;
  applyFilters();
}

/**
 * Apply All Filters
 */
function applyFilters() {
  let filtered = state.allChannels;

  // Filter by Category
  if (state.activeCategory === 'favorites') {
    filtered = filtered.filter(ch => state.favorites.has(ch.id));
  } else if (state.activeCategory === 'tamil') {
    filtered = filtered.filter(ch => ch.language === 'Tamil');
  } else if (state.activeCategory !== 'all') {
    filtered = filtered.filter(ch => ch.category.toLowerCase() === state.activeCategory.toLowerCase());
  }

  // Filter by Search Query
  if (state.searchQuery) {
    filtered = filtered.filter(ch => 
      ch.name.toLowerCase().includes(state.searchQuery) ||
      ch.category.toLowerCase().includes(state.searchQuery) ||
      (ch.language && ch.language.toLowerCase().includes(state.searchQuery)) ||
      ch.country.toLowerCase().includes(state.searchQuery)
    );
  }

  state.filteredChannels = sortChannelsByPriority(filtered);
  state.currentPage = 1;
  if (elements.visibleCountBadge) elements.visibleCountBadge.textContent = `Showing: ${filtered.length.toLocaleString()}`;
  renderGrid();
}

/**
 * Render Channel Cards (All Channels in 1 Page & D-Pad Remote Focusable!)
 */
function renderGrid() {
  const container = elements.channelGrid;
  if (!container) return;
  const total = state.filteredChannels.length;
  
  if (total === 0) {
    container.innerHTML = '';
    if (elements.emptyState) elements.emptyState.classList.remove('hidden');
    updatePaginationControls(0, 0);
    return;
  }

  if (elements.emptyState) elements.emptyState.classList.add('hidden');
  const totalPages = Math.ceil(total / state.pageSize);
  const startIdx = (state.currentPage - 1) * state.pageSize;
  const endIdx = Math.min(startIdx + state.pageSize, total);
  const pageChannels = state.filteredChannels.slice(startIdx, endIdx);

  const fragment = document.createDocumentFragment();

  pageChannels.forEach(channel => {
    const isFav = state.favorites.has(channel.id);
    const isPlaying = state.currentChannel && state.currentChannel.id === channel.id;
    const isTamil = channel.language === 'Tamil';
    const isIndian = channel.language === 'Hindi' || channel.language === 'Telugu' || channel.language === 'Kannada' || channel.language === 'Malayalam' || channel.country === 'IN';

    const card = document.createElement('div');
    card.className = `channel-card ${isPlaying ? 'active-stream' : ''} ${isTamil ? 'priority-tamil' : isIndian ? 'priority-indian' : ''}`;
    card.setAttribute('data-id', channel.id);
    card.setAttribute('tabindex', '0'); // Essential for Android TV D-Pad Remote arrow keys!

    const fallbackLogo = `https://via.placeholder.com/60x60/1e293b/00f0ff?text=${encodeURIComponent(channel.name.substring(0, 2).toUpperCase())}`;
    const logoSrc = channel.logo || fallbackLogo;

    card.innerHTML = `
      <div class="card-top">
        <div class="card-logo">
          <img src="${logoSrc}" alt="${channel.name}" loading="lazy" onerror="this.src='${fallbackLogo}'">
        </div>
        <div class="card-title-box">
          <div class="card-title" title="${channel.name}">${channel.name}</div>
          <div class="card-country">
            ${isTamil ? '<span class="text-pink font-bold">🔥 Tamil / தமிழ்</span>' : isIndian ? `🇮🇳 ${channel.language || 'India'}` : `📍 ${channel.country}`}
          </div>
        </div>
        <button class="card-favorite-btn ${isFav ? 'is-favorite' : ''}" title="Toggle Favorite" data-fav-id="${channel.id}" tabindex="0">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <div class="card-footer">
        <span class="card-category">${channel.category}</span>
        <span class="card-play-tag"><i class="fa-solid fa-play"></i> Watch Now</span>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-favorite-btn')) {
        e.stopPropagation();
        toggleFavorite(channel);
        return;
      }
      playChannel(channel);
    });

    fragment.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
  updatePaginationControls(state.currentPage, totalPages);
}

/**
 * Update Pagination Controls
 */
function updatePaginationControls(current, total) {
  if (elements.pageIndicator) elements.pageIndicator.textContent = total > 0 ? `Page ${current} / ${total}` : '0 / 0';
  if (elements.pagePrevBtn) elements.pagePrevBtn.disabled = current <= 1;
  if (elements.pageNextBtn) elements.pageNextBtn.disabled = current >= total || total === 0;
}

/**
 * Preview Channel Meta
 */
function previewChannelMeta(channel) {
  state.currentChannel = channel;
  if (elements.playerTitle) elements.playerTitle.textContent = channel.name;
  if (elements.playerCategory) elements.playerCategory.textContent = channel.category;
  if (elements.playerLanguage) elements.playerLanguage.textContent = channel.language || 'Global';
  
  const fallbackLogo = `https://via.placeholder.com/60x60/111827/00f0ff?text=${encodeURIComponent(channel.name.substring(0, 2).toUpperCase())}`;
  if (elements.playerLogo) elements.playerLogo.src = channel.logo || fallbackLogo;
  updatePlayerFavoriteIcon();
}

/**
 * Play Selected Channel (With Auto-Proxy Fallback & Data Saver ON in background!)
 */
function playChannel(channel, isAutoProxyRetry = false) {
  state.currentChannel = channel;
  if (!isAutoProxyRetry) {
    state.autoProxyActive = false;
  }
  
  state.currentChannelIndex = state.filteredChannels.findIndex(ch => ch.id === channel.id);
  
  previewChannelMeta(channel);
  if (elements.videoOverlay) elements.videoOverlay.classList.add('hidden');
  
  document.querySelectorAll('.channel-card').forEach(card => {
    card.classList.toggle('active-stream', card.getAttribute('data-id') === channel.id);
  });

  if (window.innerWidth < 768 && document.getElementById('player-section')) {
    document.getElementById('player-section').scrollIntoView({ behavior: 'smooth' });
  }

  setPlayerStatus('buffering', isAutoProxyRetry ? 'Auto-Proxy Retry...' : 'Connecting...');

  let streamUrl = channel.url;
  if (state.autoProxyActive) {
    streamUrl = `https://corsproxy.io/?${encodeURIComponent(channel.url)}`;
  }

  if (state.hlsInstance) {
    state.hlsInstance.destroy();
    state.hlsInstance = null;
  }

  const video = elements.videoPlayer;
  if (!video) return;

  if (Hls.isSupported()) {
    const hls = new Hls({
      lowLatencyMode: true,
      enableWorker: true,
      maxBufferLength: 10,
      maxMaxBufferLength: 60,
      maxBufferSize: 20 * 1024 * 1024,
      manifestLoadingTimeOut: 10000,
      manifestLoadingMaxRetry: 1
    });

    state.hlsInstance = hls;
    hls.loadSource(streamUrl);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setPlayerStatus('live', 'LIVE');
      if (hls.levels && hls.levels.length > 0) {
        hls.currentLevel = 0; // Quiet data saver level selection
      }
      video.play().catch(() => setPlayerStatus('idle', 'Ready'));
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          if (!state.autoProxyActive) {
            console.log('Stream error detected. Auto-switching to proxy fallback for:', channel.name);
            state.autoProxyActive = true;
            hls.destroy();
            setTimeout(() => playChannel(channel, true), 500);
            return;
          }
          
          setPlayerStatus('buffering', 'Auto-Proxy Retry...');
          hls.startLoad();
          setTimeout(() => {
            if (state.currentChannel && state.currentChannel.id === channel.id && video.paused) {
              setPlayerStatus('error', 'Offline');
              showOfflinePopup(channel);
            }
          }, 3500);
        } else {
          if (!state.autoProxyActive) {
            console.log('Fatal HLS error. Auto-switching to proxy fallback for:', channel.name);
            state.autoProxyActive = true;
            hls.destroy();
            setTimeout(() => playChannel(channel, true), 500);
            return;
          }
          setPlayerStatus('error', 'Offline');
          hls.destroy();
          showOfflinePopup(channel);
        }
      }
    });

  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
    video.addEventListener('loadedmetadata', () => {
      setPlayerStatus('live', 'LIVE');
      video.play().catch(() => setPlayerStatus('idle', 'Ready'));
    });
    video.addEventListener('error', () => {
      if (!state.autoProxyActive) {
        state.autoProxyActive = true;
        setTimeout(() => playChannel(channel, true), 500);
        return;
      }
      setPlayerStatus('error', 'Offline');
      showOfflinePopup(channel);
    });
  } else {
    video.src = streamUrl;
    video.play().catch(() => {
      if (!state.autoProxyActive) {
        state.autoProxyActive = true;
        setTimeout(() => playChannel(channel, true), 500);
        return;
      }
      setPlayerStatus('error', 'Offline');
      showOfflinePopup(channel);
    });
  }
}

/**
 * Trigger Offline Channel Alert Popup Modal
 */
function showOfflinePopup(channel) {
  if (elements.offlineMessage) elements.offlineMessage.textContent = `${channel.name} — This stream is offline. Would you like to play the next working channel?`;
  if (elements.offlineModal) elements.offlineModal.classList.remove('hidden');
}

/**
 * Set Video Status
 */
function setPlayerStatus(status, text) {
  if (elements.playerStatus) elements.playerStatus.className = `badge badge-status badge-${status}`;
  if (elements.statusText) elements.statusText.textContent = text;
}

/**
 * Play Next / Prev Channels
 */
function playNextChannel() {
  if (state.filteredChannels.length === 0) return;
  let nextIdx = state.currentChannelIndex + 1;
  if (nextIdx >= state.filteredChannels.length) nextIdx = 0;
  playChannel(state.filteredChannels[nextIdx]);
}

function playPreviousChannel() {
  if (state.filteredChannels.length === 0) return;
  let prevIdx = state.currentChannelIndex - 1;
  if (prevIdx < 0) prevIdx = state.filteredChannels.length - 1;
  playChannel(state.filteredChannels[prevIdx]);
}

/**
 * Toggle Favorite
 */
function toggleFavorite(channel) {
  if (state.favorites.has(channel.id)) state.favorites.delete(channel.id);
  else state.favorites.add(channel.id);

  localStorage.setItem('novastream_favorites', JSON.stringify(Array.from(state.favorites)));
  updatePlayerFavoriteIcon();
  
  const favBtn = elements.categoryList ? elements.categoryList.querySelector('[data-category="favorites"]') : null;
  if (favBtn) favBtn.querySelector('.cat-count').textContent = state.favorites.size;

  if (state.activeCategory === 'favorites') applyFilters();
  else {
    const cardFavBtn = document.querySelector(`.card-favorite-btn[data-fav-id="${channel.id}"]`);
    if (cardFavBtn) {
      const isFav = state.favorites.has(channel.id);
      cardFavBtn.className = `card-favorite-btn ${isFav ? 'is-favorite' : ''}`;
      cardFavBtn.querySelector('i').className = `${isFav ? 'fa-solid' : 'fa-regular'} fa-heart`;
    }
  }
}

function updatePlayerFavoriteIcon() {
  if (!state.currentChannel || !elements.favoriteToggleBtn) return;
  const isFav = state.favorites.has(state.currentChannel.id);
  elements.favoriteToggleBtn.querySelector('i').className = `${isFav ? 'fa-solid text-pink' : 'fa-regular'} fa-heart`;
}

function updateSidebarCounts() {
  const favBtn = elements.categoryList ? elements.categoryList.querySelector('[data-category="favorites"]') : null;
  if (favBtn) favBtn.querySelector('.cat-count').textContent = state.favorites.size;
}

function resetAllFilters() {
  state.searchQuery = '';
  if (elements.searchInput) elements.searchInput.value = '';
  if (elements.clearSearchBtn) elements.clearSearchBtn.classList.add('hidden');
  selectCategory('all');
}
