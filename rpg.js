function startRPG(chapter) {
  const container = document.getElementById("rpgContainer");
  container.innerHTML = '';

  if (chapter === 1) {
    runChapter1(container);
  } else if (chapter === 2) {
    runChapter2(container);
  }
}

function runChapter1(container) {
  const story = [
    {
      text: "Myklus drømmer seg bort en dag han holder en stige. Han kjenner tørsten komme. Heldigvis er det en fersk tank med Moldevann i Hiacen.",
      options: [
        {
          text: "Ta en slurk Moldevann",
          consequence: "Ser opp på stigen og ser at det er DJ Høgz som står der, og ikke Roar.",
          next: 1
        },
        {
          text: "Rister det av seg, kommer seg hjem, jekker seg en Hansa",
          consequence: "Myklus blir sendt til Skumløs-skogen.",
          next: "skumlos"
        },
        {
          text: "Lar stigen stå uholdt og kjører på Polet for å kjøpe inn litt belgisk øl",
          consequence: "Innsér plutselig at det er DJ Høgz som sitter i passasjersetet.",
          next: 1
        }
      ]
    },
    {
      text: "Myklus og DJ Høgz drikker en Struise i Svarttrastvegen, da DJ Høgz plutselig tar en Chihuahua opp av lommen som de klapper og koser med. Da ringer det på døren. De ser spørrende på hverandre, Myklus åpner og det viser seg å være Russe_Chris.",
      options: [
        {
          text: "Drikk opp ølen",
          consequence: "Munnen fylles av god smak, og med ett blir rommet lyst opp av en magisk kraft. Russe_Chris blir bannlyst til Skumløs-skogen for alltid, DJ Høgz gir Myklus Busticus en magisk flybillett til Belgia som belønning for at han reddet hunden.",
          next: 2
        },
        {
          text: "Tilby Russe_Chris en belgisk øl",
          consequence: "Hunden dør i en grotesk seanse, Myklus ender i Skumløs-skogen.",
          next: "skumlos"
        },
        {
          text: "Tilby Russe_Chris en Hansa",
          consequence: "Russe_Chris bannlyses til Skumløs-skogen og er borte for alltid. DJ Høgz gir Myklus en magisk flybillett til Belgia",
          next: 2
        }
      ]
    },
    {
      text: "Myklus sitter på Årø for å benytte seg av den magiske flybilletten, Au Pairen er på jobb og ser ut til å være i godt driv",
      options: [
        {
          text: "Kjøpe 2 0,6 og lage hundelyder",
          consequence: "Myklus går ombord i flyet, sovner, og lander etterhvert i Brussel etter noen Jupiler.",
          next: 3
        },
        {
          text: "Kjøpe Farris og en pakke tyggis",
          consequence: "Sendes til Skumløs-skogen til evig forbannelse. Game over.",
          next: "gameover"
        },
        {
          text: "Kjøper 3 0,6 og en akevitt",
          consequence: "Slipper ikke inn på flyet. I fortvilelsen dukker plutselig GP opp, og kjører Myklus til Belgia i Bentleyen.",
          next: 3
        }
      ]
    },
    {
      text: "Fremme i Belgia møter Myklus den onde Heim E. Vernet og hans hjelper Vegard Beid i Tax Free. Fortsettelse følger...",
      options: []
    }
  ];

  function showStep(stepIndex) {
    const step = story[stepIndex];
    container.innerHTML = `<p>${step.text}</p>`;

    step.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.onclick = () => {
        if (option.next === "skumlos") {
          showSkumlos(stepIndex);
        } else if (option.next === "gameover") {
          showGameOver();
        } else {
          container.innerHTML = `<p>${option.consequence}</p><button onclick="showStep(${option.next})">Neste</button>`;
        }
      };
      container.appendChild(btn);
    });
  }

  function showSkumlos(returnStep) {
    container.innerHTML = `<p>Myklus befinner seg i Skumløs-skogen hvor glassholdet er forferdelig og det kun serveres Hansa. Han må be til St. Bernardus for å komme seg ut.</p>
    <button onclick="showStep(${returnStep})">Be til St. Bernardus</button>`;
  }

  function showGameOver() {
    container.innerHTML = `<p>Myklus' ferd er over. Han ble offer for en svak sjel. Game Over.</p>`;
  }

  showStep(0);
}

function runChapter2(container) {
  const story = [
    {
      text: "Myklus løper inn i baren hvor de selger pølse med surkål og potetgull i et forsøk på å stikke av. Heim E. Vernet sender Vegard Beid etter Myklus Busticus.",
      options: [
        {
          text: "Kaste et tomt halvlitersglass med Hoegaarden mot Vegard Beid",
          consequence: "Treffer midt i planeten til Vegard Beid, han blir sendt inn i Leffe-baren og tar seg en Leffe som han synes er OK men ikke noe å skrive hjem om. Myklus kjøper seg litt tid til å stikke av. Det ender med at Vegard Beid havner bak noen hunder på vei ut og blir stengt inne på flyplassen til evig tid.",
          next: 1
        },
        {
          text: "Styrte et halvlitersglass Hoegaarden, kaste det tomme glasset mot Vegard Beid",
          consequence: "Treffer midt i planeten til Vegard Beid, han blir sendt inn til Den Siste Snille hvor han stortrives og blir sittende og drikke arbeids-Jupiler i all fremtid. Vegard Beid er beseiret.",
          next: 1
        }
      ]
    },
    {
      text: "Myklus får tid til å hente seg inn og møter Au Pairen som tilbyr hjelp.",
      options: [
        {
          text: "Takk for hjelpen, og fortsett reisen",
          consequence: "Myklus er nå klar for nye eventyr i Belgia.",
          next: 2
        }
      ]
    },
    {
      text: "Neste kapittel kommer snart...",
      options: []
    }
  ];

  function showStep(stepIndex) {
    const step = story[stepIndex];
    container.innerHTML = `<p>${step.text}</p>`;

    step.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.onclick = () => {
        container.innerHTML = `<p>${option.consequence}</p>` + (step.options.length > 1 ? `<button onclick="showStep(${option.next})">Neste</button>` : '');
      };
      container.appendChild(btn);
    });

    if (step.options.length === 0) {
      container.innerHTML += `<button onclick="location.reload()">Tilbake til meny</button>`;
    }
  }

  showStep(0);
}
