// rpg.js — Kapittel 1–4 (restaurert) + Kapittel 5 (ordrett), med rene valg-etiketter uten parentes.

function startRPG(chapter) {
  const container = document.getElementById("rpgContainer");
  const mainMenu = document.getElementById("mainMenu");
  const daily = document.getElementById("dailyContainer");
  const page = document.getElementById("pageContent");

  // Vis RPG, skjul andre
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
  } else if (chapter === 4) {
    runChapter4(container);
  } else if (chapter === 5) {
    runChapter5(container);
  } else {
    container.textContent = "Ukjent kapittel.";
  }
}

// ---------- Kapittel 1 ----------
function runChapter1(container) {
  const story = [
    {
      text: `Myklus drømmer seg bort en dag han holder en stige. Han kjenner tørsten komme. Heldigvis er det en fersk tank med Moldevann i Hiacen.`,
      options: [
        { text: "Ta en slurk Moldevann", consequence: "Ser opp på stigen og ser at det er DJ Høgz som står der, og ikke Roar.", next: 1 },
        { text: "Rister det av seg, kommer seg hjem, jekker seg en Hansa", consequence: "Myklus blir sendt til Skumløs-skogen.", next: "skumlos" },
        { text: "Lar stigen stå uholdt og kjører på Polet for å kjøpe inn litt belgisk øl", consequence: "Innsér plutselig at det er DJ Høgz som sitter i passasjersetet.", next: 1 }
      ]
    },
    {
      text: `Myklus og DJ Høgz drikker en Struise i Svarttrastvegen, da DJ Høgz plutselig tar en Chihuahua opp av lommen som de klapper og koser med. Da ringer det på døren. De ser spørrende på hverandre, Myklus åpner og det viser seg å være Russe_Chris.`,
      options: [
        { text: "Drikk opp ølen", consequence: "Munnen fylles av god smak, og med ett blir rommet lyst opp av en magisk kraft. Russe_Chris blir bannlyst til Skumløs-skogen for alltid, DJ Høgz gir Myklus Busticus en magisk flybillett til Belgia som belønning for at han reddet hunden.", next: 2 },
        { text: "Tilby Russe_Chris en belgisk øl", consequence: "Hunden dør i en grotesk seanse, Myklus ender i Skumløs-skogen. Når han kommer seg ut ved å be til St. Bernardus, er han tilbake i dette steget.", next: "skumlos_return_2" },
        { text: "Tilby Russe_Chris en Hansa", consequence: "Russe_Chris bannlyses til Skumløs-skogen og er borte for alltid. DJ Høgz gir Myklus en magisk flybillett til Belgia", next: 2 }
      ]
    },
    {
      text: `Myklus sitter på Årø for å benytte seg av den magiske flybilletten, Au Pairen er på jobb og ser ut til å være i godt driv`,
      options: [
        { text: "Kjøpe 2 0,6 og lage hundelyder", consequence: "Myklus går ombord i flyet, sovner, og lander etterhvert i Brussel etter noen Jupiler.", next: 3 },
        { text: "Kjøpe Farris og en pakke tyggis", consequence: "Sendes til Skumløs-skogen til evig forbannelse. Game over.", next: "gameover" },
        { text: "Kjøper 3 0,6 og en akevitt", consequence: "Slipper ikke inn på flyet. I fortvilelsen dukker plutselig GP opp, og kjører Myklus til Belgia i Bentleyen.", next: 3 }
      ]
    },
    {
      text: `Fremme i Belgia møter Myklus den onde Heim E. Vernet og hans hjelper Vegard Beid i Tax Free. Fortsettelse følger...`,
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
        <div class="tile" onclick="startRPG(4)">Kapittel 4: Bams Hrur</div>
        <div class="tile" onclick="startRPG(5)">Kapittel 5: Skumløs-skogen & KFC</div>
        <div class="backbar"><button class="btn" onclick="showMainMenu()">Tilbake</button></div>
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
      text: `Myklus løper inn i baren hvor de selger pølse med surkål og potetgull i et forsøk på å stikke av. Heim E. Vernet sender Vegard Beid etter Myklus Busticus.`,
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
      text: `Myklus Busticus setter seg på toget i retning Gent. Det er ingen Heim E. Vernet ombord i toget som dundrer gjennom det Kontignentale landskapet. Myklus Busticus setter seg ned på en uteservering og tar seg en iskald Jupiler.`,
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
      text: `Heim E. Vernet kommer løpende i hans retning. Nå er tiden knapp og mulighetene få. Han dypper osten i litt sennep før han tar den siste slurken av tripelen. Myklus Busticus fikk ikke med seg sitt magiske sverd, Bjænn, gjennom sikkerhetskontrollen, så han kan ikke bekjempe Heim E. Vernet på vanlig vis. Han legger på sprang`,
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
      text: `Fortsettelse følger i Kapittel 3.`,
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
        <div class="tile" onclick="startRPG(4)">Kapittel 4: Bams Hrur</div>
        <div class="tile" onclick="startRPG(5)">Kapittel 5: Skumløs-skogen & KFC</div>
        <div class="backbar"><button class="btn" onclick="showMainMenu()">Tilbake</button></div>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}

// ---------- Kapittel 3 ----------
function runChapter3(container) {
  const story = [
    // Steg 1
    {
      text: `Rulle nikker til Sinte-Måsen, og kort tid etterpå kommer han med 15 forskjellige øl til Myklus Busticus. "Dette er den første prøvelsen du må gjennom for å kunne bevise at du er den Utvalgte." Myklus ser forundret på han, "hva mener du med den Utvalgte?" sier han forfjamset. Det er vanskelig å konsentrere seg om samtalen når det står så mye herligheter på bordet. "Det er skrevet i profetien at Den Utvalgte vil bekjempe Vegard Beid, banke ned 15 øl og så redde sjelen til Kai Andre, den rettmessige gud, fra evig fortapelse i Skumløs-skogen. Hva sier du, er du klar?" Mens Rulle fortalte om profetien hadde Myklus drukket alle ølene og var på vei til Jenever-baren for å ha noe å skylle de ned med.`,
      options: [
        { text: "Godta Rulles oppdrag", consequence: "De går videre til Frituur Frans for en liten matbit. Rulle tar en bit og reiser seg opp av stolen og blir helbredet av hvor faglig sterk buketten er.", next: 1 },
        { text: "Ikke godta Rulles oppdrag", consequence: "Myklus sendes straks til Skumløs-skogen.", next: "skumlos_return_0" }
      ]
    },
    // Steg 2
    {
      text: `Etter en heftig stor bukett med majones hører de noe voldsomt til bråk. De går rundt hjørnet og ser Heim E. Vernet i full slåsskamp med en mann i kamuflasjeantrekk og bluetooth-headset. Det viser seg å være BSM. Rulle løper tilbake til bilen sin og trykker på noen knapper. Bilen gjøres om til et kamphelikopter. Heim E. Vernet blir bekjempet i en brutal og destruktiv scene. "Han er i Skumløs-skogen nå, og kommer seg ikke ut derfra på en stund. Jeg må tilbake til Hydro. Det kommer en ubåt inn for bunkring i ettermiddag, og det krever ekstra vakthold" sa BSM før han praiet en taxi.`,
      options: [
        { text: "Dra på Dulle Griet", consequence: "Kjøpe en lagret Orval og litt ost. Drar innom en Nachtwinkel på vei til hotellrommet. I morgen skal de legge en plan for hvordan redde Kai Andre", next: 2 },
        { text: "Dra tilbake til Sinte-Måsen", consequence: "Broren er på plass bak spakene. Det viser seg at det har vært en Byvandring i byen, så de er tomme for øl. Han går innom en Nachtwinkel på vei hjem og kjøper en penisformet flaskeåpner. I morgen skal de legge en plan for hvordan redde Kai Andre", next: 2 }
      ]
    },
    // Steg 3
    {
      text: `Myklus våkner på hotellrommet sitt av at det banker på døren. Han retter på bokseren og labber mot døra. "Hei Rulle!" sier han bestemt.

På andre siden av døren er det ikke Rulle som står, men to andre kjenninger

Han Tyrkeren som Ligner på Mace og Glatte-Kaspar`,
      options: []
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text.replace(/\n/g,"<br>")}</p>`;

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
        <div class="tile" onclick="startRPG(4)">Kapittel 4: Bams Hrur</div>
        <div class="tile" onclick="startRPG(5)">Kapittel 5: Skumløs-skogen & KFC</div>
        <div class="backbar"><button class="btn" onclick="showMainMenu()">Tilbake</button></div>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}

// ---------- Kapittel 4 (NYTT: Bams Hrur) ----------
function runChapter4(container) {
  const story = [
    // Steg 1
    {
      text: `Tyrkeren Som Ligner på Mace stumpet sigaretten i det Myklus Busticus åpnet døren. Det var ironisk nok en Camel. Glatte-Kaspar var tydeligvis ikke forberedt, for han ble helt stum da han så Myklus Busticus. Han hadde hørt gjetord om ham i Sæntrum på grunn av hans faglig sterke konsum.

De ble invitert inn på en øl selvfølgelig, og fikk hver sin Jupiler, som lå i hotellkjøleskapet for å kunne ha noe å slappe av med mellom slagene. Tyrkeren som Ligner på Mace takket høflig nei, fyrte opp enda en Camel og sprayet seg med Axe. Glatte-Kaspar var fortsatt målløs.`,
      options: [
        { text: "Spør Glatte-Kaspar hva han egentlig heter", consequence: "Glatte-Kaspar blir overrasket og sendes til Skumløs-skogen. Ingen har noen gang stilt det spørsmålet før. Myklus Busticus og Tyrkeren Som Ligner På Mace deler en vannpipe og bestemmer seg for å ta en bukett.", next: 1 },
        { text: "Gi Glatte-Kaspar juling", consequence: "Glatte-Kaspar blir overrasket og sendes til Skumløs-skogen. Tyrkeren Som Ligner på Mace blir med å dele ut bank. Myklus Busticus og Tyrkeren Som Ligner På Mace deler en vannpipe og bestemmer seg for å ta en bukett.", next: 1 },
        { text: "Tisse i Glatte-Kaspars Jupiler før han får den", consequence: "Det viser seg at det er det samme som Hansa. Glatte-Kaspar blir overrasket og sendes til Skumløs-skogen. Myklus Busticus og Tyrkeren Som Ligner På Mace deler en vannpipe og bestemmer seg for å ta en bukett.", next: 1 }
      ]
    },
    // Steg 2
    {
      text: `Inne hos Frituur-Frans setter de seg ned med hver sin store bukett. Myklus velger majonestopping, mens Tyrkeren Som Ligner på Mace vil ha karrisaus. De spiser litt i stillhet (de har ikke vekslet et ord utover enigheten om å Franse) før Tyrkeren Som Ligner på Mace sier at han er sendt dit av Bams Hrur, en mystisk velgjører som velger å skjule navnet sitt. Han har regnet med at Myklus Busticus ville havne i trøbbel, og har også selv litt å tjene på å gjeninnsette Kai André som den mektige Gud. Tyrkeren som Ligner på Mace sier at Myklus må dra til Antwerpen for å hente krefter fra den magiske ølscenen i byen.`,
      options: [
        { text: "Sette seg på toget til Antwerpen på 2. klasse", consequence: "Trappa ned til 2. klasse på toget er stengt av en gjeng hunder som står og teller mynter. Myklus Busticus kommer seg ikke forbi, og holder på å tisse seg ut. Må gå av i Brussel-Midi, og drar til hun med Væst og Bitchesveis for å tisse. Sjangler etter hvert inn på et nytt tog med tom blære og ankommer Den Engel på kveldingen.", next: 2 },
        { text: "Sette seg på toget til Antwerpen på 1. klasse", consequence: "Ser en gjeng med hunder som teller mynter i veien ned til 2. klasse. Går inn på en gullforgylt do og tisser. Ankommer Antwerpen og Den Engel midt på dagen, og tar en Bolleke og en sigg med innehaveren av Den Engel.", next: 2 },
        { text: "Tar på seg sykkeldress og låner en landeveissykkel for å sykle til Antwerpen", consequence: "Midt mellom de to byene fylles veien med svart røyk. Ut av den stiger Paven, som har kommet tilbake fra Skumløs-skogen for å bannlyse Myklus Busticus. «En så grå person har ingen rett til å være Den Utvalgte» sier han før han bannlyser Myklus Busticus til Skumløs-skogen", next: "skumlos_return_1" }
      ]
    },
    // Steg 3
    {
      text: `Etter fire dager til ende med hardt faglig innhold, bl.a. Bolleke-konsum, sigging og et kosthold bestående utelukkende av Oude Kaas fra Paters Vaetje, kommer den gamle mannen fra Kulminator tassende bort til Myklus Busticus, som sitter utenfor Den Engel.
«Bams Hrur har kommet og venter på deg hos oss. Ta ut noen Euro og kom» sier den gamle mannen. Myklus Busticus drikker opp ølen, bestiller en til, drikker opp den, går innom fattigmanns-Den Engel på Grote Markt, stjeler et bilde og tar 2 Tripel D’Anvers før han spaserer bort til Kulminator. Den gamle mannen åpner med et olmt blikk når han ringer på. «Hva vil du???»`,
      options: [
        { text: "«Smake på godt øl»", consequence: "Den gamle mannen spør om han har kontanter. Det har han ikke – Myklus Busticus tror ikke på kontanter av prinsipp. Han blir nektet inngang. Litt lenger bort i gata er det en dagligvarehandel. Myklus kjøper seg litt Haribo og et par øl, og setter seg på asfaltkanten.", next: 3 },
        { text: "Skalle ned den gamle mannen", consequence: "I det pannebraskene møtes forvandles den gamle mannen til å vise sitt sanne jeg – Gossa-Per. Myklus Busticus sitt hode er tungt av kunnskap og gjennombedøvet, så det medfører at Gossa blir liggende. Ut av baren kommer den gamle damen som jobbet der, og forteller at hun har vært holdt i fangenskap i årevis. Hun liker egentlig bare ungt øl, men Gossa hadde en besettelse om å lagre ting i årevis utover holdbarhetsdatoene. Bams Hrur kommer også ut, et langhåret mann med en t-skjorte som sier «Caps-løs sone». Han ber Myklus Busticus kjøpe noen øl og sette seg ned på en fortauskant litt lenger bort", next: 4 }
      ]
    },
    // Steg 4
    {
      text: `Bams Hrur setter seg ved siden av Myklus Busticus og tar et par Haribo-speilegg. «nå kommer han snart» sier Bams, og fyrer opp en sigg. Myklus ser spørrende på han og tar en sup av Jupileren. Myklus skvetter til når det kommer en person som er kliss lik Tyrkeren Som Ligner på Mace gående i full tysk landslangsuniform. De kunne vært tvillingbrødre, der den ene er av tyrkisk opprinnelse, og den nyankomne har litt mer nordisk utseende. Han hilser med avslipt østlandsdialekt, og med perfekt såna/sånass-gramatikk, men nekter å oppgi sitt namn. Han Som Ligner på Tyrkeren Som Ligner på Mace viser frem et perfekt Struise-glass han har lånt fra en pub i nærheten, og de bestemmer seg for å dra dit for å ta noen øl. Myklus Busticus og Bams Hrur har fått en god tone, men de er nysgjerrige på hvem i alle dager Han Som Ligner på Tyrkeren Som Ligner på Mace er og hvilken rolle han har i det store komplottet her.`,
      options: [
        { text: "Dra på KFC", consequence: "De har også bepilsningsmuligheter på KFC i dette Fagets Rige. Bøtteholdet og glassholder er upåklagelig.", next: 5 },
        { text: "Dra på Green Café Organical", consequence: "Bannlyses til Skumløs-skogen.", next: "skumlos_return_4" },
        { text: "Dra på Burger King og kjøpe Crispy Chicken", consequence: "Bannlyses til Skumløs-skogen. Denne gangen hører de høye «oho»-rop som en ugle", next: "skumlos_return_4" }
      ]
    },
    // Steg 5
    {
      text: `De tar seg en øl og skal sette seg ned for å planlegge hvordan de kan gjeninnsette Kai Andre i himmelriket. Fortsettelse følger i neste kapittel.`,
      options: []
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text.replace(/\n/g,"<br>")}</p>`;

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
    if (opt.next === "skumlos_return_1") {
      showSkumlos(1); // tilbake til steg 2
      return;
    }
    if (opt.next === "skumlos_return_4") {
      showSkumlos(4); // tilbake til steg 4
      return;
    }
    container.innerHTML = `<p>${opt.consequence}</p>`;
    if (typeof opt.next === "number") {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Neste";
      nextBtn.onclick = () => renderStep(opt.next);
      container.appendChild(nextBtn);
    } else {
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
    }
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
        <div class="tile" onclick="startRPG(4)">Kapittel 4: Bams Hrur</div>
        <div class="tile" onclick="startRPG(5)">Kapittel 5: Skumløs-skogen & KFC</div>
        <div class="backbar"><button class="btn" onclick="showMainMenu()">Tilbake</button></div>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}

// ---------- Kapittel 5 (ORDRETT, med rene valg-etiketter) ----------
function runChapter5(container) {
  const story = [
    // Steg 1
    {
      text: `Bams Hrur drar frem en gammel bok, tydelig preget av tidens tann. Boken heter «Albin-koppen, Munnggoen og Bukksa som liger i frysseren». Den har en svak eim av Pepsi Max. «Nøkkelen til å gjeninnsette Kai Andre finner vi i denne hellige teksten» sier han rolig til Myklus Busticus mens han tar en sup av Jupileren. Bams fortsetter: «Denne teksten er umulig å lese. Mannen som har skrevet den får vi heller ikke flydd inn for å oversette, fordi han for tiden har skjegg og kommer seg ikke gjennom en sikkerhetskontroll på flyplass. Den eneste måten vi klarer å lese dette er hvis vi oppnår en promille på 6,9». Myklus Busticus foreslo at de skulle dra på Brasserie HOBS for å jage nedpå Affligem Tripel for å komme i gang.`,
      options: [
        { text: "Drikke 2 Affligem før burging, fortsette med 8 Affligem", consequence: "Oppnår til slutt 6,9 i promille og blir istand til å forstå teksten.", next: 1 },
        { text: "Veksle annenhver Affligem og Maes", consequence: "Byens borgermester kommer innom med Nøkkelen til Byen for å hedre det faglige nivået. Borgermesteren lover også vekk en valgfri Mercedes til Myklus Busticus og Bams Hrur. De oppnår til slutt 6,9 i promille og er i stand til å forstå teksten.", next: 1 },
        { text: "Ta en lur, Pepsi Max og en joggetur for å klarne hodet", consequence: "Skumløs-skogen.", next: 1 }
      ]
    },
    // Steg 2
    {
      text: `I teksten står det at Kai Andre først og fremst må reddes fra Skumløs-skogens fortapelse før han kan gjeninnta tronen i himmelriket. Det må gjøres gjennom å bekjempe den onde trollmannen som styrer Skumløs-skogen. Navnet fremgår ikke av teksten. Det står også litt forskjellig i boka om Molde Fotballklubb som de blar fort forbi. Selv 6,9 i promille er ikke høyt nok til å lide se gjennom det. Bams Hrur og Myklus Busticus diskuterer litt frem og tilbake om glassholdet på Brasserie Hobs, og konkluderer med følgende:`,
      options: [
        { text: "Holdet er OK, spesielt på Maesen", consequence: "Uttalelsen kan forsvares. De får sitte i fred og drikke litt til. Nå skal de ha seg en KFC før de skal på Clob.", next: 2 },
        { text: "Holdet er bra", consequence: "De lokale nikker nok en gang anerkjennende for vurderingen. En mann ved døra med hatt og PC-veske nikker bukker for de når de går ut av lokalet. KFC neste.", next: 2 },
        { text: "Holdet er fraværende", consequence: "Kelneren kommer bort og spytter på de. De går ut av lokalet og bort til KFC.", next: 2 }
      ]
    },
    // Steg 3
    {
      text: `Obersten lyser opp veggen foran de, og de får følgende valg:`,
      options: [
        { text: "Liten meny med brus", consequence: "Skumløs-skogen.", next: 3 },
        { text: "Medium meny med øl", consequence: "Alt for lite mat. De bestiller en stor meny når de er ferdige med den første. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.", next: 3 },
        { text: "Altfor stor meny med mat nok til en afrikansk landsby", consequence: "De lokale nikker nok en gang anerkjennende. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.", next: 3 }
      ]
    },
    // Steg 4
    {
      text: `Mannen på nabobordet reiser seg i sinne. Lysene i lokalet flimrer. Det begynner å lyne og tordne utenfor. Bakken rister. Lokalet fylles med røyk. Det viser seg at mannen har på seg en lang kappe og en trollmannvest

Han har en stor ornamentert stav i hendene

Det viser seg å være

Hasse Lynland
Han satt sammen med en annen mann som de også dro kjensel på, men som fikk glasset sitt skånet for fettete fingre: Lederen for Bunadsgeriljaen, spanjakken El Bonero.
«Du må tørke hendene på buksa slik som skikkelige mannfolk» sier Hasse Lynland. Myklus Busticus og Bams Hrur er enige, men Bams Hrur spør:
«Hva gjør dere her?»
El Bonero svarer «Dette er Fagets Hjerte – KFC her i Antwerpen er det høyeste nivå av fag. Vi tenkte dette var en passende lokasjon for å varme opp lever og nyrer til vi skal på konsert med DJ Dock Daddy i kveld»
Myklus Busticus svarer «Dock Daddy? Jeg trodde han hadde lagt platespilleren på hattehylla?»
El Bonero gir Myklus Busticus et uventet kyss på kinnet og stryker han nedover armen mens han sier «Jeg vet at dere er på et oppdrag for å gjeninnsette Kai Andre. Da er du interessert i hvem Dock Daddy egentlig er. Hans namn er Høyvind Hund. Han er broren til Tore Hund som var med å kjempe mot Olav den Hellige. Han vil være viktig i deres oppdrag»`,
      options: [
        { text: "Invitere Hasse Lynland og El Bonero på en øl på en tilfeldig pub", consequence: "Fortsettelse følger i neste kapittel." }
      ]
    }
  ];

  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${step.text.replace(/\n/g,"<br>")}</p>`;

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
    container.innerHTML = `<p>${opt.consequence}</p>`;
    if (typeof opt.next === "number") {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Neste";
      nextBtn.onclick = () => renderStep(opt.next);
      container.appendChild(nextBtn);
    } else {
      const back = document.createElement("button");
      back.textContent = "Tilbake til kapittelmeny";
      back.onclick = returnToChapters;
      container.appendChild(back);
    }
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
        <div class="tile" onclick="startRPG(4)">Kapittel 4: Bams Hrur</div>
        <div class="tile" onclick="startRPG(5)">Kapittel 5: Skumløs-skogen & KFC</div>
        <div class="backbar"><button class="btn" onclick="showMainMenu()">Tilbake</button></div>
      `;
    }
    document.getElementById("rpgContainer").classList.add("hidden");
  }

  renderStep(0);
}
