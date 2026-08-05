/**
 * ============================================================================
 *  ALL CHANNELS MANUAL CONFIGURATION FILE (FOR VS CODE EDITING)
 * ============================================================================
 * 
 * HOW TO ADD CHANNELS MANUALLY IN VS CODE:
 * 1. Open this file (tamil-channels.js) in VS Code.
 * 2. Copy one of the line templates below and paste it inside the list.
 * 3. Change the 'name', 'category', 'logo' (optional), and 'url' (m3u8 stream link).
 * 4. Save the file! Your new channel will automatically appear on the web app!
 * 
 * AVAILABLE CATEGORIES: 'News', 'Music', 'Movies', 'Entertainment', 'Devotional', 'Kids', 'General'
 * ============================================================================
 */

const VERIFIED_TAMIL_CHANNELS = [
  { name: 'Puthiya Thalaimurai News (24x7)', nameTa: 'புதிய தலைமுறை செய்திகள் (24x7)', category: 'News', logo: 'https://images.jdmagicbox.com/quickquotes/images_main/puthiya-thalaimurai-newspaper-2184975307-owp6whco.png', url: 'https://segment.yuppcdn.net/240122/puthiya/playlist.m3u8' },
  // --- TOP ENTERTAINMENT & MOVIES ---
 {
  name: 'Vel TV',
  nameTa: 'வேல் டிவி',
  category: 'Movies',
  logo: '',
  url: 'http://veltv.phoenixcreations.online/veltv/vel/playlist.m3u8'
},
  { name: 'Polimer TV Entertainment Tamil', nameTa: 'பாலிமர் டிவி தமிழ்', category: 'Entertainment', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuDLOI0EwphXsCJPqVWB06cZW8a43TFOrHhA2R6hJn9NOknEaAqEOGcXm&s=10', url: 'https://cdn-2.pishow.tv/live/1241/master.m3u8' },
  { name: 'Kalaignar Murasu Tamil Movies', nameTa: 'கலைஞர் முரசு தமிழ்', category: 'Movies', logo: 'https://nagantv.com/upload/files/murasu%20tv.png', url: 'https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/murasu_nim_https/050522/murasu/playlist.m3u8' },
  { name: 'Raj Digital Plus Movies', nameTa: 'ராஜ் டிஜிட்டல் பிளஸ்', category: 'Movies', logo: 'https://static.wikia.nocookie.net/logopedia/images/e/e3/Raj_Digital_Plus.jpeg/revision/latest?cb=20191231195635', url: 'https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/RajTV_Digital_plus/master_1.m3u8' },
  { name: 'Thalaa TV Tamil Movies HD', nameTa: 'தல டிவி திரைப்படங்கள் HD', category: 'Movies', logo: 'https://d229kpbsb5jevy.cloudfront.net/yuppfast/content/common/channel/logos/thalaa-tv.png', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/2069c593-3c07-4d62-9d44-746be5c3a5d6/manifest.m3u8' },
  
  // --- TOP NEWS CHANNELS ---
  { name: 'Thanthi TV News Tamil HD', nameTa: 'தந்தி டிவி செய்திகள் HD', category: 'News', logo: 'https://cdn.aptoide.com/imgs/0/3/8/038aa796cabc597e646ad84a0aa4d1a9_fgraphic.jpg', url: 'https://cdn-3.pishow.tv/live/1612/master.m3u8' },
  { name: 'News18 Tamil Nadu Live', nameTa: 'நியூஸ் 18 தமிழ்நாடு', category: 'News', logo: 'https://www.medianews4u.com/wp-content/uploads/2020/07/News18-Tamil-Nadu-wins-interim-injunction-from-Madras-High-Court.jpg', url: 'https://n18syndication.akamaized.net/bpk-tv/News18_Tamil_Nadu_NW18_MOB/output01/master.m3u8' },
  { name: 'Zee Tamil News Live', nameTa: 'ஜீ தமிழ் செய்திகள்', category: 'News', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Zee_Tamil_News.webp', url: 'https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/ZMCL/ZeeTamilNews.m3u8' },
  { name: 'News J Tamil 24x7', nameTa: 'நியூஸ் ஜே தமிழ் 24x7', category: 'News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf080Wqt7vOyJO7H0rN6UHw_sWIQlXijNo9OzibhhyBsqPpfF_Jh3Yu_5I&s=10', url: 'https://cdn-3.pishow.tv/live/1279/master.m3u8' },
  { name: 'Malai Murasu TV News Tamil', nameTa: 'மாலை முரசு டிவி செய்திகள்', category: 'News', logo: 'https://apiexcellent.com/storage/images/medias/television/product/malai-murasu-television10282.webp', url: 'https://amg17783-amg17783c1-amgplt0173.playout.now3.amagi.tv/playlist/amg17783-amg17783c1-amgplt0173/playlist.m3u8' },
  { name: 'Velicham TV News Tamil', nameTa: 'வெளிச்சம் டிவி செய்திகள்', category: 'News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVAImjc26WSxUm8XwVCQXUpvuB1RLu0tTXr3w4WhstrZ08J5BushKmf4&s=10', url: 'https://cdn-3.pishow.tv/live/461/master.m3u8' },

  // --- MOVIES & MUSIC (MORE) ---
  { name: 'Suriyan TV Movies Tamil', nameTa: 'சூரியன் டிவி திரைப்படங்கள்', category: 'Movies', logo: 'https://play-lh.googleusercontent.com/1Q4b2Tjwx65pnAGRM58gAf2C9f42fUxMjP1m6Txqx1ChnXj6cPp-0lMyadJca2fOH9MjT6nOB_AQbvjz0YkoquA', url: 'https://stream.sscloud7.com/live/suriyantv/index.m3u8' },
  { name: 'Roja Movies Tamil', nameTa: 'ரோஜா மூவிஸ் தமிழ்', category: 'Movies', logo: 'https://play-lh.googleusercontent.com/ZzkRu-9Khd69EHqBZxH3z1ukvA0uAVEN5Fb2aeNaYcwa9Dex6fOEYs5r_edmE1k20BAMXRu3oMSpAzWF84YcPg=w526-h296-rw', url: 'https://stream.rojatv.cloud/rojatv/rojatv/index.m3u8' },
  { name: '7S Music Tamil HD', nameTa: '7S மியூசிக் தமிழ் HD', category: 'Music', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiOP-2kr1yifDERaf1orjuXLdsJMR1Uef2UPWsUr074fOz2XuDiQzoXnmK&s=10', url: 'https://mumt03.tangotv.in/Dsly5z3H7SMUSIC/index.m3u8' },
  { name: 'Raj Musix Tamil Songs', nameTa: 'ராஜ் மியூசிக்ஸ் தமிழ்', category: 'Music', logo: 'https://d229kpbsb5jevy.cloudfront.net/st-ak/yupptv/og_image/Raj-Music.png', url: 'https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/Raj_Musix/master_1.m3u8' },
  { name: 'Peppers TV Music Tamil', nameTa: 'பெப்பர்ஸ் டிவி மியூசிக்', category: 'Music', logo: 'https://apiexcellent.com/storage/images/medias/television/product/peppers-tv-television10364.webp', url: 'https://cdn-2.pishow.tv/live/1383/master.m3u8' },
  { name: 'Sana Plus Music Tamil HD', nameTa: 'சனா பிளஸ் மியூசிக் HD', category: 'Music', logo: 'https://i.imgur.com/N6tKUZv.png', url: 'https://mumbai-edge.smartplaytv.in/SanaPlusHD/index.m3u8' },
  { name: 'Aaryaa TV Tamil', nameTa: 'ஆர்யா டிவி தமிழ்', category: 'Music', logo: 'https://play-lh.googleusercontent.com/hOdYNEq1-4391lCbHSIu81Bm1RM4t9pLjDyzirnFOmuAGoeWpgs-3b0dPHdOKdqVIM5rIu6Bm8TqQr-Bkbnefg', url: 'https://stream.ottlive.co.in/aryatvtamil/index.m3u8' },
  { name: 'Tunes 6 Music Tamil', nameTa: 'டியூன்ஸ் 6 மியூசிக்', category: 'Music', logo: 'https://d6pro.in/uploads/tv_image/sm/tunes-6-music.png', url: 'https://stream.d6-pro.com/tunes6music/live/video.m3u8' },
  { name: 'Ultimate TV Music Tamil', nameTa: 'அல்டிமேட் டிவி மியூசிக்', category: 'Music', logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/utvtamil.png', url: 'https://stream.ottlive.co.in/utvtamil/index.m3u8' },

  // --- GENERAL ENTERTAINMENT ---
  {
  name: "PG TV HD",
  nameTa: "பிஜி டிவி HD",
  category: "Entertainment",
  logo: "https://static.vecteezy.com/system/resources/thumbnails/004/701/546/small/pg-letter-logo-isolated-on-white-background-vector.jpg",
  url: "http://xstream.onecloudlive.in:8080/pgtv/pgtvhd/mono.m3u8"
},
{
  name: "Annai TV",
  nameTa: "அன்னை டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/lVRWVDehSsWowxds1f3ZGAurZLUVImbooOd0eyme0M9NTAdPsDIWb8Sy3nJC4f0m1JdJbrYsf2vMdOfd3H3QSA",
  url: "https://annaitv.phoenixcreations.online:1935/annai/annaitv/playlist.m3u8"
},
{
  name: "Bala TV",
  nameTa: "பாலா டிவி",
  category: "Entertainment",
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7i2DtO_tEqxl375zKQ7L5X9yYgIL4qsFEndKtRk_nIsiBbgTwUFgkywmS&s=10",
  url: "https://balatv.phoenixcreations.online/balatv/bala/playlist.m3u8"
},
{
  name: "Bama TV",
  nameTa: "பாமா டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/ThY1TjzRvMqPNb30DOi2aoYhUWhnLGP_FA65_ll_xlVTlrN6ScvMC22PBqs5S69w2TFm3hnQCaH8AnXAoiwRIA",
  url: "http://bamatv.phoenixcreations.online:1935/bamatv/bama/playlist.m3u8"
},
{
  name: "Mangalam TV",
  nameTa: "மங்களம் டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/SGyfDbRPr5ySSLnPaRWovKGYTPhIZ0WdDxKgR5tiAURCGOVQDOWFNSNXZ3YtLIjZ9hq0_vqsyz4SpSmFO6Nj",
  url: "https://mangalamtv-scv.tamilstream.in/mangalamtv/mangalam/playlist.m3u8"
},
{
  name: "Pon TV",
  nameTa: "பொன் டிவி",
  category: "Entertainment",
  logo: "https://logowik.com/content/uploads/images/pon3008.logowik.com.webp",
  url: "http://pontv.phoenixcreations.online:1935/pontv/pon/playlist.m3u8"
},
{
  name: "Prince TV",
  nameTa: "பிரின்ஸ் டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/SrJsp7zhnpCoWvsFru2y8kLRXerhlSf50JRlQQI0EOnn3JeqY1tql-fs26XiRwp4oE1q1ltcoWlcUztIj6AB",
  url: "http://princetv.phoenixcreations.online/princetv/prince/playlist.m3u8"
},
{
  name: "Sri TV",
  nameTa: "ஸ்ரீ டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/WVVmROs0-HduRDHoPjdyF-o4BWIHE5cVK8KC2uHzBeCskktLCZ9npcRLv9__UebaAhXrdY21xURmyrzyGJ4Ayg",
  url: "http://sritv.phoenixcreations.online/sritv/sri/playlist.m3u8"
},
{
  name: "Sri Vinayaga TV",
  nameTa: "ஸ்ரீ விநாயகா டிவி",
  category: "Entertainment",
  logo: "https://play-lh.googleusercontent.com/K3FG0oNaHjuIKp7JmICi8LAQGxMFS9GJjObkH_fLiKCb5q1pLK9qN6Sz7RSxbMtaevutJEb5pEgVlBF9XZ1u=w240-h480-rw",
  url: "http://112.133.198.71:1935/srivinayagatv/live/chunklist_w1918043709.m3u8"
},

  { name: 'Makkal TV Tamil HD', nameTa: 'மக்கள் டிவி தமிழ் HD', category: 'General', logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/eba6b320877779.562f2a1f9eca3.png', url: 'https://5k8q87azdy4v-hls-live.wmncdn.net/MAKKAL/271ddf829afeece44d8732757fba1a66.sdp/playlist.m3u8' },
  { name: 'Puthuyugam TV Tamil HD', nameTa: 'புதுயுகம் டிவி தமிழ் HD', category: 'General', logo: 'https://www.medianews4u.com/wp-content/uploads/2016/09/Puduyugam-New-Logo-BG-2.jpg', url: 'https://mumt04.tangotv.in/m18aqlK4PUTHUYUGAMTV/index.m3u8' },
  { name: 'Vasanth TV Tamil HD', nameTa: 'வசந்த் டிவி தமிழ் HD', category: 'General', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKzzhZ96CbEgw0TfkHrL-GfaumNrhYaayBBlwgdT66AQbIPBkmrPJpWI&s=10', url: 'https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8' },
  { name: 'Thanthi One Entertainment Tamil', nameTa: 'தந்தி ஒன் தமிழ்', category: 'Entertainment', logo: 'https://dreamdth.com/wp-content/uploads/2024/05/New-Tamil-GEC-Thanthi-One-has-been-launched.jpg', url: 'https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8' },
  { name: 'Vendhar TV Tamil Live', nameTa: 'வேந்தர் டிவி தமிழ்', category: 'Entertainment', logo: 'https://www.vendharmedia.in/images/vendhartv.png', url: 'https://cdn-3.pishow.tv/live/1271/master.m3u8' },
  { name: 'TamilVision TV (TVI Canada)', nameTa: 'தமிழ்விஷன் டிவி', category: 'General', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFRMWEZqlZtJN_YrIinRMNHbJeSaXW3Yatw5FsWsueFA&s=10', url: 'https://live.cmr24.fm/TVI/HD/chunks.m3u8' },
  { name: 'Aadhavan TV Tamil', nameTa: 'பிரியோ டிவி தமிழ்', category: 'Entertainment', logo: 'https://d229kpbsb5jevy.cloudfront.net/tv/480/270/languages/Athavan_TV.jpg', url: 'http://aadhavantamiltv.phoenixcreations.online/aadhavantamiltv/aadhavantamiltv/tracks-v1a1/mono.m3u8' },
  { name: 'EET TV Tamil Live', nameTa: 'ஈஇடி டிவி தமிழ்', category: 'Entertainment', logo: 'https://bx-tv.com/wp-content/uploads/2021/10/EETV.jpg', url: 'https://live.streamjo.com/eetlive/eettv.m3u8' },
  { name: 'Marutam TV Tamil Entertainment', nameTa: 'மருதம் டிவி தமிழ்', category: 'Entertainment', logo: 'https://images.jdmagicbox.com/comp/dharmapuri/m5/9999p4342.4342.180430181533.r6m5/catalogue/mn-tv-dharmapuri-railway-station-dharmapuri-advertising-agencies-for-electronic-media-uavmdlq5sa.jpg', url: 'https://cdn-3.pishow.tv/live/1253/master.m3u8' },
  { name: 'MNTV Tamil HD', nameTa: 'எம்என்டிவி தமிழ் HD', category: 'Entertainment', logo: 'https://images.jdmagicbox.com/comp/dharmapuri/m5/9999p4342.4342.180430181533.r6m5/catalogue/mn-tv-dharmapuri-railway-station-dharmapuri-advertising-agencies-for-electronic-media-uavmdlq5sa.jpg', url: 'https://mntv.livebox.co.in/mntvhls/live.m3u8' },
  { name: 'Oli TV Tamil HD', nameTa: 'ஒலி டிவி தமிழ் HD', category: 'Entertainment', logo: 'https://www.nagantv.com/upload/files/oli%20tv.png', url: 'https://live.olidigital.in/olitv/olitv/index.m3u8' },
  { name: 'Roja TV Tamil Entertainment', nameTa: 'ரோஜா டிவி தமிழ்', category: 'Entertainment', logo: 'https://play-lh.googleusercontent.com/g8S40HP56a1Rb9HsC-EoXx6JyNY40P_P0W0Tg2od1L5us1umoM_5KVOePkQP8oVBmgaRGrzuO2tcCE-WTBkP', url: 'https://stream.rojatv.cloud/rojatv/rojatv/index.m3u8' },
  { name: 'Sana TV Tamil Entertainment', nameTa: 'சனா டிவி தமிழ்', category: 'Entertainment', logo: 'https://play-lh.googleusercontent.com/wnCJs7cDJeDymSfEVqaRunB_1hqjK4iXteTG4lMTBG54ddV9flZcOzFOreDC4oklwOwH8mUVUsLHpvcQgE1dtG8', url: 'https://vglivessai.akamaized.net/us/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b6d9e864-ec16-410a-804d-ccf8f720bfaa/index.m3u8' },
  { name: 'Subin TV Tamil Entertainment', nameTa: 'சுபின் டிவி தமிழ்', category: 'Entertainment', logo: 'https://i.ytimg.com/vi/pFF_5IqdnuM/sddefault.jpg?v=63ccab0e', url: 'https://stream.galaxyott.live/live/subintv/index.m3u8' },
  { name: 'Suriya TV Tamil Live', nameTa: 'சூர்யா டிவி தமிழ்', category: 'Entertainment', logo: 'https://jiotvimages.cdn.jio.com/dare_images/shows/epgdata/ccae277d759dcce110fa0333737ea310.jpg?width=700', url: 'https://stream.ottlive.co.in/suryatvtamil/index.m3u8' },
  
  // --- KIDS ---
  { name: 'Chithiram TV Kids Tamil', nameTa: 'சித்திரம் டிவி கிட்ஸ் தமிழ்', category: 'Kids', logo: 'https://apiexcellent.com/storage/images/medias/television/product/kalaignar-chithiram-television10245.webp', url: 'https://cdn-6.pishow.tv/live/1243/master.m3u8' },

  // --- DEVOTIONAL & RELIGIOUS ---
  { name: 'SVBC 2 Tamil Devotional HD', nameTa: 'எஸ்விபிசி 2 தமிழ் HD', category: 'Religious', logo: 'https://play-lh.googleusercontent.com/E3tMIRvRTWU5vARVXbSHt2N6d_FK982YfFOPKUN-hXCTkGBPT-chzBD24YZXadnr7q1K9M8wYpauMSYPc4RIyJU=w526-h296-rw', url: 'https://player.mslivestream.net/tamil/ac206e74d75b285755ee4924df87d951.sdp/playlist.m3u8' },
  { name: 'Aaseervatham TV Devotional', nameTa: 'ஆசீர்வாதம் டிவி', category: 'Religious', logo: 'https://assets.airtel.in/static-assets/cms/dth/images/channellogo-new/aaseervatham%20tv.jpg', url: 'https://mumt04.tangotv.in/m18aqlK4AASEERVATHAMTV/index.m3u8' },
  { name: 'Aastha Tamil Devotional', nameTa: 'ஆஸ்தா தமிழ் பக்தி', category: 'Religious', logo: 'https://d229kpbsb5jevy.cloudfront.net/st-ak/yupptv/og_image/Aastha_TV.jpg', url: 'https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8' },
  { name: 'Angel TV India Devotional', nameTa: 'ஏஞ்சல் டிவி இந்தியா', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9G3nnUuzpDnm7D_NrJuS4sCrLyEe0BgJ58lxjcobIwg2yTTeatfZXcBG&s=10', url: 'https://janya-digimix.akamaized.net/vglive-sk-394914/india/ngrp:angelindia_all/playlist.m3u8' },
  { name: 'Dharshan TV Devotional', nameTa: 'தர்ஷன் டிவி பக்தி', category: 'Religious', logo: 'https://play-lh.googleusercontent.com/dg8uDdnnT7hCctCrlTWqGtvK7ajELJp7bRi0F2ZpQ3d4Rjy9zs1ELgBpo_b4ep-LsPtYevm-EqyZG-AZDanRoA', url: 'https://cable91tataplay.akamaized.net/live/dharshantv/index.m3u8' },
  { name: 'IBC Bakthi Tamil Devotional', nameTa: 'ஐபிசி பக்தி தமிழ்', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1jFpgmIpvhndwr6C-8f0qFzIXtu9FdY0Bs9tBqlJiSktcU7cmpxzKtIjD&s=10', url: 'https://ibc.massstream.net/IBC2/index.m3u8' },
  { name: 'Joy TV Tamil Live', nameTa: 'ஜாய் டிவி தமிழ்', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFFIPMn3vjBzy9EK-mSAV9CP36JLwyst6-TpAcp1w0g&s', url: 'https://ktismaservers.in:3412/live/joytvlive.m3u8' },
  { name: 'Life TV Tamil Devotional', nameTa: 'லைஃப் டிவி தமிழ்', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2oE-j16t_J-Y8Ckae1YJGkuzXsxLHWFj4X3wSaBzdY83pPb1VW-7oStU&s=10', url: 'https://lifetv.livebox.co.in/lifetvhls/lifetv.m3u8' },
  { name: 'Sankara Devotional TV Tamil', nameTa: 'சங்கரா பக்தி டிவி தமிழ்', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ66F7xVLkydEKrjV4WwAFOIWz8TZdMj-7cN7Lh_zbWynfIAQg6WBWS40c&s=10', url: 'https://cdn-3.pishow.tv/live/1135/master.m3u8' },
  { name: 'Sivan TV Devotional Tamil', nameTa: 'சிவன் டிவி பக்தி தமிழ்', category: 'Religious', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbej3DMCy2WfTWZe2VcMZPCTHXLCdyiKGuc9suKYBK&s=10', url: 'http://sivantv.livebox.co.in/sivantvhls/sivan.m3u8' },
  { name: 'Village TV Devotional Tamil', nameTa: 'வில்லேஜ் டிவி தமிழ்', category: 'Religious', logo: 'https://nagantv.com/upload/files/Sruthi%20TV.png', url: 'https://villagetv.applelive.in/villagetv/villagetv/index.m3u8' }
];
