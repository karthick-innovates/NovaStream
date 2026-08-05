/**
 * ============================================================================
 *  ALL CHANNELS MANUAL CONFIGURATION FILE (FOR VS CODE EDITING)
 * ============================================================================
 * 
 * HOW TO ADD CHANNELS MANUALLY IN VS CODE:
 * 1. Open this file (all-channels.js) in VS Code.
 * 2. Copy one of the line templates below and paste it inside the list.
 * 3. Change the 'name', 'category', 'logo' (optional), and 'url' (m3u8 stream link).
 * 4. Save the file! Your new channel will automatically appear on the web app!
 * 
 * AVAILABLE CATEGORIES: 'News', 'Music', 'Movies', 'Entertainment', 'Devotional', 'Kids', 'General'
 * ============================================================================
 */

const ALL_CHANNELS_LIST = [
  // --- ADD YOUR NEW CHANNELS HERE (COPY & PASTE A LINE BELOW) ---
  
  // High-Speed News & Entertainment Streams
  { name: 'Puthiya Thalaimurai News (24x7)', nameTa: 'புதிய தலைமுறை செய்திகள் (24x7)', category: 'News', logo: 'https://dtil.tmsimg.com/assets/s143692_ld_h15_aa.png?lock=720x540', url: 'https://segment.yuppcdn.net/240122/puthiya/playlist.m3u8' },
  { name: 'Polimer News Tamil Live HD', nameTa: 'பாலிமர் செய்திகள் HD', category: 'News', logo: 'https://i.imgur.com/1G66pT6.png', url: 'https://live.polimernews.com/hls/stream.m3u8' },
  { name: 'Thanthi TV News Tamil HD', nameTa: 'தந்தி டிவி செய்திகள் HD', category: 'News', logo: 'https://dtil.tmsimg.com/assets/s144000_ld_h15_aa.png?lock=720x540', url: 'https://cdn-3.pishow.tv/live/1612/master.m3u8' },
  { name: 'News7 Tamil Live HD', nameTa: 'நியூஸ் 7 தமிழ் HD', category: 'News', logo: 'https://i.imgur.com/3qY84Ue.png', url: 'https://d2q8p4pe5spbak.cloudfront.net/live/news7/playlist.m3u8' },
  { name: 'Kalaignar Seithigal (Tamil News)', nameTa: 'கலைஞர் செய்திகள்', category: 'News', logo: 'https://i.imgur.com/4N0r7O1.png', url: 'https://kalaignartv.akamaized.net/hls/live/2026815/KalaignarNews/master.m3u8' },
  { name: 'News18 Tamil Nadu Live', nameTa: 'நியூஸ் 18 தமிழ்நாடு', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=N18', url: 'https://n18syndication.akamaized.net/bpk-tv/News18_Tamil_Nadu_NW18_MOB/output01/master.m3u8' },
  { name: 'News Tamil 24x7 HD', nameTa: 'நியூஸ் தமிழ் 24x7 HD', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=NT24', url: 'https://d18a8tqmogafg2.cloudfront.net/newstamil/index.m3u8' },
  { name: 'Raj News Tamil 24x7', nameTa: 'ராஜ் செய்திகள் 24x7', category: 'News', logo: 'https://i.imgur.com/8QW1T0L.png', url: 'https://rajnews.akamaized.net/hls/live/raj.m3u8' },
  { name: 'Sathiyam TV News Tamil', nameTa: 'சத்தியம் டிவி செய்திகள்', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=STV', url: 'https://sathiyam.akamaized.net/hls/live/stream.m3u8' },
  { name: 'Lotus News Tamil Live', nameTa: 'லோட்டஸ் செய்திகள்', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=LOTUS', url: 'https://lotusnews.akamaized.net/hls/live/index.m3u8' },
  { name: 'Madhimugam TV News Tamil', nameTa: 'மதிமுகம் டிவி செய்திகள்', category: 'News', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Madhimugam_TV.png', url: 'https://yuppparoriglin.akamaized.net/181224/smil:mathimugam.smil/playlist.m3u8' },
  { name: 'Malai Murasu TV News Tamil', nameTa: 'மாலை முரசு டிவி செய்திகள்', category: 'News', logo: 'https://i.imgur.com/OC5TQxp.png', url: 'https://amg17783-amg17783c1-amgplt0173.playout.now3.amagi.tv/playlist/amg17783-amg17783c1-amgplt0173/playlist.m3u8' },
  { name: 'News J Tamil 24x7', nameTa: 'நியூஸ் ஜே தமிழ் 24x7', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=NEWSJ', url: 'https://cdn-3.pishow.tv/live/1279/master.m3u8' },
  { name: 'Velicham TV News Tamil', nameTa: 'வெளிச்சம் டிவி செய்திகள்', category: 'News', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Logo_of_Velicham_TV.png', url: 'https://cdn-3.pishow.tv/live/461/master.m3u8' },
  { name: 'Zee Tamil News Live', nameTa: 'ஜீ தமிழ் செய்திகள்', category: 'News', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=ZEE', url: 'https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/ZMCL/ZeeTamilNews.m3u8' },

  // Music & Songs Channels
  { name: '7S Music Tamil HD', nameTa: '7S மியூசிக் தமிழ் HD', category: 'Music', logo: 'https://i.imgur.com/zDiIhdN.png', url: 'https://mumt03.tangotv.in/Dsly5z3H7SMUSIC/index.m3u8' },
  { name: 'Aaryaa TV Tamil', nameTa: 'ஆர்யா டிவி தமிழ்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/aryatvtamil.png', url: 'https://stream.ottlive.co.in/aryatvtamil/index.m3u8' },
  { name: 'Sun Music Tamil Songs', nameTa: 'சன் மியூசிக் தமிழ்', category: 'Music', logo: 'https://i.imgur.com/6B53x6N.png', url: 'https://sunmusic.akamaized.net/hls/live/music.m3u8' },
  { name: 'Peppers TV Music Tamil', nameTa: 'பெப்பர்ஸ் டிவி மியூசிக்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Peppers_TV.png', url: 'https://cdn-2.pishow.tv/live/1383/master.m3u8' },
  { name: 'Raj Musix Tamil Songs', nameTa: 'ராஜ் மியூசிக்ஸ் தமிழ்', category: 'Music', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=MUSIX', url: 'https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/Raj_Musix/master_1.m3u8' },
  { name: 'Sana Plus Music Tamil HD', nameTa: 'சனா பிளஸ் மியூசிக் HD', category: 'Music', logo: 'https://i.imgur.com/N6tKUZv.png', url: 'https://mumbai-edge.smartplaytv.in/SanaPlusHD/index.m3u8' },
  { name: 'Tunes 6 Music Tamil', nameTa: 'டியூன்ஸ் 6 மியூசிக்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Tunes_6.png', url: 'https://stream.d6-pro.com/tunes6music/live/video.m3u8' },
  { name: 'Ultimate TV Music Tamil', nameTa: 'அல்டிமேட் டிவி மியூசிக்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/utvtamil.png', url: 'https://stream.ottlive.co.in/utvtamil/index.m3u8' },
  { name: 'Vaanavil TV Music Tamil', nameTa: 'வானவில் டிவி மியூசிக்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Vaanavil_TV.png', url: 'https://6n3yope4d9ok-hls-live.5centscdn.com/vaanavil/TV.stream/playlist.m3u8' },
  { name: 'Max Music Tamil HD', nameTa: 'மேக்ஸ் மியூசிக் தமிழ் HD', category: 'Music', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=MUSIC', url: 'https://live.maxtn.in/maxmusic/maxmusic/index.m3u8' },

  // Movies & Cinema Channels
  { name: 'KTV Tamil Movie Songs', nameTa: 'கேடிவி தமிழ் திரைப்படங்கள்', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=KTV', url: 'https://sunnetwork.akamaized.net/hls/live/ktv.m3u8' },
  { name: 'Kalaignar Murasu Tamil Movies', nameTa: 'கலைஞர் முரசு தமிழ்', category: 'Movies', logo: 'https://dtil.tmsimg.com/assets/s143561_ld_h15_aa.png?lock=720x540', url: 'https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/murasu_nim_https/050522/murasu/playlist.m3u8' },
  { name: 'Raj Digital Plus Movies', nameTa: 'ராஜ் டிஜிட்டல் பிளஸ்', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=RAJ+', url: 'https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/RajTV_Digital_plus/master_1.m3u8' },
  { name: 'Suriyan TV Movies Tamil', nameTa: 'சூரியன் டிவி திரைப்படங்கள்', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=SURIYAN', url: 'https://stream.sscloud7.com/live/suriyantv/index.m3u8' },
  { name: 'Thalaa TV Tamil Movies HD', nameTa: 'தல டிவி திரைப்படங்கள் HD', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=THALAA', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/2069c593-3c07-4d62-9d44-746be5c3a5d6/manifest.m3u8' },
  { name: 'Max Movies Tamil HD', nameTa: 'மேக்ஸ் மூவிஸ் தமிழ் HD', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=MAX', url: 'https://live.maxtn.in/maxmovies/maxmovies/index.m3u8' },
  { name: 'Roja Movies Tamil', nameTa: 'ரோஜா மூவிஸ் தமிழ்', category: 'Movies', logo: 'https://via.placeholder.com/60x60/1e293b/ff007f?text=ROJA', url: 'https://stream.rojatv.cloud/rojatv/rojatv/index.m3u8' },

  // General & Entertainment Channels
  { name: 'DD Tamil (Podhigai National)', nameTa: 'டிடி தமிழ் (பொதிகை)', category: 'General', logo: 'https://i.imgur.com/zW0r2k1.png', url: 'https://d2lk5u59tns74c.cloudfront.net/out/v1/abf46b14847e45499f4a47f3a9afe93d/index.m3u8' },
  { name: 'Brio TV Tamil Entertainment', nameTa: 'பிரியோ டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Brio_TV.png', url: 'https://mumt02.tangotv.in/BRIOTV/index.m3u8' },
  { name: 'EET TV Tamil Live', nameTa: 'ஈஇடி டிவி தமிழ்', category: 'Entertainment', logo: 'https://i.imgur.com/rMldFW8.png', url: 'https://live.streamjo.com/eetlive/eettv.m3u8' },
  { name: 'IBC Tamil General & News', nameTa: 'ஐபிசி தமிழ்', category: 'General', logo: 'https://i.imgur.com/uVt9vBa.png', url: 'https://ibc.massstream.net/IBC/index.m3u8' },
  { name: 'Jaya TV Tamil Live', nameTa: 'ஜெயா டிவி தமிழ்', category: 'General', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=JAYA', url: 'https://jayatv.akamaized.net/hls/live/jaya.m3u8' },
  { name: 'Makkal TV Tamil HD', nameTa: 'மக்கள் டிவி தமிழ் HD', category: 'General', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=MAKKAL', url: 'https://5k8q87azdy4v-hls-live.wmncdn.net/MAKKAL/271ddf829afeece44d8732757fba1a66.sdp/playlist.m3u8' },
  { name: 'Malar TV Tamil Live', nameTa: 'மலர் டிவி தமிழ்', category: 'General', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=MALAR', url: 'https://cdn-3.pishow.tv/live/473/master.m3u8' },
  { name: 'Marutam TV Tamil Entertainment', nameTa: 'மருதம் டிவி தமிழ்', category: 'Entertainment', logo: 'https://i.imgur.com/cFNw4Af.png', url: 'https://cdn-3.pishow.tv/live/1253/master.m3u8' },
  { name: 'MNTV Tamil HD', nameTa: 'எம்என்டிவி தமிழ் HD', category: 'Entertainment', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=MNTV', url: 'https://mntv.livebox.co.in/mntvhls/live.m3u8' },
  { name: 'Oli TV Tamil HD', nameTa: 'ஒலி டிவி தமிழ் HD', category: 'Entertainment', logo: 'https://i.ibb.co/XfvTQyJn/main-removebg-preview.png', url: 'https://live.olidigital.in/olitv/olitv/index.m3u8' },
  { name: 'Polimer TV Entertainment Tamil', nameTa: 'பாலிமர் டிவி தமிழ்', category: 'Entertainment', logo: 'https://dtil.tmsimg.com/assets/s143665_ld_h15_aa.png?lock=720x540', url: 'https://cdn-2.pishow.tv/live/1241/master.m3u8' },
  { name: 'Puthuyugam TV Tamil HD', nameTa: 'புதுயுகம் டிவி தமிழ் HD', category: 'General', logo: 'https://dtil.tmsimg.com/assets/s143693_ld_h15_aa.png?lock=720x540', url: 'https://mumt04.tangotv.in/m18aqlK4PUTHUYUGAMTV/index.m3u8' },
  { name: 'Roja TV Tamil Entertainment', nameTa: 'ரோஜா டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/rojatv.png', url: 'https://stream.rojatv.cloud/rojatv/rojatv/index.m3u8' },
  { name: 'Sana TV Tamil Entertainment', nameTa: 'சனா டிவி தமிழ்', category: 'Entertainment', logo: 'https://i.imgur.com/CR7DGBv.png', url: 'https://vglivessai.akamaized.net/us/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b6d9e864-ec16-410a-804d-ccf8f720bfaa/index.m3u8' },
  { name: 'Shalini TV Tamil', nameTa: 'ஷாலினி டிவி தமிழ்', category: 'Entertainment', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=SHALINI', url: 'https://stream.singamcloud.in/shalinitv/shalinitv/index.m3u8' },
  { name: 'Subin TV Tamil Entertainment', nameTa: 'சுபின் டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/subintvtamil.png', url: 'https://stream.galaxyott.live/live/subintv/index.m3u8' },
  { name: 'Suriya TV Tamil Live', nameTa: 'சூர்யா டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/suryatvtamil.png', url: 'https://stream.ottlive.co.in/suryatvtamil/index.m3u8' },
  { name: 'TamilVision TV (TVI Canada)', nameTa: 'தமிழ்விஷன் டிவி', category: 'General', logo: 'https://i.imgur.com/DodsLuW.png', url: 'https://live.cmr24.fm/TVI/HD/chunks.m3u8' },
  { name: 'Thanthi One Entertainment Tamil', nameTa: 'தந்தி ஒன் தமிழ்', category: 'Entertainment', logo: 'https://dtil.tmsimg.com/assets/s158791_ld_h15_aa.png?lock=720x540', url: 'https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8' },
  { name: 'Vasanth TV Tamil HD', nameTa: 'வசந்த் டிவி தமிழ் HD', category: 'General', logo: 'https://dtil.tmsimg.com/assets/s144068_ld_h15_aa.png?lock=720x540', url: 'https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8' },
  { name: 'Vendhar TV Tamil Live', nameTa: 'வேந்தர் டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Vendhar_TV.png', url: 'https://cdn-3.pishow.tv/live/1271/master.m3u8' },
  { name: 'Win TV Tamil Live', nameTa: 'வின் டிவி தமிழ்', category: 'General', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/Win_TV.png', url: 'https://cdn-4.pishow.tv/live/1531/master.m3u8' },

  // Kids Channels
  { name: 'Chithiram TV Kids Tamil', nameTa: 'சித்திரம் டிவி கிட்ஸ் தமிழ்', category: 'Kids', logo: 'https://i.imgur.com/xv9cWSh.png', url: 'https://cdn-6.pishow.tv/live/1243/master.m3u8' },

  // Devotional & Religious Channels
  { name: 'Aaseervatham TV Devotional', nameTa: 'ஆசீர்வாதம் டிவி', category: 'Religious', logo: 'https://i.imgur.com/GlfrYs7.png', url: 'https://mumt04.tangotv.in/m18aqlK4AASEERVATHAMTV/index.m3u8' },
  { name: 'Aastha Tamil Devotional', nameTa: 'ஆஸ்தா தமிழ் பக்தி', category: 'Religious', logo: 'https://i.imgur.com/YQK9ewf.png', url: 'https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8' },
  { name: 'Angel TV India Devotional', nameTa: 'ஏஞ்சல் டிவி இந்தியா', category: 'Religious', logo: 'https://i.imgur.com/qKLEGU7.png', url: 'https://janya-digimix.akamaized.net/vglive-sk-394914/india/ngrp:angelindia_all/playlist.m3u8' },
  { name: 'Dharshan TV Devotional', nameTa: 'தர்ஷன் டிவி பக்தி', category: 'Religious', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=DTV', url: 'https://cable91tataplay.akamaized.net/live/dharshantv/index.m3u8' },
  { name: 'IBC Bakthi Tamil Devotional', nameTa: 'ஐபிசி பக்தி தமிழ்', category: 'Religious', logo: 'https://i.imgur.com/ZNEz5Wx.png', url: 'https://ibc.massstream.net/IBC2/index.m3u8' },
  { name: 'Joy TV Tamil Live', nameTa: 'ஜாய் டிவி தமிழ்', category: 'Religious', logo: 'https://via.placeholder.com/60x60/1e293b/00f0ff?text=JOY', url: 'https://ktismaservers.in:3412/live/joytvlive.m3u8' },
  { name: 'Life TV Tamil Devotional', nameTa: 'லைஃப் டிவி தமிழ்', category: 'Religious', logo: 'https://i.ibb.co/v1C0bdR/logo-1.png', url: 'https://lifetv.livebox.co.in/lifetvhls/lifetv.m3u8' },
  { name: 'Sankara Devotional TV Tamil', nameTa: 'சங்கரா பக்தி டிவி தமிழ்', category: 'Religious', logo: 'https://i.imgur.com/2z0bDRD.png', url: 'https://cdn-3.pishow.tv/live/1135/master.m3u8' },
  { name: 'Sivan TV Devotional Tamil', nameTa: 'சிவன் டிவி பக்தி தமிழ்', category: 'Religious', logo: 'https://i.ibb.co/b3HG9wm/Logo-site.png', url: 'http://sivantv.livebox.co.in/sivantvhls/sivan.m3u8' },
  { name: 'SVBC 2 Tamil Devotional HD', nameTa: 'எஸ்விபிசி 2 தமிழ் HD', category: 'Religious', logo: 'https://dtil.tmsimg.com/assets/s143890_ld_h9_aa.png?lock=720x540', url: 'https://player.mslivestream.net/tamil/ac206e74d75b285755ee4924df87d951.sdp/playlist.m3u8' },
  { name: 'Village TV Devotional Tamil', nameTa: 'வில்லேஜ் டிவி தமிழ்', category: 'Religious', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/VillageTV.png', url: 'https://villagetv.applelive.in/villagetv/villagetv/index.m3u8' }
];
