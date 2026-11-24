/**
 * ============================================================
 *  NOVAX TV — ACCESSIBLE APP ENGINE
 * ============================================================
 */

// ---------- STATE ----------
const state = {
    currentMode: 'livetv',
    allChannels: [],
    activeItems: [],
    filteredItems: [],
    categories: new Map(),
    favorites: new Set(JSON.parse(localStorage.getItem('novastream_favorites') || '[]')),
    activeCategory: 'all',
    searchQuery: '',
    currentPage: 1,
    pageSize: 24,
    currentItem: null,
    currentItemIndex: -1,
    hlsInstance: null,
    proxyLevel: 0,
    viewMode: 'grid'
};

function getItemName(item) {
    if (document.documentElement.lang === 'ta' && item.nameTa) {
        return item.nameTa;
    }
    return item.title || item.name || 'Unknown';
}

// ---------- DOM REFS ----------
const $ = (id) => document.getElementById(id);
const el = {};

function initDomRefs() {
    Object.assign(el, {
        portal: $('entrance-portal'),
        portalToast: $('portal-toast'),
        app: $('app-wrapper'),
        loadOverlay: $('loading-overlay'),
        loadProgress: $('load-progress'),
        loadStatus: $('load-status'),
        loadTitle: $('load-title'),

        modePills: $('mode-pills'),
        catPills: $('cat-pills'),

        searchInput: $('search-input'),
        clearSearch: $('clear-search-btn'),
        searchContainer: $('search-container'),
        searchRecom: $('search-recommendations'),


        hero: $('hero-spotlight'),
        heroBg: $('hero-bg'),
        heroTitle: $('hero-title'),
        heroDesc: $('hero-desc'),
        heroCategory: $('hero-category'),
        heroYear: $('hero-year'),
        heroPlay: $('hero-play-btn'),
        heroFav: $('hero-fav-btn'),
        heroBadgeImg: $('hero-badge-img'),
        heroDots: $('hero-dots'),

        rowsContainer: $('rows-container'),
        sectionHeader: $('section-header'),
        channelGrid: $('channel-grid'),
        pagination: $('pagination'),
        pagePrev: $('page-prev'),
        pageNext: $('page-next'),
        pageInfo: $('page-info'),
        emptyState: $('empty-state'),
        sectionTitle: $('section-title'),
        countBadge: $('count-badge'),
        resetFiltersBtn: $('reset-filters-btn'),

        viewGrid: $('view-grid-btn'),
        viewList: $('view-list-btn'),

        videoPlayer: $('video-player'),
        youtubePlayer: $('youtube-player'),
        playerControls: document.querySelector('.player-controls'),
        videoWrap: $('video-wrap'),
        videoOverlay: $('video-overlay'),
        playerTitle: $('player-title'),
        playerStatus: $('player-status'),
        playerLogo: $('player-logo'),

        favToggle: $('fav-toggle-btn'),
        pipBtn: $('pip-btn'),
        rewindBtn: $('rewind-btn'),
        playPauseBtn: $('play-pause-btn'),
        skipBtn: $('skip-btn'),
        prevBtn: $('prev-btn'),
        nextBtn: $('next-btn'),
        fullscreenBtn: $('fullscreen-btn'),
        bigFullscreenBtn: $('big-fullscreen-btn'),
        fsBackBtn: $('fs-back-btn'),
        aspectSelect: $('aspect-select'),

        channelMenuBtn: $('channel-menu-btn'),
        channelMenuOverlay: $('channel-menu-overlay'),
        closeChannelMenu: $('close-channel-menu'),
        menuCats: $('menu-cats'),
        menuList: $('menu-list'),

        logoHome: $('logo-home-btn'),

        welcomeModal: $('welcome-modal'),
        closeWelcome: $('close-welcome-btn'),
        confirmWelcome: $('confirm-welcome-btn'),

        offlineModal: $('offline-modal'),
        offlineMsg: $('offline-message'),
        offlineNext: $('offline-next-btn'),
        offlineClose: $('offline-close-btn'),
        closeOffline: $('close-offline-btn'),

        settingsModal: $('settings-modal'),
        closeSettings: $('close-settings-btn'),
        openDisclaimer: $('open-disclaimer-btn'),
        disclaimerModal: $('disclaimer-modal'),
        closeDisclaimer: $('close-disclaimer-btn'),

        bottomNav: $('bottom-nav'),
        topBar: $('top-bar'),
        favDot: $('fav-dot'),
    });
}

// ---------- HELPERS ----------
function escapeXML(str) { 
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); 
}

function escapeAttr(str) { 
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;'); 
}

function generateAutoSVG(name, category, isPoster) {
    const clean = (name || 'TV').trim() || 'NovaX';
    let hash = 0;
    for (let i = 0; i < clean.length; i++) hash = clean.charCodeAt(i) + ((hash << 5) - hash);
    const gradients = [
        ['#00e5ff', '#0077ff'], // NovaX cyan/blue
        ['#ff0033', '#cc0029'], // Red
        ['#00f0ff', '#3b82f6'],
        ['#f59e0b', '#ef4444'],
        ['#10b981', '#059669'],
        ['#8b5cf6', '#ec4899']
    ];
    const pair = gradients[Math.abs(hash) % gradients.length];
    const initials = clean.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase() || 'TV';

    if (isPoster) {
        const svg =
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><linearGradient id="g${hash}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${pair[0]}"/><stop offset="100%" stop-color="${pair[1]}"/></linearGradient></defs><rect width="400" height="600" fill="#0c0d14"/><rect x="16" y="16" width="368" height="568" rx="20" fill="url(#g${hash})" opacity="0.15" stroke="url(#g${hash})" stroke-width="3"/><circle cx="200" cy="200" r="70" fill="url(#g${hash})" opacity="0.2"/><text x="200" y="210" font-family="sans-serif" font-weight="900" font-size="56" fill="#fff" text-anchor="middle" dominant-baseline="middle">${escapeXML(initials)}</text><text x="200" y="380" font-family="sans-serif" font-weight="800" font-size="28" fill="#fff" text-anchor="middle">${escapeXML(clean.substring(0,22))}</text><rect x="130" y="480" width="140" height="40" rx="20" fill="url(#g${hash})"/><text x="200" y="500" font-family="sans-serif" font-weight="800" font-size="16" fill="#fff" text-anchor="middle" letter-spacing="2">${escapeXML((category||'MOVIE').toUpperCase())}</text></svg>`;
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g${hash}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${pair[0]}"/><stop offset="100%" stop-color="${pair[1]}"/></linearGradient></defs><rect width="200" height="200" rx="28" fill="#12121a"/><rect x="10" y="10" width="180" height="180" rx="24" fill="url(#g${hash})" opacity="0.2" stroke="url(#g${hash})" stroke-width="3"/><text x="100" y="100" font-family="sans-serif" font-weight="900" font-size="48" fill="#fff" text-anchor="middle" dominant-baseline="middle">${escapeXML(initials)}</text><text x="100" y="148" font-family="sans-serif" font-weight="700" font-size="14" fill="url(#g${hash})" text-anchor="middle">${escapeXML(clean.substring(0,14))}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ---------- LOADING ----------
function setLoading(percent, status) {
    if (el.loadProgress) el.loadProgress.style.width = Math.min(100, percent) + '%';
    if (el.loadStatus) el.loadStatus.textContent = status || 'Loading...';
}

// ---------- FAVORITES ----------
function saveFavorites() {
    localStorage.setItem('novastream_favorites', JSON.stringify(Array.from(state.favorites)));
    if (el.favDot) el.favDot.style.display = state.favorites.size > 0 ? 'block' : 'none';
    updateAllFavIcons();
}

function toggleFavorite(item) {
    if (!item) return;
    if (state.favorites.has(item.id)) state.favorites.delete(item.id);
    else state.favorites.add(item.id);
    saveFavorites();
    updatePlayerFavIcon();
    if (state.currentMode === 'favorites') switchMode('favorites');
    updateHeroFavButton();
}

function updateAllFavIcons() {
    document.querySelectorAll('[data-fav-id]').forEach(elem => {
        const id = elem.dataset.favId;
        const isFav = state.favorites.has(id);
        elem.classList.toggle('is-fav', isFav);
        const icon = elem.querySelector('i');
        if (icon) {
            icon.className = (isFav ? 'fa-solid' : 'fa-regular') + ' fa-heart';
        }
    });
}

function updatePlayerFavIcon() {
    if (!state.currentItem) return;
    const isFav = state.favorites.has(state.currentItem.id);
    const icon = el.favToggle?.querySelector('i');
    if (icon) icon.className = (isFav ? 'fa-solid text-red' : 'fa-regular') + ' fa-heart';
}

function updateHeroFavButton() {
    if (!state.currentItem) return;
    const isFav = state.favorites.has(state.currentItem.id);
    if (el.heroFav) {
        el.heroFav.innerHTML = isFav ?
            '<i class="fa-solid fa-check"></i> In My List' :
            '<i class="fa-solid fa-plus"></i> My List';
    }
}

// ---------- PLAYER STATUS ----------
function setPlayerStatus(text, statusType) {
    if (el.playerStatus) {
        el.playerStatus.textContent = text || 'Ready';
        el.playerStatus.className = 'status';
        if (statusType === 'live') el.playerStatus.classList.add('live');
        else if (statusType === 'buffering') el.playerStatus.classList.add('buffering');
        else if (statusType === 'offline') el.playerStatus.classList.add('offline');
    }
}

// ---------- PLAY ITEM ----------
function playItem(item, proxyLevel) {
    if (!item || !item.url) {
        setPlayerStatus('No stream URL', 'offline');
        return;
    }
    
    // Scroll to the top of the player when a new channel is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });

    state.currentItem = item;
    state.currentItemIndex = state.filteredItems.findIndex(i => i.id === item.id);
    state.proxyLevel = proxyLevel || 0;

    const name = getItemName(item);
    if (el.playerTitle) el.playerTitle.textContent = name;
    setPlayerStatus('Connecting...', 'buffering');

    const isMovie = item.type === 'movie' || item.type === 'series' || state.currentMode !== 'livetv';
    const autoSvg = generateAutoSVG(name, item.genre || item.category, isMovie);
    const logoSrc = item.poster || item.logo || autoSvg;
    if (el.playerLogo) {
        el.playerLogo.src = logoSrc;
        el.playerLogo.onerror = () => { el.playerLogo.src = autoSvg; };
    }

    if (el.videoOverlay) el.videoOverlay.classList.add('hidden');
    if (el.hero) updateHeroSpotlight(item);

    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll(`.card[data-id="${item.id}"]`).forEach(c => c.classList.add('active'));

    if (window.innerWidth < 768) {
        document.getElementById('player-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- YOUTUBE LOGIC ---
    if (item.url.includes('youtube.com') || item.url.includes('youtu.be')) {
        if (el.videoPlayer) {
            el.videoPlayer.pause();
            el.videoPlayer.src = '';
            el.videoPlayer.classList.add('hidden');
        }
        if (state.hlsInstance) {
            state.hlsInstance.destroy();
            state.hlsInstance = null;
        }

        if (el.playerControls) {
            el.playerControls.style.opacity = '0.3';
            el.playerControls.style.pointerEvents = 'none';
        }

        if (el.youtubePlayer) {
            el.youtubePlayer.classList.remove('hidden');
            let ytUrl = item.url;
            if (ytUrl.includes('watch?v=')) {
                ytUrl = ytUrl.replace('watch?v=', 'embed/');
                ytUrl = ytUrl.replace('&', '?');
            }
            if (!ytUrl.includes('?')) ytUrl += '?';
            else ytUrl += '&';

            // Force youtube-nocookie for all embeds to prevent Error 153
            if (ytUrl.includes('youtube.com')) {
                ytUrl = ytUrl.replace('youtube.com', 'youtube-nocookie.com');
            }

            ytUrl += 'autoplay=1&controls=0&disablekb=1&modestbranding=1&fs=0';
            el.youtubePlayer.src = ytUrl;
        }

        setPlayerStatus('Playing', 'live');
        return;
    }

    // --- STANDARD VIDEO LOGIC ---
    if (el.youtubePlayer) {
        el.youtubePlayer.classList.add('hidden');
        el.youtubePlayer.src = '';
    }
    if (el.videoPlayer) {
        el.videoPlayer.classList.remove('hidden');
    }
    if (el.playerControls) {
        el.playerControls.style.opacity = '1';
        el.playerControls.style.pointerEvents = 'auto';
    }

    let streamUrl = item.url;
    const isMixed = window.location.protocol === 'https:' && streamUrl.startsWith('http://');
    let pl = proxyLevel || 0;
    if (isMixed && pl === 0) pl = 1;

    if (pl === 1) streamUrl = `https://corsproxy.io/?${encodeURIComponent(item.url)}`;
    else if (pl === 2) streamUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(item.url)}`;
    else if (pl === 3) streamUrl = `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(item.url)}`;

    const video = el.videoPlayer;
    if (!video) return;

    const isDirect = !streamUrl.toLowerCase().split('?')[0].endsWith('.m3u8') &&
        (streamUrl.toLowerCase().split('?')[0].endsWith('.mp4') ||
            streamUrl.toLowerCase().split('?')[0].endsWith('.webm') ||
            streamUrl.toLowerCase().split('?')[0].endsWith('.mov'));

    if (isDirect) {
        if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }
        video.src = streamUrl;
        video.play()
.then(() => setPlayerStatus('Playing', 'live'))
            .catch((err) => {
                if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
                    setPlayerStatus('Ready (tap play)', '');
                } else if (pl < 3 && isMixed) {
                    playItem(item, pl + 1);
                } else {
                    setPlayerStatus('Offline', 'offline');
                    showOffline(item);
                }
            });
        return;
    }

    if (Hls.isSupported()) {
        if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }
        const hls = new Hls({
            lowLatencyMode: true,
            enableWorker: true,
            maxBufferLength: 30, // Increased buffer to prevent stalling
            maxMaxBufferLength: 60,
            liveSyncDurationCount: 3,
            manifestLoadingTimeOut: 12000,
            manifestLoadingMaxRetry: 2
        });
        state.hlsInstance = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setPlayerStatus('Playing', 'live');
            video.play().catch(() => setPlayerStatus('Ready', ''));
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
                if (data.type === Hls.ErrorTypes.NETWORK_ERROR && pl < 3) {
                    hls.destroy();
                    setTimeout(() => playItem(item, pl + 1), 400);
                    return;
                } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                    hls.recoverMediaError();
                    return;
                }
                setPlayerStatus('Offline', 'offline');
                hls.destroy();
                showOffline(item);
            }
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.play()
            .then(() => setPlayerStatus('Playing', 'live'))
            .catch(() => {
                if (pl < 3) playItem(item, pl + 1);
                else { setPlayerStatus('Offline', 'offline'); showOffline(item); }
            });
    } else {
        video.src = streamUrl;
        video.play().catch(() => showOffline(item));
    }
}

function showOffline(item) {
    if (el.offlineModal) el.offlineModal.classList.remove('hidden');
}

function playNextItem() {
    if (!state.currentItem || state.filteredItems.length === 0) return;
    
    const currentGenre = (state.currentItem.genre || state.currentItem.category || '').toLowerCase();
    let genreItems = state.filteredItems.filter(i => {
        return (i.genre || i.category || '').toLowerCase() === currentGenre;
    });
    
    if (genreItems.length <= 1) {
        genreItems = state.filteredItems;
    }
    
    let idx = genreItems.findIndex(i => i.id === state.currentItem.id);
    if (idx === -1) idx = 0;
    
    idx++;
    if (idx >= genreItems.length) idx = 0;
    
    playItem(genreItems[idx]);
}

function playPrevItem() {
    if (!state.currentItem || state.filteredItems.length === 0) return;
    
    const currentGenre = (state.currentItem.genre || state.currentItem.category || '').toLowerCase();
    let genreItems = state.filteredItems.filter(i => {
        return (i.genre || i.category || '').toLowerCase() === currentGenre;
    });
    
    if (genreItems.length <= 1) {
        genreItems = state.filteredItems;
    }
    
    let idx = genreItems.findIndex(i => i.id === state.currentItem.id);
    if (idx === -1) idx = 0;
    
    idx--;
    if (idx < 0) idx = genreItems.length - 1;
    
    playItem(genreItems[idx]);
}

// ---------- HERO ----------
let heroFeaturedList = [];

function initHeroFeatured() {
    if (!state.activeItems || state.activeItems.length === 0) return;
    const candidates = state.activeItems.filter(i => {
        const n = (i.name || i.title || '').toLowerCase();
        return n.includes('puthiya') || n.includes('sun') || n.includes('thanthi') || n.includes('polimer') || n.includes('news7');
    });
    if (candidates.length >= 3) {
        heroFeaturedList = candidates.slice(0, 4);
    } else {
        heroFeaturedList = state.activeItems.slice(0, 4);
    }
    renderHeroDots();
}

function renderHeroDots() {
    if (!el.heroDots || !heroFeaturedList || heroFeaturedList.length === 0) return;
    el.heroDots.innerHTML = '';
    const currentId = state.currentItem ? state.currentItem.id : (heroFeaturedList[0]?.id);

    heroFeaturedList.forEach((item, idx) => {
        const dot = document.createElement('span');
        const isActive = (item.id === currentId) || (!state.currentItem && idx === 0);
        dot.className = `dot ${isActive ? 'active' : ''}`;
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Featured channel ${idx + 1}`);
        dot.addEventListener('click', () => {
            updateHeroSpotlight(item);
            document.querySelectorAll('#hero-dots .dot').forEach((d, i) => {
                d.classList.toggle('active', i === idx);
            });
        });
        el.heroDots.appendChild(dot);
    });
}

function updateHeroSpotlight(item) {
    if (!item || !el.hero) return;
    el.hero.classList.remove('hidden');
    const name = getItemName(item);
    const isMovie = item.type === 'movie' || item.type === 'series' || state.currentMode !== 'livetv';
    const autoSvg = generateAutoSVG(name, item.genre || item.category, isMovie);
    const imgSrc = item.poster || item.logo || autoSvg;

    if (el.heroBadgeImg) {
        el.heroBadgeImg.src = imgSrc;
        el.heroBadgeImg.style.display = 'block';
        el.heroBadgeImg.onerror = () => { el.heroBadgeImg.src = autoSvg; };
    }
    if (el.heroBg) el.heroBg.style.backgroundImage = `url('${imgSrc}')`;
    if (el.heroTitle) el.heroTitle.textContent = name;
    if (el.heroDesc) el.heroDesc.textContent = item.description || `Watch ${name} 24x7, live.`;
    if (el.heroCategory) {
        const cat = item.genre || item.category || 'News';
        const lang = item.language ? ` • ${item.language}` : ' • Tamil';
        el.heroCategory.textContent = `${cat}${lang}`;
    }

    if (el.heroPlay) {
        el.heroPlay.onclick = () => playItem(item);
    }
    updateHeroFavButton();
    if (el.heroFav) {
        el.heroFav.onclick = () => {
            toggleFavorite(item);
            updateHeroFavButton();
        };
    }

    renderHeroDots();
}

// ---------- RENDER GRID ----------
function renderGrid() {
    const container = el.channelGrid;
    const total = state.filteredItems.length;
    if (total === 0) {
        container.innerHTML = '';
        el.emptyState?.classList.remove('hidden');
        el.pagination?.classList.add('hidden');
        if (el.countBadge) el.countBadge.textContent = '0';
        return;
    }
    el.emptyState?.classList.add('hidden');

    const start = (state.currentPage - 1) * state.pageSize;
    const end = Math.min(start + state.pageSize, total);
    const pageItems = state.filteredItems.slice(start, end);

    const fragment = document.createDocumentFragment();
    pageItems.forEach(item => {
        fragment.appendChild(createCard(item));
    });
    container.innerHTML = '';
    container.appendChild(fragment);

    const totalPages = Math.ceil(total / state.pageSize);
    if (totalPages > 1) {
        el.pagination?.classList.remove('hidden');
        if (el.pageInfo) el.pageInfo.textContent = `Page ${state.currentPage} of ${totalPages}`;
        if (el.pagePrev) el.pagePrev.disabled = state.currentPage <= 1;
        if (el.pageNext) el.pageNext.disabled = state.currentPage >= totalPages;
    } else {
        el.pagination?.classList.add('hidden');
    }

    if (el.countBadge) el.countBadge.textContent = total;
    if (el.sectionTitle) {
        const modeLabel = getModeLabel();
        const catLabel = state.activeCategory === 'all' ? `All ${modeLabel}` : state.activeCategory;
        el.sectionTitle.innerHTML = `${catLabel} <span class="count-badge">${total}</span>`;
    }
    updateAllFavIcons();
}

function getModeLabel() {
    const map = {
        livetv: 'Channels',
        tamil_movies: 'Tamil Movies',
        dubbed_movies: 'Dubbed Movies',
        hollywood_movies: 'All Movies',
        web_series: 'Web Series',
        favorites: 'Favorites'
    };
    return map[state.currentMode] || 'Items';
}

function getLogoBoxClass(item, name) {
    const n = (name || '').toLowerCase();
    if (n.includes('75 music') || n.includes('aaryaa') || n.includes('polimer') || n.includes('thanthi') || n.includes('news7') || n.includes('puthiya thalaimurai') || n.includes('sun music') || n.includes('isai')) {
        return 'card-logo-box light-box';
    }
    if (item.bg === 'white' || item.logoBg === 'white') {
        return 'card-logo-box light-box';
    }
    return 'card-logo-box dark-box';
}

function createCard(item) {
    const isFav = state.favorites.has(item.id);
    const isActive = state.currentItem && state.currentItem.id === item.id;
    const isMovie = item.type === 'movie' || item.type === 'series' || state.currentMode !== 'livetv';
    const name = getItemName(item);
    const autoSvg = generateAutoSVG(name, item.genre || item.category, isMovie);
    const imgSrc = item.poster || item.logo || autoSvg;
    const boxClass = getLogoBoxClass(item, name);
    const categoryName = item.genre || item.category || 'General';
    const isTamil = item.language === 'Tamil';

    const card = document.createElement('div');
    card.className = `card channel-card ${isActive ? 'active' : ''}`;
    card.dataset.id = item.id;
    card.tabIndex = 0;

    card.innerHTML = `
        <div class="${boxClass}">
            <img src="${escapeAttr(imgSrc)}" alt="${escapeAttr(name)}" loading="lazy" onerror="this.src='${escapeAttr(autoSvg)}';">
        </div>
        <div class="card-body">
            <div class="card-channel-title" title="${escapeAttr(name)}">${escapeXML(name)}</div>
            <div class="card-tag-row">
                <span class="card-badge">${escapeXML(categoryName)}</span>
                ${isTamil ? '<span class="card-badge badge-tamil">Tamil</span>' : ''}
            </div>
        </div>
        <div class="card-actions-row">
            <button class="card-heart-btn fav-btn ${isFav ? 'is-fav' : ''}" data-fav-id="${item.id}" tabindex="0" aria-label="Toggle favorite">
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <span class="card-watch-cta"><i class="fa-solid fa-play"></i> Watch</span>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.card-heart-btn') || e.target.closest('.fav-btn')) return;
        playItem(item);
    });

    const heartBtn = card.querySelector('.card-heart-btn');
    if (heartBtn) {
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(item);
            const btn = e.currentTarget;
            const isNow = state.favorites.has(item.id);
            btn.classList.toggle('is-fav', isNow);
            const icon = btn.querySelector('i');
            if (icon) icon.className = (isNow ? 'fa-solid' : 'fa-regular') + ' fa-heart';
            if (state.currentItem && state.currentItem.id === item.id) updateHeroFavButton();
        });
    }

    return card;
}

// ---------- RENDER CAROUSEL ROWS ----------
function renderCarouselRows(items) {
    const container = el.rowsContainer;
    if (!container) return;
    container.innerHTML = '';

    if (state.currentMode !== 'livetv' || state.activeCategory !== 'all' || state.searchQuery) {
        container.classList.add('hidden');
        el.channelGrid?.classList.remove('hidden');
        return;
    }
    container.classList.remove('hidden');
    el.channelGrid?.classList.add('hidden');

    const groups = new Map();

    // 1. Tamil Channels: 20 scrollable channels horizontally from right to left, then "See All" card
    const tamil = items.filter(i => i.language === 'Tamil');
    if (tamil.length) {
        groups.set('Tamil Channels', {
            icon: 'fa-solid fa-bolt',
            iconColor: '#00e5ff',
            catKey: 'tamil',
            items: tamil.slice(0, 20),
            totalCount: tamil.length
        });
    }

    // 2. Music Channels: 20 scrollable channels, then "See All" card
    const music = items.filter(i => {
        const cat = (i.genre || i.category || '').toLowerCase();
        const title = (i.title || i.name || '').toLowerCase();
        return cat.includes('music') || title.includes('music');
    });
    if (music.length) {
        groups.set('Music', {
            icon: 'fa-solid fa-music',
            iconColor: '#00e5ff',
            catKey: 'Music',
            items: music.slice(0, 20),
            totalCount: music.length
        });
    }

    // 3. Entertainment Channels: 20 scrollable channels, then "See All" card
    const entertainment = items.filter(i => {
        const cat = (i.genre || i.category || '').toLowerCase();
        const title = (i.title || i.name || '').toLowerCase();
        return cat.includes('entertainment') || cat.includes('general') || title.includes('tv');
    });
    if (entertainment.length) {
        groups.set('Entertainment', {
            icon: 'fa-solid fa-clapperboard',
            iconColor: '#00e5ff',
            catKey: 'Entertainment',
            items: entertainment.slice(0, 20),
            totalCount: entertainment.length
        });
    }

    // 4. News Channels: 20 scrollable channels, then "See All" card
    const news = items.filter(i => {
        const cat = (i.genre || i.category || '').toLowerCase();
        const title = (i.title || i.name || '').toLowerCase();
        return cat.includes('news') || title.includes('news') || title.includes('seithigal');
    });
    if (news.length) {
        groups.set('News', {
            icon: 'fa-solid fa-newspaper',
            iconColor: '#00e5ff',
            catKey: 'News',
            items: news.slice(0, 20),
            totalCount: news.length
        });
    }

    // Additional categories if available
    const standardKeys = new Set(['tamil channels', 'music', 'entertainment', 'news']);
    state.categories.forEach((count, cat) => {
        if (!standardKeys.has(cat.toLowerCase()) && count >= 3 && groups.size < 7) {
            const catItems = items.filter(i => (i.genre || i.category || '').toLowerCase() === cat.toLowerCase());
            if (catItems.length >= 3) {
                groups.set(cat, {
                    icon: 'fa-solid fa-layer-group',
                    iconColor: '#00e5ff',
                    catKey: cat,
                    items: catItems.slice(0, 20),
                    totalCount: catItems.length
                });
            }
        }
    });

    groups.forEach((groupData, title) => {
        if (!groupData.items || groupData.items.length === 0) return;
        const row = document.createElement('div');
        row.className = 'channel-category-row';
        row.innerHTML = `
            <div class="category-row-head">
                <h4 class="category-row-title">
                    <i class="${groupData.icon}" style="color:${groupData.iconColor};"></i> ${escapeXML(title)}
                </h4>
                <button class="see-all-link see-all" data-cat="${escapeAttr(groupData.catKey)}">
                    See All <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            <div class="category-scroll-track"></div>
        `;
        const track = row.querySelector('.category-scroll-track');
        groupData.items.forEach(item => {
            track.appendChild(createCard(item));
        });

        // Add "See All" card at the end of the 20 channels
        const seeAllCard = document.createElement('div');
        seeAllCard.className = 'channel-card see-all-card';
        seeAllCard.setAttribute('tabindex', '0');
        seeAllCard.setAttribute('role', 'button');
        seeAllCard.setAttribute('aria-label', `See all ${escapeAttr(title)}`);
        seeAllCard.innerHTML = `
            <div class="see-all-inner">
                <div class="see-all-icon-squircle">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="see-all-text">See All</div>
                <div class="see-all-sub">${groupData.totalCount ? groupData.totalCount + ' Channels' : 'View More'}</div>
            </div>
        `;

        const handleSeeAll = () => {
            selectCategory(groupData.catKey);
            document.getElementById('section-header')?.scrollIntoView({ behavior: 'smooth' });
        };

        seeAllCard.addEventListener('click', handleSeeAll);
        seeAllCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSeeAll();
            }
        });

        track.appendChild(seeAllCard);

        row.querySelector('.see-all')?.addEventListener('click', handleSeeAll);
        container.appendChild(row);
    });
}

// ---------- SEARCH RECOMMENDATIONS ----------
function highlightMatch(text, query) {
    if (!query) return escapeXML(text);
    const escaped = escapeXML(text);
    const cleanQ = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!cleanQ) return escaped;
    const regex = new RegExp(`(${cleanQ})`, 'gi');
    return escaped.replace(regex, '<span class="search-match-highlight">$1</span>');
}

function hideSearchRecommendations() {
    if (el.searchRecom) {
        el.searchRecom.classList.add('hidden');
    }
}

function showSearchRecommendations(query) {
    const container = el.searchRecom || $('search-recommendations');
    if (!container) return;

    const trimmed = (query || '').trim().toLowerCase();
    const all = state.allChannels.length > 0 ? state.allChannels : state.activeItems;

    if (!trimmed) {
        // Trending / popular quick searches and top recommended channels
        const topChannels = all.filter(i => {
            const n = (i.name || i.title || '').toLowerCase();
            return n.includes('puthiya') || n.includes('sun') || n.includes('thanthi') || n.includes('kalaignar') || n.includes('polimer') || n.includes('75 music');
        }).slice(0, 4);

        const listToRender = topChannels.length > 0 ? topChannels : all.slice(0, 4);

        container.innerHTML = `
            <div class="search-recom-section">
                <div class="recom-section-title">
                    <i class="fa-solid fa-sparkles text-cyan"></i> Trending Searches
                </div>
                <div class="recom-chips-wrap">
                    <button class="recom-chip" data-search="Tamil"><i class="fa-solid fa-bolt text-cyan"></i> Tamil</button>
                    <button class="recom-chip" data-search="News"><i class="fa-solid fa-newspaper"></i> News 24x7</button>
                    <button class="recom-chip" data-search="Music"><i class="fa-solid fa-music"></i> Music</button>
                    <button class="recom-chip" data-search="Sun TV"><i class="fa-solid fa-tv"></i> Sun TV</button>
                    <button class="recom-chip" data-search="Polimer"><i class="fa-solid fa-tv"></i> Polimer</button>
                    <button class="recom-chip" data-search="Movies"><i class="fa-solid fa-film"></i> Movies</button>
                </div>
            </div>
            <div class="search-recom-divider"></div>
            <div class="search-recom-section">
                <div class="recom-section-title">
                    <i class="fa-solid fa-fire text-cyan"></i> Recommended Channels
                </div>
                <div class="recom-channels-list"></div>
            </div>
        `;

        const channelsList = container.querySelector('.recom-channels-list');
        listToRender.forEach(item => {
            channelsList.appendChild(createRecommendationItem(item, ''));
        });

        attachRecommendationEvents(container);
        container.classList.remove('hidden');
        return;
    }

    // When query is non-empty: find matching channels according to keyword or channel name
    const matches = all.filter(i => {
        const name = (i.name || i.title || '').toLowerCase();
        const nameTa = (i.nameTa || '').toLowerCase();
        const cat = (i.category || i.genre || '').toLowerCase();
        const lang = (i.language || '').toLowerCase();
        return name.includes(trimmed) || nameTa.includes(trimmed) || cat.includes(trimmed) || lang.includes(trimmed);
    });

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="search-recom-empty">
                <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                <div class="empty-title">No channels found for "${escapeXML(query)}"</div>
                <div class="empty-sub">Try searching by category or popular keyword:</div>
                <div class="recom-chips-wrap" style="justify-content: center; margin-top: 6px;">
                    <button class="recom-chip" data-search="Tamil"><i class="fa-solid fa-bolt text-cyan"></i> Tamil</button>
                    <button class="recom-chip" data-search="News"><i class="fa-solid fa-newspaper"></i> News</button>
                    <button class="recom-chip" data-search="Music"><i class="fa-solid fa-music"></i> Music</button>
                    <button class="recom-chip" data-search="Movies"><i class="fa-solid fa-film"></i> Movies</button>
                </div>
            </div>
        `;
        attachRecommendationEvents(container);
        container.classList.remove('hidden');
        return;
    }

    // Show top matches (up to 6)
    const displayMatches = matches.slice(0, 6);
    container.innerHTML = `
        <div class="search-recom-section">
            <div class="recom-section-title">
                <i class="fa-solid fa-magnifying-glass text-cyan"></i> Channels & Keywords (${matches.length} found)
            </div>
            <div class="recom-channels-list"></div>
        </div>
    `;

    const channelsList = container.querySelector('.recom-channels-list');
    displayMatches.forEach(item => {
        channelsList.appendChild(createRecommendationItem(item, trimmed));
    });

    attachRecommendationEvents(container);
    container.classList.remove('hidden');
}

function createRecommendationItem(item, query) {
    const name = getItemName(item);
    const category = item.category || item.genre || 'General';
    const isTamil = item.language === 'Tamil';
    const isMovie = item.type === 'movie' || item.type === 'series' || state.currentMode !== 'livetv';
    const autoSvg = generateAutoSVG(name, category, isMovie);
    const imgSrc = item.poster || item.logo || autoSvg;
    const boxClass = getLogoBoxClass(item, name);

    const div = document.createElement('div');
    div.className = 'recom-channel-item';
    div.dataset.id = item.id;
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'option');

    div.innerHTML = `
        <div class="recom-logo-box ${boxClass.includes('light-box') ? 'light-box' : 'dark-box'}">
            <img src="${escapeAttr(imgSrc)}" alt="${escapeAttr(name)}" loading="lazy" onerror="this.src='${escapeAttr(autoSvg)}';">
        </div>
        <div class="recom-channel-info">
            <div class="recom-channel-name">${highlightMatch(name, query)}</div>
            <div class="recom-channel-tags">
                <span class="recom-tag">${escapeXML(category)}</span>
                ${isTamil ? '<span class="recom-tag tag-tamil">Tamil</span>' : ''}
            </div>
        </div>
        <button class="recom-play-btn" title="Watch ${escapeAttr(name)}">
            <i class="fa-solid fa-play"></i> Watch
        </button>
    `;

    const triggerPlay = (e) => {
        e.stopPropagation();
        playItem(item);
        hideSearchRecommendations();
        if (el.searchInput) {
            el.searchInput.value = name;
            state.searchQuery = name.toLowerCase();
            el.clearSearch?.classList.remove('hidden');
        }
        document.getElementById('player-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    div.addEventListener('click', triggerPlay);
    div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerPlay(e);
        }
    });

    return div;
}

function attachRecommendationEvents(container) {
    container.querySelectorAll('.recom-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const searchVal = chip.dataset.search;
            if (el.searchInput) {
                el.searchInput.value = searchVal;
                state.searchQuery = searchVal.toLowerCase();
                el.clearSearch?.classList.remove('hidden');
                applyFilters();
                showSearchRecommendations(searchVal);
            }
        });
    });
}

// ---------- FILTERS ----------
function applyFilters() {
    let filtered = state.activeItems;

    if (state.activeCategory === 'tamil') {
        filtered = filtered.filter(i => i.language === 'Tamil');
    } else if (state.activeCategory !== 'all') {
        filtered = filtered.filter(i => {
            const c = i.genre || i.category || '';
            return c.toLowerCase() === state.activeCategory.toLowerCase();
        });
    }

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(i =>
            (i.title || i.name || '').toLowerCase().includes(q) ||
            (i.nameTa || '').toLowerCase().includes(q) ||
            (i.genre || i.category || '').toLowerCase().includes(q) ||
            (i.language || '').toLowerCase().includes(q)
        );
    }

    if (state.currentMode === 'livetv') {
        filtered = sortChannels(filtered);
    }

    state.filteredItems = filtered;
    state.currentPage = 1;

    const useCarousel = state.currentMode === 'livetv' && state.activeCategory === 'all' && !state.searchQuery;
    if (useCarousel && filtered.length > 0) {
        renderCarouselRows(filtered);
        el.channelGrid.classList.add('hidden');
        el.rowsContainer?.classList.remove('hidden');
        el.pagination?.classList.add('hidden');
        if (el.countBadge) el.countBadge.textContent = filtered.length;
        if (el.sectionTitle) {
            el.sectionTitle.innerHTML =
                `All Channels <span class="count-badge">${filtered.length}</span>`;
        }
        el.emptyState?.classList.add('hidden');
    } else {
        el.rowsContainer?.classList.add('hidden');
        el.channelGrid.classList.remove('hidden');
        renderGrid();
    }
    updateCategoryPills();
    updateModeCounts();
}

function sortChannels(arr) {
    return [...arr].sort((a, b) => {
        const aT = a.language === 'Tamil';
        const bT = b.language === 'Tamil';
        if (aT && !bT) return -1;
        if (!aT && bT) return 1;
        return (a.title || a.name || '').localeCompare(b.title || b.name || '');
    });
}

function selectCategory(cat) {
    state.activeCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.cat === cat);
    });
    applyFilters();
}

function updateCategoryPills() {
    const container = el.catPills;
    if (!container) return;
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `cat-pill ${state.activeCategory === 'all' ? 'active' : ''}`;
    allBtn.dataset.cat = 'all';
    allBtn.innerHTML = `<i class="fa-solid fa-table-cells-large"></i> All <span class="count">${state.activeItems.length}</span>`;
    allBtn.addEventListener('click', () => selectCategory('all'));
    container.appendChild(allBtn);

    if (state.currentMode === 'livetv') {
        const tamilCount = state.activeItems.filter(i => i.language === 'Tamil').length;
        if (tamilCount > 0) {
            const btn = document.createElement('button');
            btn.className = `cat-pill ${state.activeCategory === 'tamil' ? 'active' : ''}`;
            btn.dataset.cat = 'tamil';
            btn.innerHTML = `<i class="fa-solid fa-star" style="color:var(--accent-cyan);"></i> Tamil <span class="count">${tamilCount}</span>`;
            btn.addEventListener('click', () => selectCategory('tamil'));
            container.appendChild(btn);
        }
    }

    const sorted = Array.from(state.categories.entries()).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([cat, count]) => {
        if (count === 0) return;
        const btn = document.createElement('button');
        btn.className = `cat-pill ${state.activeCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`;
        btn.dataset.cat = cat;
        let icon = 'fa-tag';
        const l = cat.toLowerCase();
        if (l.includes('news')) icon = 'fa-newspaper';
        else if (l.includes('movie') || l.includes('cinema')) icon = 'fa-film';
        else if (l.includes('music')) icon = 'fa-music';
        else if (l.includes('sport')) icon = 'fa-basketball';
        else if (l.includes('kid')) icon = 'fa-child';
        else if (l.includes('devotional') || l.includes('religious')) icon = 'fa-place-of-worship';
        else if (l.includes('action')) icon = 'fa-bolt';
        else if (l.includes('comedy')) icon = 'fa-face-laugh';
        else if (l.includes('drama')) icon = 'fa-masks-theater';
        else if (l.includes('entertainment')) icon = 'fa-clapperboard';
        else if (l.includes('general')) icon = 'fa-tag';
        btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${escapeXML(cat)} <span class="count">${count}</span>`;
        btn.addEventListener('click', () => selectCategory(cat));
        container.appendChild(btn);
    });
}

function updateModeCounts() {
    const map = {
        livetv: state.allChannels.length,
        movies_series: 
            (typeof TAMIL_MOVIES !== 'undefined' ? TAMIL_MOVIES.length : 0) +
            (typeof TAMIL_DUBBED_MOVIES !== 'undefined' ? TAMIL_DUBBED_MOVIES.length : 0) +
            (typeof HOLLYWOOD_MOVIES !== 'undefined' ? HOLLYWOOD_MOVIES.length : 0) +
            (typeof WEB_SERIES !== 'undefined' ? WEB_SERIES.length : 0),
        favorites: state.favorites.size
    };
    document.querySelectorAll('.mode-pill').forEach(pill => {
        const mode = pill.dataset.mode;
        const count = map[mode] || 0;
        const span = pill.querySelector('.count');
        if (span) span.textContent = count;
    });
}

function switchMode(mode) {
    state.currentMode = mode;
    state.activeCategory = 'all';
    state.searchQuery = '';
    if (el.searchInput) el.searchInput.value = '';
    if (el.clearSearch) el.clearSearch.classList.add('hidden');

    document.querySelectorAll('.mode-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.mode === mode);
    });

    if (mode === 'movies_series') {
        if (el.searchContainer) el.searchContainer.classList.add('hidden');
        if (el.catPills) el.catPills.parentElement.classList.add('hidden');
        if (el.sectionHeader) el.sectionHeader.classList.add('hidden');
        if (el.rowsContainer) el.rowsContainer.classList.add('hidden');
        if (el.hero) el.hero.classList.add('hidden');
        if (el.channelGrid) el.channelGrid.classList.add('hidden');
        if (el.emptyState) el.emptyState.classList.add('hidden');
        if (el.pagination) el.pagination.classList.add('hidden');
        if (el.topBar) el.topBar.classList.add('hidden');
        if (el.bottomNav) el.bottomNav.classList.add('hidden');
        state.activeItems = [];
        return; // Prevent further rendering
    } else {
        if (el.searchContainer) el.searchContainer.classList.remove('hidden');
        if (el.catPills) el.catPills.parentElement.classList.remove('hidden');
        if (el.sectionHeader) el.sectionHeader.classList.remove('hidden');
        if (el.rowsContainer) el.rowsContainer.classList.remove('hidden');
        if (el.channelGrid) el.channelGrid.classList.remove('hidden');
        if (el.topBar) el.topBar.classList.remove('hidden');
        if (el.bottomNav) el.bottomNav.classList.remove('hidden');
    }

    if (mode === 'livetv') {
        state.activeItems = state.allChannels;
    } else if (mode === 'movies_series') {
        state.activeItems = [
            ...(typeof TAMIL_MOVIES !== 'undefined' ? TAMIL_MOVIES : []),
            ...(typeof TAMIL_DUBBED_MOVIES !== 'undefined' ? TAMIL_DUBBED_MOVIES : []),
            ...(typeof HOLLYWOOD_MOVIES !== 'undefined' ? HOLLYWOOD_MOVIES : []),
            ...(typeof WEB_SERIES !== 'undefined' ? WEB_SERIES : [])
        ];
    } else if (mode === 'favorites') {
        const all = [
            ...state.allChannels,
            ...(typeof TAMIL_MOVIES !== 'undefined' ? TAMIL_MOVIES : []),
            ...(typeof TAMIL_DUBBED_MOVIES !== 'undefined' ? TAMIL_DUBBED_MOVIES : []),
            ...(typeof HOLLYWOOD_MOVIES !== 'undefined' ? HOLLYWOOD_MOVIES : []),
            ...(typeof WEB_SERIES !== 'undefined' ? WEB_SERIES : [])
        ];
        const map = new Map();
        all.forEach(i => { if (state.favorites.has(i.id)) map.set(i.id, i); });
        state.activeItems = Array.from(map.values());
    }

    state.categories.clear();
    state.activeItems.forEach(i => {
        const cat = i.genre || i.category || 'General';
        state.categories.set(cat, (state.categories.get(cat) || 0) + 1);
    });

    if (state.activeItems.length > 0) {
        initHeroFeatured();
        updateHeroSpotlight(state.activeItems[0]);
        if (!state.currentItem) playItem(state.activeItems[0]);
    } else {
        el.hero?.classList.add('hidden');
    }

    applyFilters();
    updateModeCounts();

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const tabMap = { livetv: 'home', favorites: 'favorites' };
    const target = tabMap[mode] || 'home';
    document.querySelector(`.nav-item[data-tab="${target}"]`)?.classList.add('active');
}

// ---------- PARSE M3U ----------
function parseM3U(text) {
    const lines = text.split('\n');
    const channels = [];
    let current = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
            current = { name: 'Unknown', logo: '', category: 'General', language: 'Global', country: 'INT',
                url: '', type: 'live' };
            const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
            if (logoMatch) current.logo = logoMatch[1];
            const groupMatch = line.match(/group-title="([^"]*)"/i);
            if (groupMatch) current.category = groupMatch[1];
            const langMatch = line.match(/tvg-language="([^"]*)"/i);
            if (langMatch) current.language = langMatch[1];
            const comma = line.lastIndexOf(',');
            if (comma !== -1) current.name = line.substring(comma + 1).trim();
            if (current.name.toLowerCase().includes('tamil') || current.category.toLowerCase().includes('tamil')) {
                current.language = 'Tamil';
                current.country = 'IN';
            }
        } else if (line && !line.startsWith('#') && current) {
            if (line.startsWith('http://') || line.startsWith('https://')) {
                current.url = line;
                current.id = `m3u-${channels.length}-${Math.random().toString(36).substr(2,4)}`;
                channels.push(current);
                current = null;
            }
        }
    }
    return channels;
}

// ---------- LOAD INITIAL DATA ----------
async function loadInitialData() {
    setLoading(10, 'Loading channels...');
    if (typeof VERIFIED_TAMIL_CHANNELS !== 'undefined' && Array.isArray(VERIFIED_TAMIL_CHANNELS)) {
        state.allChannels = VERIFIED_TAMIL_CHANNELS.map((ch, idx) => ({
            id: ch.id || `live-${idx}`,
            name: ch.name || 'Live Channel',
            url: ch.url || '',
            logo: ch.logo || '',
            category: ch.category || 'General',
            language: ch.language || 'Tamil',
            country: ch.country || 'IN',
            type: 'live'
        }));
    }
    setLoading(40, 'Loading movies & series...');

    try {
        const url = el.playlistInput ? el.playlistInput.value : 'https://iptv-org.github.io/iptv/index.m3u';
        const resp = await fetch(url, { cache: 'no-cache' });
        if (resp.ok) {
            const text = await resp.text();
            const parsed = parseM3U(text);
            if (parsed.length) {
                const existing = new Set(state.allChannels.map(c => c.name.toLowerCase()));
                parsed.forEach(ch => {
                    if (!existing.has(ch.name.toLowerCase())) {
                        state.allChannels.push(ch);
                        existing.add(ch.name.toLowerCase());
                    }
                });
            }
        }
    } catch (_) { /* ignore */ }

    setLoading(80, 'Starting engine...');
    setTimeout(() => {
        setLoading(100, 'Ready!');
        setTimeout(() => {
            el.loadOverlay?.classList.add('fade-out');
            setTimeout(() => {
                el.loadOverlay?.classList.add('hidden');
                if (el.app && el.app.classList.contains('hidden')) {
                    el.portal?.classList.remove('portal-hidden');
                    el.portal?.classList.remove('hidden');
                }
            }, 400);
        }, 300);
    }, 200);
}

// ---------- MOVIE POPUP MODAL ----------
function openMovieModal() {
    const modal = document.getElementById('movie-popup-modal');
    if (!modal) return;
    if (window.i18n && typeof window.i18n.translateDOM === 'function') {
        window.i18n.translateDOM();
    }
    modal.classList.remove('hidden');
}

function closeMovieModal() {
    const modal = document.getElementById('movie-popup-modal');
    if (!modal) return;
    modal.classList.add('hidden');
}

// ---------- PORTAL TOAST NOTIFICATION ----------
let portalToastTimer = null;
function showPortalToast(message, iconClass = 'fa-circle-info') {
    const toast = el.portalToast || $('portal-toast');
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    const iconEl = toast.querySelector('.toast-icon');
    if (msgEl) msgEl.textContent = message;
    if (iconEl) iconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    
    toast.classList.remove('hidden');
    if (portalToastTimer) clearTimeout(portalToastTimer);
    portalToastTimer = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3500);
}

// ---------- ENTER APP ----------
function enterApp(mode) {
    closeMovieModal();
    if (el.portalToast) el.portalToast.classList.add('hidden');
    el.portal?.classList.add('portal-hidden');
    setTimeout(() => {
        el.portal?.classList.add('hidden');
        el.app?.classList.remove('hidden');
        switchMode(mode || 'livetv');
        if (!window.location.hash.includes(mode || 'livetv')) {
            try {
                history.pushState({ view: 'app' }, '', '#' + (mode || 'livetv'));
            } catch(e) {
                window.location.hash = (mode || 'livetv');
            }
        }
    }, 450);
}

function goHome(skipPush) {
    closeMovieModal();
    el.app?.classList.add('hidden');
    el.portal?.classList.remove('hidden');
    el.portal?.classList.remove('portal-hidden');
    if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }
    if (el.videoPlayer) { el.videoPlayer.pause(); el.videoPlayer.src = ''; }
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[data-tab="home"]')?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (skipPush !== true) {
        try {
            history.pushState({ view: 'home' }, '', '#');
        } catch(e) {
            window.location.hash = '';
        }
    }
}

// ---------- SETUP EVENTS ----------
function setupEvents() {
    window.addEventListener('popstate', (e) => {
        if (!e.state || e.state.view !== 'app') {
            goHome(true);
        }
    });

    document.querySelectorAll('.portal-card').forEach(card => {
        const handleCardAction = () => {
            if (card.dataset.locked === 'true' || card.classList.contains('locked')) {
                const lockIcon = card.querySelector('.lock-icon') || card.querySelector('.btn-lock');
                if (lockIcon) {
                    lockIcon.classList.remove('shake-lock');
                    void lockIcon.offsetWidth; // trigger browser reflow for instant re-animation
                    lockIcon.classList.add('shake-lock');
                }
                openMovieModal();
                return;
            }

            const mode = card.dataset.enter;
            if (mode) {
                enterApp(mode);
            }
        };

        card.addEventListener('click', handleCardAction);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardAction();
            }
        });
    });

    el.logoHome?.addEventListener('click', goHome);

    // Movie Popup Modal Close Listeners
    document.getElementById('close-movie-modal-btn')?.addEventListener('click', closeMovieModal);
    document.getElementById('btn-movie-gotit')?.addEventListener('click', closeMovieModal);
    document.getElementById('movie-popup-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'movie-popup-modal') {
            closeMovieModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMovieModal();
            hideSearchRecommendations();
        }
    });

    el.channelMenuBtn?.addEventListener('click', () => {
        el.channelMenuOverlay?.classList.add('show');
        populateChannelMenu();
    });
    el.closeChannelMenu?.addEventListener('click', () => {
        el.channelMenuOverlay?.classList.remove('show');
    });

    document.querySelectorAll('.mode-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const mode = pill.dataset.mode;
            if (mode) switchMode(mode);
        });
    });

    el.searchInput?.addEventListener('focus', () => {
        showSearchRecommendations(el.searchInput.value);
    });

    el.searchInput?.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        el.clearSearch?.classList.toggle('hidden', state.searchQuery === '');
        applyFilters();
        showSearchRecommendations(e.target.value);
    });

    el.clearSearch?.addEventListener('click', () => {
        if (el.searchInput) el.searchInput.value = '';
        state.searchQuery = '';
        el.clearSearch?.classList.add('hidden');
        hideSearchRecommendations();
        applyFilters();
    });

    // Close search recommendations on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-container')) {
            hideSearchRecommendations();
        }
    });

    el.pagePrev?.addEventListener('click', () => {
        if (state.currentPage > 1) { state.currentPage--; renderGrid(); }
    });
    el.pageNext?.addEventListener('click', () => {
        const total = Math.ceil(state.filteredItems.length / state.pageSize);
        if (state.currentPage < total) { state.currentPage++; renderGrid(); }
    });

    el.viewGrid?.addEventListener('click', () => {
        state.viewMode = 'grid';
        el.channelGrid?.classList.remove('list-mode');
        el.channelGrid?.classList.add('grid-mode');
        el.viewGrid.style.color = 'var(--text-primary)';
        el.viewList.style.color = 'var(--text-muted)';
    });
    el.viewList?.addEventListener('click', () => {
        state.viewMode = 'list';
        el.channelGrid?.classList.remove('grid-mode');
        el.channelGrid?.classList.add('list-mode');
        el.viewList.style.color = 'var(--text-primary)';
        el.viewGrid.style.color = 'var(--text-muted)';
    });

    el.prevBtn?.addEventListener('click', playPrevItem);
    el.nextBtn?.addEventListener('click', playNextItem);
    el.rewindBtn?.addEventListener('click', () => skipTime(-10));
    el.skipBtn?.addEventListener('click', () => skipTime(10));

    el.favToggle?.addEventListener('click', () => {
        if (state.currentItem) toggleFavorite(state.currentItem);
    });

    el.pipBtn?.addEventListener('click', async () => {
        try {
            if (el.videoPlayer !== document.pictureInPictureElement) {
                await el.videoPlayer?.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        } catch (_) {}
    });

    el.fsBackBtn?.addEventListener('click', toggleFullscreen);
    
    if (el.playPauseBtn) {
        el.playPauseBtn.addEventListener('click', () => {
            if (!el.videoPlayer) return;
            if (el.videoPlayer.paused) {
                el.videoPlayer.play().catch(e => console.log('Play error', e));
            } else {
                el.videoPlayer.pause();
            }
        });
    }

    if (el.videoPlayer) {
        el.videoPlayer.addEventListener('play', () => {
            if (el.playPauseBtn) el.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        });
        el.videoPlayer.addEventListener('pause', () => {
            if (el.playPauseBtn) el.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        });
    }

    if (el.fullscreenBtn) el.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (el.bigFullscreenBtn) el.bigFullscreenBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFsBtn);
    document.addEventListener('webkitfullscreenchange', updateFsBtn);

    el.aspectSelect?.addEventListener('change', (e) => {
        if (el.videoPlayer) {
            el.videoPlayer.className = '';
            if (e.target.value !== 'default') {
                el.videoPlayer.classList.add('aspect-' + e.target.value);
            }
        }
    });

    el.resetFiltersBtn?.addEventListener('click', () => {
        state.searchQuery = '';
        if (el.searchInput) el.searchInput.value = '';
        el.clearSearch?.classList.add('hidden');
        selectCategory('all');
    });

    el.confirmWelcome?.addEventListener('click', () => {
        el.welcomeModal?.classList.add('hidden');
        localStorage.setItem('novastream_edu_ack', 'true');
    });
    el.closeWelcome?.addEventListener('click', () => {
        el.welcomeModal?.classList.add('hidden');
        localStorage.setItem('novastream_edu_ack', 'true');
    });

    el.offlineNext?.addEventListener('click', () => {
        el.offlineModal?.classList.add('hidden');
        playNextItem();
    });
    el.offlineClose?.addEventListener('click', () => el.offlineModal?.classList.add('hidden'));
    el.closeOffline?.addEventListener('click', () => el.offlineModal?.classList.add('hidden'));

    document.querySelector('.nav-item[data-tab="settings"]')?.addEventListener('click', () => {
        el.settingsModal?.classList.remove('hidden');
    });
    el.closeSettings?.addEventListener('click', () => el.settingsModal?.classList.add('hidden'));

    el.openDisclaimer?.addEventListener('click', () => {
        el.settingsModal?.classList.add('hidden');
        el.disclaimerModal?.classList.remove('hidden');
    });
    el.closeDisclaimer?.addEventListener('click', () => {
        el.disclaimerModal?.classList.add('hidden');
    });

    document.getElementById('lang-select')?.addEventListener('change', () => {
        if (el.portal?.classList.contains('hidden')) {
            switchMode(state.currentMode);
        } else {
            // Re-render portal counts or text if necessary, though i18n handles static DOM.
        }
    });

    document.getElementById('all-channels-see-all')?.addEventListener('click', () => {
        selectCategory('all');
        document.getElementById('rows-container')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Top Bar Actions (Screenshot 1 & 2)
    document.getElementById('hamburger-menu-btn')?.addEventListener('click', () => {
        el.channelMenuOverlay?.classList.add('show');
        populateChannelMenu();
    });
    document.getElementById('top-search-btn')?.addEventListener('click', () => {
        el.searchInput?.focus();
        showSearchRecommendations(el.searchInput?.value || '');
        document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('top-notify-btn')?.addEventListener('click', () => {
        el.welcomeModal?.classList.remove('hidden');
    });
    document.getElementById('top-profile-btn')?.addEventListener('click', () => {
        el.settingsModal?.classList.remove('hidden');
    });

    // Category Pills Scroll Button (Screenshot 1)
    document.getElementById('cat-scroll-right')?.addEventListener('click', () => {
        el.catPills?.scrollBy({ left: 160, behavior: 'smooth' });
    });

    // Bottom Navigation (Screenshot 1 & 2)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            if (tab === 'home') {
                if (el.app && !el.app.classList.contains('hidden')) {
                    switchMode('livetv');
                    selectCategory('all');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    goHome();
                }
            } else if (tab === 'search') {
                el.searchInput?.focus();
                showSearchRecommendations(el.searchInput?.value || '');
                document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' });
            } else if (tab === 'favorites') {
                if (el.portal?.classList.contains('hidden')) {
                    switchMode('favorites');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    enterApp('favorites');
                }
            } else if (tab === 'settings') {
                el.settingsModal?.classList.remove('hidden');
            }
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && document.activeElement === el.videoPlayer) {
            e.preventDefault();
            skipTime(10);
        } else if (e.key === 'ArrowLeft' && document.activeElement === el.videoPlayer) {
            e.preventDefault();
            skipTime(-10);
        }
    });
}

function skipTime(sec) {
    const v = el.videoPlayer;
    if (!v) return;
    if (v.duration && !isNaN(v.duration)) {
        v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
    } else {
        v.currentTime = Math.max(0, v.currentTime + sec);
    }
}

function toggleFullscreen() {
    const container = el.videoWrap || el.videoPlayer;
    if (!container) return;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        let p;
        if (container.requestFullscreen) p = container.requestFullscreen();
        else if (container.webkitRequestFullscreen) p = container.webkitRequestFullscreen();
        else if (el.videoPlayer?.webkitEnterFullscreen) el.videoPlayer.webkitEnterFullscreen();

        if (p && p.then) {
            p.then(() => {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock("landscape").catch(e => console.warn(e));
                }
            }).catch(e => console.warn(e));
        } else {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape").catch(e => console.warn(e));
            }
        }
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }
}

function updateFsBtn() {
    const isFS = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    el.fsBackBtn?.classList.toggle('visible', isFS);
    if (el.fullscreenBtn) {
        el.fullscreenBtn.innerHTML = isFS ?
            '<i class="fa-solid fa-compress"></i>' :
            '<i class="fa-solid fa-expand"></i>';
    }
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
    initDomRefs();
    setupEvents();
    
    el.portal?.classList.remove('hidden');
    el.portal?.classList.remove('portal-hidden');
    el.app?.classList.add('hidden');

    loadInitialData();

    if (el.favDot) {
        el.favDot.style.display = state.favorites.size > 0 ? 'block' : 'none';
    }
    
    if (window.location.hash.includes('movies_series')) {
        setTimeout(() => enterApp('movies_series'), 100);
    }
});

// ---------- CHANNEL MENU OVERLAY LOGIC ----------
function populateChannelMenu(activeCat = 'all') {
    if (!el.menuCats || !el.menuList) return;
    
    // Build category map for currently active items
    const catMap = new Map();
    catMap.set('all', state.activeItems.length);
    
    state.activeItems.forEach(item => {
        const c = item.genre || item.category || 'General';
        catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    // Render category pills
    el.menuCats.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.textContent = `All (${catMap.get('all')})`;
    if (activeCat === 'all') allBtn.classList.add('active');
    allBtn.onclick = () => populateChannelMenu('all');
    el.menuCats.appendChild(allBtn);

    const sortedCats = Array.from(catMap.entries())
        .filter(([c]) => c !== 'all')
        .sort((a, b) => b[1] - a[1]);
        
    sortedCats.forEach(([cat, count]) => {
        if (count === 0) return;
        const btn = document.createElement('button');
        btn.textContent = `${cat} (${count})`;
        if (activeCat === cat) btn.classList.add('active');
        btn.onclick = () => populateChannelMenu(cat);
        el.menuCats.appendChild(btn);
    });

    // Filter items for list
    let filtered = state.activeItems;
    if (activeCat !== 'all') {
        filtered = filtered.filter(i => (i.genre || i.category || 'General') === activeCat);
    }
    
    if (state.currentMode === 'livetv') {
        filtered = sortChannels(filtered);
    }

    // Render list
    el.menuList.innerHTML = '';
    filtered.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'channel-menu-item';
        if (state.currentItem && state.currentItem.id === item.id) {
            div.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = item.logo || item.poster || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>';
        img.onerror = () => { img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>'; };
        
        const meta = document.createElement('div');
        meta.className = 'c-meta';
        const name = document.createElement('div');
        name.className = 'c-name';
        name.textContent = getItemName(item);
        const cat = document.createElement('div');
        cat.className = 'c-cat';
        cat.textContent = item.genre || item.category || 'General';
        
        meta.appendChild(name);
        meta.appendChild(cat);
        
        div.appendChild(img);
        div.appendChild(meta);
        
        div.onclick = () => {
            el.channelMenuOverlay.classList.remove('show');
            const trueIndex = state.filteredItems.findIndex(i => i.id === item.id);
            playItem(item, trueIndex >= 0 ? trueIndex : index);
        };
        
        el.menuList.appendChild(div);
    });
}
