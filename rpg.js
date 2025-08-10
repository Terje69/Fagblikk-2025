
// rpg.js — Chapters 1, 2, and new Chapter 3. Closure-based handlers, no inline onclick inside the game.

function startRPG(chapter) {
  const container = document.getElementById("rpgContainer");
  const mainMenu = document.getElementById("mainMenu");
  const daily = document.getElementById("dailyContainer");
  const page = document.getElementById("pageContent");

  // Show RPG, hide others
  if (container) container.classList.remove("hidden");
  if (mainMenu) mainMenu.classList.add("hidden");
  if (daily) daily.classList.add("hidden");
  if (page) page.classList.add("hidden");

  container.innerHTML = "";

  if (chapter === 1) {
    runChapter1(container);
  } else if (chapter === 2) {
    runChapter2(container);
  } else if (chapter === 3) {
    runChapter3(container);
  } else {
    container.textContent = "Ukjent kapittel.";
  }
}

// ---------- Kapittel 1 ----------
function runChapter1(container) {
  const story = [
    {
      text: "Myklus drømmer seg bort en dag han holder en stige. Han kjenner tørsten komme. Heldigvis er det en fersk tank med Moldevann i Hiacen.",
      options: [
        { text: "Ta en slurk Moldevann", consequence: "Ser opp på stigen og ser at det er DJ Høgz som står der, og ikke Roar.", next: 1 },
        { text: "Rister det av seg, kommer seg hjem, jekker seg en Hansa", consequence: "Myklus blir sendt til Skumløs-skogen.", next: "skumlos" },
        { text: "Lar stigen stå uholdt og kjører på Polet for å kjøpe inn litt belgisk øl", consequence: "Innsér plutselig at det er DJ Høgz som sitter i passasjersetet.", next: 1 }
      ]
    },
    {
      text: "Myklus og DJ Høgz drikker en Struise i Svarttrastvegen, da DJ Høgz plutselig tar en Chihuahua opp av lommen som de klapper og koser med. Da ringer det på døren. De ser spørrende på hverandre, Myklus åpner og det viser seg å være Russe_Chris.",
      options: [
        { text: "Drikk opp ølen", consequence: "Munnen fylles av god smak, og med ett blir rommet lyst opp av en magisk kraft. Russe_Chris blir bannlyst til Skumløs-skogen for alltid, DJ Høgz gir Myklus Busticus en magisk flybillett til Belgia som belønning for at han reddet hunden.", next: 2 },
        { text: "Tilby Russe_Chris en belgisk øl", consequence: "Hunden dør i en grotesk seanse, Myklus ender i Skumløs-skogen. Når han kommer seg ut ved å be til St. Bernardus, er han tilbake i dette steget.", next: "skumlos_return_2" },
        { text: "Tilby Russe_Chris en Hansa", consequence: "Russe_Chris bannlyses til Skumløs-skogen og er borte for alltid. DJ Høgz gir Myklus en magisk flybillett til Belgia", next: 2 }
      ]
    },
    {
      text: "Myklus sitter på Årø for å benytte seg av den magiske flybilletten, Au Pairen er på jobb og ser ut til å være i godt driv",
      options: [
        { text: "Kjøpe 2 0,6 og lage hundelyder", consequence: "Myklus går ombord i flyet, sovner, og lander etterhvert i Brussel etter noen Jupiler.", next: 3 },
        { text: "Kjøpe Farris og en pakke tyggis", consequence: "Sendes til Skumløs-skogen til evig forbannelse. Game over.", next: "gameover" },
        { text: "Kjøper 3 0,6 og en akevitt", consequence: "Slipper ikke inn på flyet. I fortvilelsen dukker plutselig GP opp, og kjører Myklus til Belgia i Bentleyen.", next: 3 }
      ]
    },
    {
      text: "Fremme i Belgia møter Myklus den onde Heim E. Vernet og hans hjelper Vegard Beid i Tax Free. Fortsettelse følger...",
      options: []
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text}</p>`;

    if (!step.options || step.options.length === 0) {
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
      return;
    }

    step.options.forEach(opt => {
      const b = document.createElement("button");
      b.textContent = opt.text;
      b.onclick = () => handleOption(opt, i);
      container.appendChild(b);
    });
  }

  function handleOption(opt, returnIndex) {
    if (opt.next === "gameover") {
      container.innerHTML = `<p>${opt.consequence}</p>`;
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
      return;
    }
    if (opt.next === "skumlos") {
      showSkumlos(returnIndex);
      return;
    }
    if (opt.next === "skumlos_return_2") {
      showSkumlos(1); // tilbake til steg 2
      return;
    }

    container.innerHTML = `<p>${opt.consequence}</p>`;
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Neste";
    nextBtn.onclick = () => renderStep(opt.next);
    container.appendChild(nextBtn);
  }

  function showSkumlos(returnStep) {
    container.innerHTML = `<p>Myklus befinner seg i Skumløs-skogen hvor glassholdet er forferdelig og det kun serveres Hansa. Han må be til St. Bernardus for å komme seg ut.</p>`;
    const pray = document.createElement("button");
    pray.textContent = "Be til St. Bernardus";
    pray.onclick = () => renderStep(returnStep);
    container.appendChild(pray);
  }

  function returnToChapters() {
    const page = document.getElementById("pageContent");
    if (page) {
      page.classList.remove("hidden");
      page.innerHTML = `
        <h2>World of Fagcraft</h2>
        <div class="tile" onclick="startRPG(1)">Kapittel 1: Myklus Oppvåkning</div>
        <div class="tile" onclick="startRPG(2)">Kapittel 2: Flugten fra Vegard Beid</div>
        <div class="tile" onclick="startRPG(3)">Kapittel 3: Rulles Prøvelse</div>
        <button onclick="showMainMenu()">Tilbake</button>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}

// ---------- Kapittel 2 ----------
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
          consequence: "Treffer midt i planeten til Vegard Beid, han blir sendt inn til Den Siste Snille hvor han stortrives og blir sittende og drikke arbeids-Jupiler i all fremtid. Vegard Beid er beseiret",
          next: 1
        },
        {
          text: "Kaste en vape som ligger på et bord mot Vegard Beid",
          consequence: "Rommet fylles med lys og Paven kommer svevende ned. Vegard Beid bekjempes ved at Paven begynner å skryte til han så mye at han ikke kommer seg unna",
          next: 1
        }
      ]
    },
    {
      text: "Myklus Busticus setter seg på toget i retning Gent. Det er ingen Heim E. Vernet ombord i toget som dundrer gjennom det Kontignentale landskapet. Myklus Busticus setter seg ned på en uteservering og tar seg en iskald Jupiler.",
      options: [
        {
          text: "Bestille litt ost og enda en Jupiler, etterfulgt av en tripel",
          consequence: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han",
          next: 2
        },
        {
          text: "Bestille en Jupiler, litt ost, og se litt på menyen før han bestiller en tripel",
          consequence: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han",
          next: 2
        },
        {
          text: "Bestille en tripel og to Jupiler til å skylle ned. Kjenne litt med føttene på brosteinen",
          consequence: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han",
          next: 2
        }
      ]
    },
    {
      text: "Heim E. Vernet kommer løpende i hans retning. Nå er tiden knapp og mulighetene få. Han dypper osten i litt sennep før han tar den siste slurken av tripelen. Myklus Busticus fikk ikke med seg sitt magiske sverd, Bjænn, gjennom sikkerhetskontrollen, så han kan ikke bekjempe Heim E. Vernet på vanlig vis. Han legger på sprang",
      options: [
        {
          text: "Innom Frituur Frans",
          consequence: "Han ber Frans gi en bukett til Heim E. Vernet og løper videre inn til Sinte-Måsen. Heim E. Vernet kommer seg ikke inn med ekstern bukett, og Myklus Busticus er i trygghet inntil videre. Han bestiller en Rochefort 10 og skal finne en plass å sitte. Innerst i hjørnet sitter en mystisk, kappekledd figur. Det viser seg å være Rulle, som har rullet helt fra Molde. Han sier 'Myklus, jeg har et oppdrag til deg.....'",
          next: 3
        },
        {
          text: "Innom Dulle Griet",
          consequence: "Myklus rekker å ta seg en stor Kwak, men klarer ikke løpe like fort med bare en sko. Heim E. Vernet tar han igjen og sender han til Skumløs-skogen",
          next: "skumlos_return_2"
        },
        {
          text: "Innom Allegro Moderati",
          consequence: "Trond Giske sitter i restauranten og prøver å sjekke opp Heim E. Vernet når han kommer. De utvikler en romanse, og Myklus kommer seg i trygghet hos Sinte-Måsen. Innerst i hjørnet sitter en mystisk, kappekledd figur. Det viser seg å være Rulle, som har rullet helt fra Molde. Han sier 'Myklus, jeg har et oppdrag til deg.....'",
          next: 3
        }
      ]
    },
    {
      text: "Fortsettelse følger i Kapittel 3.",
      options: []
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text}</p>`;

    if (!step.options || step.options.length === 0) {
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
      return;
    }

    step.options.forEach(opt => {
      const b = document.createElement("button");
      b.textContent = opt.text;
      b.onclick = () => handleOption(opt, i);
      container.appendChild(b);
    });
  }

  function handleOption(opt, returnIndex) {
    if (opt.next === "skumlos_return_2") {
      showSkumlos(returnIndex);
      return;
    }
    container.innerHTML = `<p>${opt.consequence}</p>`;
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Neste";
    nextBtn.onclick = () => renderStep(opt.next);
    container.appendChild(nextBtn);
  }

  function showSkumlos(returnStep) {
    container.innerHTML = `<p>Myklus befinner seg i Skumløs-skogen hvor glassholdet er forferdelig og det kun serveres Hansa. Han må be til St. Bernardus for å komme seg ut.</p>`;
    const pray = document.createElement("button");
    pray.textContent = "Be til St. Bernardus";
    pray.onclick = () => renderStep(returnStep);
    container.appendChild(pray);
  }

  function returnToChapters() {
    const page = document.getElementById("pageContent");
    if (page) {
      page.classList.remove("hidden");
      page.innerHTML = `
        <h2>World of Fagcraft</h2>
        <div class="tile" onclick="startRPG(1)">Kapittel 1: Myklus Oppvåkning</div>
        <div class="tile" onclick="startRPG(2)">Kapittel 2: Flugten fra Vegard Beid</div>
        <div class="tile" onclick="startRPG(3)">Kapittel 3: Rulles Prøvelse</div>
        <button onclick="showMainMenu()">Tilbake</button>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}

// ---------- Kapittel 3 (nytt) ----------
function runChapter3(container) {
  const story = [
    // Steg 1
    {
      text: "Rulle nikker til Sinte-Måsen, og kort tid etterpå kommer han med 15 forskjellige øl til Myklus Busticus. \"Dette er den første prøvelsen du må gjennom for å kunne bevise at du er den Utvalgte.\" Myklus ser forundret på han, \"hva mener du med den Utvalgte?\" sier han forfjamset. Det er vanskelig å konsentrere seg om samtalen når det står så mye herligheter på bordet. \"Det er skrevet i profetien at Den Utvalgte vil bekjempe Vegard Beid, banke ned 15 øl og så redde sjelen til Kai Andre, den rettmessige gud, fra evig fortapelse i Skumløs-skogen. Hva sier du, er du klar?\" Mens Rulle fortalte om profetien hadde Myklus drukket alle ølene og var på vei til Jenever-baren for å ha noe å skylle de ned med.",
      options: [
        { text: "Godta Rulles oppdrag", consequence: "De går videre til Frituur Frans for en liten matbit. Rulle tar en bit og reiser seg opp av stolen og blir helbredet av hvor faglig sterk buketten er.", next: 1 },
        { text: "Ikke godta Rulles oppdrag", consequence: "Myklus sendes straks til Skumløs-skogen.", next: "skumlos_return_0" }
      ]
    },
    // Steg 2
    {
      text: "Etter en heftig stor bukett med majones hører de noe voldsomt til bråk. De går rundt hjørnet og ser Heim E. Vernet i full slåsskamp med en mann i kamuflasjeantrekk og bluetooth-headset. Det viser seg å være BSM. Rulle løper tilbake til bilen sin og trykker på noen knapper. Bilen gjøres om til et kamphelikopter. Heim E. Vernet blir bekjempet i en brutal og destruktiv scene. \"Han er i Skumløs-skogen nå, og kommer seg ikke ut derfra på en stund. Jeg må tilbake til Hydro. Det kommer en ubåt inn for bunkring i ettermiddag, og det krever ekstra vakthold\" sa BSM før han praiet en taxi.",
      options: [
        { text: "Dra på Dulle Griet", consequence: "Kjøpe en lagret Orval og litt ost. Drar innom en Nachtwinkel på vei til hotellrommet. I morgen skal de legge en plan for hvordan redde Kai Andre.", next: 2 },
        { text: "Dra tilbake til Sinte-Måsen", consequence: "Broren er på plass bak spakene. Det viser seg at det har vært en Byvandring i byen, så de er tomme for øl. Han går innom en Nachtwinkel på vei hjem og kjøper en penisformet flaskeåpner. I morgen skal de legge en plan for hvordan redde Kai Andre.", next: 2 }
      ]
    },
    // Steg 3
    {
      text: "Myklus våkner på hotellrommet sitt av at det banker på døren. Han retter på bokseren og labber mot døra. \"Hei Rulle!\" sier han bestemt.\n\nPå andre siden av døren er det ikke Rulle som står, men to andre kjenninger\n\nHan Tyrkeren som Ligner på Mace og Glatte-Kaspar",
      options: []
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text}</p>`;

    if (!step.options || step.options.length === 0) {
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
      return;
    }

    step.options.forEach(opt => {
      const b = document.createElement("button");
      b.textContent = opt.text;
      b.onclick = () => handleOption(opt, i);
      container.appendChild(b);
    });
  }

  function handleOption(opt, returnIndex) {
    if (opt.next === "skumlos_return_0") {
      showSkumlos(0);
      return;
    }
    container.innerHTML = `<p>${opt.consequence}</p>`;
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Neste";
    nextBtn.onclick = () => renderStep(opt.next);
    container.appendChild(nextBtn);
  }

  function showSkumlos(returnStep) {
    container.innerHTML = `<p>Myklus befinner seg i Skumløs-skogen hvor glassholdet er forferdelig og det kun serveres Hansa. Han må be til St. Bernardus for å komme seg ut.</p>`;
    const pray = document.createElement("button");
    pray.textContent = "Be til St. Bernardus";
    pray.onclick = () => renderStep(returnStep);
    container.appendChild(pray);
  }

  function returnToChapters() {
    const page = document.getElementById("pageContent");
    if (page) {
      page.classList.remove("hidden");
      page.innerHTML = `
        <h2>World of Fagcraft</h2>
        <div class="tile" onclick="startRPG(1)">Kapittel 1: Myklus Oppvåkning</div>
        <div class="tile" onclick="startRPG(2)">Kapittel 2: Flugten fra Vegard Beid</div>
        <div class="tile" onclick="startRPG(3)">Kapittel 3: Rulles Prøvelse</div>
        <button onclick="showMainMenu()">Tilbake</button>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}
