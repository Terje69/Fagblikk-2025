
/**
 * Fagblikk – Music Tile with multi‑track playlist (10 tracks, iOS/Safari‑friendly)
 * -------------------------------------------------------------------------------
 * Added: "Au Pairen", "Slaapmutske på Tapp", "Fagfolkene samles".
 * Place MP3s in ./audio/ with filenames as listed.
 */
(function () {
  const TRACKS = [
    { title: 'Servitrisen på Den Engel', artist: 'Tripel Creek Ramblers',   src: './audio/servitrisen-pa-den-engel.mp3' },
    { title: 'Kontignentets savn',       artist: 'Dubbel Prairie Band',    src: './audio/kontignentets-savn.mp3' },
    { title: 'Fersk Bolleke i Sola',     artist: 'Schelde Sunrunners',     src: './audio/fersk-bolleke-i-sola.mp3' },
    { title: 'Lastebilsjåførens Bønn',   artist: 'Jupiler Road Choir',     src: './audio/lastebilsjaforens-bonn.mp3' },
    { title: 'Lyset over Kontignentet',  artist: 'Avondlicht Union',       src: './audio/lyset-over-kontignentet.mp3' },
    { title: 'Mykle',                     artist: 'Malt Yard Poets',        src: './audio/mykle.mp3' },
    { title: 'Struise',                   artist: 'Gueuze Rail Company',    src: './audio/struise.mp3' },
    { title: 'Au Pairen',                 artist: 'Anvers Night Staff',     src: './audio/au-pairen.mp3' },
    { title: 'Slaapmutske på Tapp',      artist: 'Mutske Midnight Chorus', src: './audio/slaapmutske-pa-tapp.mp3' },
    { title: 'Fagfolkene samles',        artist: 'Tripel Square Collective', src: './audio/fagfolkene-samles.mp3' },
  ];

  const TILE_CONTAINER_SELECTOR = '#tiles';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let audioContext = null;
  let currentIndex = 0;

  function createEl(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k in el) el[k] = v;
      else el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).filter(Boolean)
      .forEach(child => el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child));
    return el;
  }
  const btn = () => ({ padding:'10px 14px', borderRadius:'12px', border:'0', background:'#374151', color:'#fff', cursor:'pointer' });

  function makeTile() {
    const tile = createEl('div', { style:{ display:'flex', flexDirection:'column', gap:'10px', padding:'16px', borderRadius:'16px', background:'linear-gradient(135deg,#0f172a,#1f2937)', color:'#fff', boxShadow:'0 6px 24px rgba(0,0,0,.25)', maxWidth:'560px', width:'100%'} });
    const header = createEl('div', { style:{ display:'flex', alignItems:'center', gap:'12px' } }, [
      createEl('div', { style:{ width:'56px', height:'56px', borderRadius:'12px', background:'#111827', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' } }, '🎵'),
      createEl('div', {}, [
        createEl('div', { id:'mp-title', style:{ fontWeight:'700', fontSize:'16px' } }, ''),
        createEl('div', { id:'mp-artist', style:{ opacity:.8, fontSize:'13px' } }, ''),
      ])
    ]);
    const barBg = createEl('div', { style:{ width:'100%', height:'6px', background:'rgba(255,255,255,.08)', borderRadius:'999px', overflow:'hidden' } });
    const barFg = createEl('div', { style:{ width:'33%', height:'100%', background:'rgba(255,255,255,.35)', animation:'tileShimmer 1.8s ease-in-out infinite alternate' } });
    barBg.appendChild(barFg);

    const controls = createEl('div', { style:{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' } });
    const playBtn = createEl('button', { style:btn(), title:'Play/Pause' }, 'Play');
    const nextBtn = createEl('button', { style:btn(), title:'Neste' }, 'Neste');
    const muteBtn = createEl('button', { style:btn(), title:'Mute/Unmute' }, 'Mute');
    const status  = createEl('span', { style:{ fontSize:'12px', opacity:.8 } }, 'Venter på avspilling…');
    controls.append(playBtn, nextBtn, muteBtn, status);

    const audio = document.createElement('audio');
    audio.preload = 'auto'; audio.setAttribute('playsinline',''); audio.setAttribute('autoplay',''); audio.muted = true;

    const style = document.createElement('style'); style.textContent='@keyframes tileShimmer{from{transform:translateX(-66%)}to{transform:translateX(166%)}}'; document.head.appendChild(style);
    tile.append(header, barBg, controls, audio);

    function updateUI() {
      const t = TRACKS[currentIndex];
      tile.querySelector('#mp-title').textContent = t.title;
      tile.querySelector('#mp-artist').textContent = t.artist;
      status.textContent = `Klar: ${t.title} – ${t.artist} (${currentIndex+1}/${TRACKS.length})`;
    }
    async function ensureAudioContext() {
      if (audioContext) return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioContext = new Ctx();
      if (audioContext.state === 'suspended') { try { await audioContext.resume(); } catch(e){} }
    }
    async function loadAndPlay(unmute=false) {
      const t = TRACKS[currentIndex];
      audio.src = t.src;
      try {
        await ensureAudioContext();
        if (unmute) audio.muted = false;
        await audio.play();
        playBtn.textContent = 'Pause';
        status.textContent = `Spiller: ${t.title} – ${t.artist}${audio.muted ? ' (dempet)' : ''} (${currentIndex+1}/${TRACKS.length})`;
      } catch(e) {
        status.textContent = isIOS ? 'iOS krever et trykk – trykk Play' : 'Autoplay blokkert – trykk Play';
      }
    }
    function nextTrack(auto=false) {
      currentIndex = (currentIndex + 1) % TRACKS.length;
      updateUI();
      loadAndPlay(true);
      if (!auto) status.textContent = `Byttet til: ${TRACKS[currentIndex].title} – ${TRACKS[currentIndex].artist} (${currentIndex+1}/${TRACKS.length})`;
    }

    (async () => {
      updateUI();
      if (isIOS) { status.textContent = 'iOS krever et trykk – trykk Play'; return; }
      await loadAndPlay(false);
      setTimeout(() => { audio.muted = false; const t = TRACKS[currentIndex]; status.textContent = `Spiller: ${t.title} – ${t.artist} (${currentIndex+1}/${TRACKS.length})`; }, 250);
    })();

    playBtn.addEventListener('click', async () => {
      if (audio.paused) await loadAndPlay(true);
      else { audio.pause(); playBtn.textContent='Play'; status.textContent='Pauset'; }
    });
    nextBtn.addEventListener('click', () => nextTrack(false));
    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted; muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
      if (!audio.paused) { const t = TRACKS[currentIndex]; status.textContent = `Spiller: ${t.title} – ${t.artist}${audio.muted?' (dempet)':''} (${currentIndex+1}/${TRACKS.length})`; }
    });
    audio.addEventListener('ended', () => nextTrack(true));

    const gestureResume = async () => { await ensureAudioContext(); document.removeEventListener('touchend', gestureResume); document.removeEventListener('click', gestureResume, true); };
    document.addEventListener('touchend', gestureResume, { passive:true });
    document.addEventListener('click', gestureResume, true);

    return tile;
  }

  function insertTile(tile) {
    const container = document.querySelector(TILE_CONTAINER_SELECTOR);
    if (container) container.appendChild(tile);
    else document.body.appendChild(tile);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tile = makeTile();
    insertTile(tile);
  });
})();
