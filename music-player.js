
/**
 * Fagblikk – Simple Autoplay & Loop Music Tile (no frameworks)
 * ------------------------------------------------------------
 * How to use:
 * 1) Put your MP3 at: ./audio/servitrisen-pa-den-engel.mp3  (or change MP3_PATH below)
 * 2) Copy this file as: music-player.js  and include it in index.html with: <script src="music-player.js" defer></script>
 * 3) Make sure your index.html has a container for tiles (e.g. <div id="tiles"></div>).
 *    If not found, the tile will be appended to <body>.
 *
 * Notes:
 * - Browsers may block autoplay with sound. This tile tries to autoplay muted first, then unmute.
 *   If blocked, it shows a big Play button that starts playback when clicked.
 */

(function () {
  // -------------------- Configuration --------------------
  const MP3_PATH = './audio/servitrisen-pa-den-engel.mp3';
  const TILE_CONTAINER_SELECTOR = '#tiles'; // change if your tile grid uses a different selector
  const TITLE = 'Servitrisen på Den Engel';
  const ARTIST = 'Tripel Creek Ramblers'; // subtle Belgian beer nod (Tripel) + country vibe
  // -------------------------------------------------------

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

    const audio = createEl('audio', {
      src: MP3_PATH,
      loop: true,
      preload: 'auto',
      playsInline: true
    });

    // Try to autoplay on load
    let userInteracted = false;
    const tryAutoplay = async () => {
      try {
        audio.muted = true;
        await audio.play();
        // small delay then unmute
        setTimeout(() => {
          audio.muted = false;
          status.textContent = `Spiller: ${TITLE} – ${ARTIST}`;
          playBtn.textContent = 'Pause';
          muteBtn.textContent = 'Mute';
        }, 250);
      } catch (e) {
        status.textContent = 'Autoplay blokkert – trykk Play';
      }
    };

    playBtn.addEventListener('click', async () => {
      userInteracted = true;
      if (audio.paused) {
        try {
          audio.muted = false;
          await audio.play();
          playBtn.textContent = 'Pause';
          status.textContent = `Spiller: ${TITLE} – ${ARTIST}`;
        } catch (e) {
          status.textContent = 'Kunne ikke starte avspilling (sjekk filsti)';
        }
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
      // should not fire due to loop, but keep for safety
      playBtn.textContent = 'Play';
      status.textContent = 'Stoppet';
    });

    // Add a light keyframes for shimmer
    const style = document.createElement('style');
    style.textContent = `@keyframes tileShimmer { from { transform: translateX(-66%);} to { transform: translateX(166%);} }`;
    document.head.appendChild(style);

    tile.append(header, barBg, controls, audio);
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
    // Try autoplay after insert
    const audio = tile.querySelector('audio');
    const status = tile.querySelector('span');
    (async () => {
      try {
        audio.muted = true;
        await audio.play();
        setTimeout(() => {
          audio.muted = false;
          const playBtn = tile.querySelector('button');
          const muteBtn = tile.querySelectorAll('button')[1];
          if (playBtn) playBtn.textContent = 'Pause';
          if (muteBtn) muteBtn.textContent = 'Mute';
          if (status) status.textContent = `Spiller: ${TITLE} – ${ARTIST}`;
        }, 250);
      } catch (e) {
        if (status) status.textContent = 'Autoplay blokkert – trykk Play';
      }
    })();
  });
})();
