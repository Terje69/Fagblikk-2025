
/**
 * Fagblikk – Music Tile with 2‑track playlist (iOS/Safari‑friendly)
 * -----------------------------------------------------------------
 * What’s new:
 * - Supports TWO songs and alternates between them automatically.
 * - "Bytt sang" button to switch manually.
 * - iOS-ready: waits for user tap to start with sound.
 *
 * Setup:
 * 1) Put these files in your repo next to index.html:
 *    - this file: music-player.playlist.js  (and reference it in index.html)
 *    - audio/servitrisen-pa-den-engel.mp3
 *    - audio/kontignentets-savn.mp3
 * 2) Ensure there is a <div id="tiles"></div> in the main menu (as added earlier).
 */

(function () {
  // -------------------- Playlist --------------------
  const TRACKS = [
    {
      title: 'Servitrisen på Den Engel',
      artist: 'Tripel Creek Ramblers',
      src: './audio/servitrisen-pa-den-engel.mp3',
    },
    {
      title: 'Kontignentets savn',
      artist: 'Dubbel Prairie Band',
      src: './audio/kontignentets-savn.mp3',
    },
  ];

  const TILE_CONTAINER_SELECTOR = '#tiles';
  // --------------------------------------------------

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let audioContext = null;
  let currentIndex = 0;

  function createEl(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'style' && typeof v === 'object') {
        Object.assign(el.style, v);
      } else if (k in el) {
        el[k] = v;
      } else {
        el.setAttribute(k, v);
      }
    });
    (Array.isArray(children) ? children : [children])
      .filter(Boolean)
      .forEach(child => el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child));
    return el;
  }

  function makeTile() {
    const tile = createEl('div', {
      className: 'tile-music',
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '16px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
        color: 'white',
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        maxWidth: '560px',
        width: '100%',
      }
    });

    const header = createEl('div', {
      style: { display: 'flex', alignItems: 'center', gap: '12px' }
    }, [
      createEl('div', {
        style: {
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px'
        }
      }, '🎵'),
      createEl('div', {}, [
        createEl('div', { id: 'mp-title', style: { fontWeight: '700', fontSize: '16px' } }, ''),
        createEl('div', { id: 'mp-artist', style: { opacity: '0.8', fontSize: '13px' } }, ''),
      ])
    ]);

    const barBg = createEl('div', {
      style: {
        width: '100%',
        height: '6px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '999px',
        overflow: 'hidden'
      }
    });
    const barFg = createEl('div', {
      style: {
        width: '33%',
        height: '100%',
        background: 'rgba(255,255,255,0.35)',
        animation: 'tileShimmer 1.8s ease-in-out infinite alternate'
      }
    });
    barBg.appendChild(barFg);

    const controls = createEl('div', {
      style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }
    });

    const playBtn = createEl('button', {
      type: 'button',
      title: 'Play/Pause',
      style: buttonStyle()
    }, 'Play');

    const nextBtn = createEl('button', {
      type: 'button',
      title: 'Bytt sang',
      style: buttonStyle()
    }, 'Bytt sang');

    const muteBtn = createEl('button', {
      type: 'button',
      title: 'Mute/Unmute',
      style: buttonStyle()
    }, 'Mute');

    const status = createEl('span', {
      style: { fontSize: '12px', opacity: '0.8' }
    }, 'Venter på avspilling…');

    controls.append(playBtn, nextBtn, muteBtn, status);

    // Audio element (no native loop; we alternate tracks on 'ended')
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    audio.setAttribute('autoplay', '');
    audio.muted = true;

    // Keyframes for shimmer
    const style = document.createElement('style');
    style.textContent = `@keyframes tileShimmer { from { transform: translateX(-66%);} to { transform: translateX(166%);} }`;
    document.head.appendChild(style);

    tile.append(header, barBg, controls, audio);

    // Populate first track UI
    function updateUI() {
      const t = TRACKS[currentIndex];
      const titleEl = tile.querySelector('#mp-title');
      const artistEl = tile.querySelector('#mp-artist');
      if (titleEl) titleEl.textContent = t.title;
      if (artistEl) artistEl.textContent = t.artist;
      status.textContent = `Klar: ${t.title} – ${t.artist}`;
    }

    async function ensureAudioContext() {
      if (audioContext) return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioContext = new Ctx();
      if (audioContext.state === 'suspended') {
        try { await audioContext.resume(); } catch(e) {}
      }
    }

    async function loadAndPlay(unmute = false) {
      const t = TRACKS[currentIndex];
      audio.src = t.src;
      try {
        await ensureAudioContext();
        if (unmute) audio.muted = false;
        await audio.play();
        playBtn.textContent = 'Pause';
        status.textContent = `Spiller: ${t.title} – ${t.artist}${audio.muted ? ' (dempet)' : ''}`;
      } catch (e) {
        status.textContent = isIOS ? 'iOS krever et trykk – trykk Play' : 'Autoplay blokkert – trykk Play';
      }
    }

    function nextTrack(auto = false) {
      currentIndex = (currentIndex + 1) % TRACKS.length;
      updateUI();
      loadAndPlay(true);
      if (!auto) {
        status.textContent = `Byttet til: ${TRACKS[currentIndex].title} – ${TRACKS[currentIndex].artist}`;
      }
    }

    // Try autoplay on mount (desktop/tablet)
    (async () => {
      updateUI();
      if (isIOS) {
        status.textContent = 'iOS krever et trykk – trykk Play';
        return;
      }
      await loadAndPlay(false);
      setTimeout(() => {
        audio.muted = false;
        status.textContent = `Spiller: ${TRACKS[currentIndex].title} – ${TRACKS[currentIndex].artist}`;
      }, 250);
    })();

    // Controls
    playBtn.addEventListener('click', async () => {
      if (audio.paused) {
        await loadAndPlay(true);
      } else {
        audio.pause();
        playBtn.textContent = 'Play';
        status.textContent = 'Pauset';
      }
    });

    nextBtn.addEventListener('click', () => nextTrack(false));

    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
      if (!audio.paused) {
        const t = TRACKS[currentIndex];
        status.textContent = `Spiller: ${t.title} – ${t.artist}${audio.muted ? ' (dempet)' : ''}`;
      }
    });

    // Alternate automatically when a track ends
    audio.addEventListener('ended', () => {
      nextTrack(true);
    });

    // Resume audio context on first gesture (iOS)
    const gestureResume = async () => {
      await ensureAudioContext();
      document.removeEventListener('touchend', gestureResume);
      document.removeEventListener('click', gestureResume, true);
    };
    document.addEventListener('touchend', gestureResume, { passive: true });
    document.addEventListener('click', gestureResume, true);

    return tile;
  }

  function buttonStyle() {
    return {
      padding: '10px 14px',
      borderRadius: '12px',
      border: '0',
      background: '#374151',
      color: 'white',
      cursor: 'pointer'
    };
  }

  function insertTile(tile) {
    const container = document.querySelector('#tiles');
    if (container) {
      container.appendChild(tile);
    } else {
      document.body.appendChild(tile);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tile = makeTile();
    insertTile(tile);
  });
})();
