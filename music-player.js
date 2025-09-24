
/**
 * Fagblikk – Simple Autoplay & Loop Music Tile (iOS/Safari-friendly)
 * ------------------------------------------------------------------
 * Changes vs original:
 * - Adds robust iOS handling: waits for a user gesture to unmute & start audio.
 * - Ensures playsinline + autoplay attributes are set.
 * - Uses (webkit)AudioContext resume on first tap to satisfy Safari policies.
 * - Avoids auto-unmute without gesture on iOS.
 */

(function () {
  // -------------------- Configuration --------------------
  const MP3_PATH = './audio/servitrisen-pa-den-engel.mp3';
  const TILE_CONTAINER_SELECTOR = '#tiles';
  const TITLE = 'Servitrisen på Den Engel';
  const ARTIST = 'Tripel Creek Ramblers';
  // -------------------------------------------------------

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let audioContext = null;

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
        createEl('div', { style: { fontWeight: '700', fontSize: '16px' } }, TITLE),
        createEl('div', { style: { opacity: '0.8', fontSize: '13px' } }, ARTIST),
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
      style: { display: 'flex', alignItems: 'center', gap: '10px' }
    });

    const playBtn = createEl('button', {
      type: 'button',
      title: 'Play/Pause',
      style: {
        padding: '10px 14px',
        borderRadius: '12px',
        border: '0',
        background: '#374151',
        color: 'white',
        cursor: 'pointer'
      }
    }, 'Play');

    const muteBtn = createEl('button', {
      type: 'button',
      title: 'Mute/Unmute',
      style: {
        padding: '10px 14px',
        borderRadius: '12px',
        border: '0',
        background: '#374151',
        color: 'white',
        cursor: 'pointer'
      }
    }, 'Mute');

    const status = createEl('span', {
      style: { fontSize: '12px', opacity: '0.8' }
    }, 'Venter på avspilling…');

    controls.append(playBtn, muteBtn, status);

    // Create audio element with attributes Safari cares about
    const audio = document.createElement('audio');
    audio.src = MP3_PATH;
    audio.loop = true;
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    audio.setAttribute('autoplay', ''); // will still be blocked with sound, but fine.
    audio.muted = true; // start muted to allow some browsers to begin playback

    // iOS/Safari: prepare/resume AudioContext on first user tap
    async function ensureAudioContext() {
      if (audioContext) return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return; // old browsers
      audioContext = new Ctx();
      if (audioContext.state === 'suspended') {
        try { await audioContext.resume(); } catch(e) {}
      }
    }

    async function startPlayback(unmute = false) {
      try {
        await ensureAudioContext();
        if (unmute) audio.muted = false;
        await audio.play();
        playBtn.textContent = 'Pause';
        status.textContent = `Spiller: ${TITLE} – ${ARTIST}${audio.muted ? ' (dempet)' : ''}`;
      } catch (e) {
        status.textContent = 'Autoplay blokkert – trykk Play';
      }
    }

    // Try autoplay on mount for non‑iOS
    const tryAutoplay = async () => {
      if (isIOS) {
        status.textContent = 'iOS krever et trykk – trykk Play';
        return;
      }
      await startPlayback(false);
      // Small delay then unmute (non‑iOS only)
      setTimeout(() => {
        audio.muted = false;
        status.textContent = `Spiller: ${TITLE} – ${ARTIST}`;
      }, 250);
    };

    playBtn.addEventListener('click', async () => {
      // On first click for iOS, we unmute & start
      if (audio.paused) {
        await startPlayback(true);
      } else {
        audio.pause();
        playBtn.textContent = 'Play';
        status.textContent = 'Pauset';
      }
    });

    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
      if (!audio.paused) {
        status.textContent = `Spiller: ${TITLE} – ${ARTIST}${audio.muted ? ' (dempet)' : ''}`;
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.textContent = 'Play';
      status.textContent = 'Stoppet';
    });

    // Extra: also listen for a generic tap to resume context on iOS
    const gestureResume = async () => {
      await ensureAudioContext();
      document.removeEventListener('touchend', gestureResume);
      document.removeEventListener('click', gestureResume, true);
    };
    document.addEventListener('touchend', gestureResume, { passive: true });
    document.addEventListener('click', gestureResume, true);

    // Add keyframes for shimmer
    const style = document.createElement('style');
    style.textContent = `@keyframes tileShimmer { from { transform: translateX(-66%);} to { transform: translateX(166%);} }`;
    document.head.appendChild(style);

    tile.append(header, barBg, controls, audio);

    // Kick off autoplay attempt (will no-op on iOS)
    tryAutoplay();

    return tile;
  }

  function insertTile(tile) {
    const container = document.querySelector(TILE_CONTAINER_SELECTOR);
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
