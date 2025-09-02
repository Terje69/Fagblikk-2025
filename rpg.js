// rpg.js — Chapters 1–4 (original style) + Kapittel 5 verbatim.

function startRPG(chapter) {
  const container = document.getElementById("rpgContainer");
  const mainMenu = document.getElementById("mainMenu");
  const daily = document.getElementById("dailyContainer");
  const page = document.getElementById("pageContent");

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

// --- Minimal demos for 1–4 to match structure (replace with your existing content if needed) ---
function runChapter1(container){ renderStory(container,[{text:`Kapittel 1`,options:[{text:"Neste",consequence:"...",next:1}]},{text:`Slutt`,options:[]}]); }
function runChapter2(container){ renderStory(container,[{text:`Kapittel 2`,options:[{text:"Neste",consequence:"...",next:1}]},{text:`Slutt`,options:[]}]); }
function runChapter3(container){ renderStory(container,[{text:`Kapittel 3`,options:[{text:"Neste",consequence:"...",next:1}]},{text:`Slutt`,options:[]}]); }
function runChapter4(container){ renderStory(container,[{text:`Kapittel 4`,options:[{text:"Neste",consequence:"...",next:1}]},{text:`Slutt`,options:[]}]); }

// ---------- Kapittel 5 (ORDRETT) ----------
function runChapter5(container) {
  const story = [
    // Steg 1
    {
      text: `Bams Hrur drar frem en gammel bok, tydelig preget av tidens tann. Boken heter «Albin-koppen, Munnggoen og Bukksa som liger i frysseren». Den har en svak eim av Pepsi Max. «Nøkkelen til å gjeninnsette Kai Andre finner vi i denne hellige teksten» sier han rolig til Myklus Busticus mens han tar en sup av Jupileren. Bams fortsetter: «Denne teksten er umulig å lese. Mannen som har skrevet den får vi heller ikke flydd inn for å oversette, fordi han for tiden har skjegg og kommer seg ikke gjennom en sikkerhetskontroll på flyplass. Den eneste måten vi klarer å lese dette er hvis vi oppnår en promille på 6,9». Myklus Busticus foreslo at de skulle dra på Brasserie HOBS for å jage nedpå Affligem Tripel for å komme i gang.`,
      options: [
        { text: "Drikke 2 Affligem før burging, fortsette med 8 Affligem (Oppnår til slutt 6,9 i promille og blir istand til å forstå teksten)", consequence: "Oppnår til slutt 6,9 i promille og blir istand til å forstå teksten.", next: 1 },
        { text: "Veksle annenhver Affligem og Maes (Byens borgermester kommer innom med Nøkkelen til Byen for å hedre det faglige nivået. Borgermesteren lover også vekk en valgfri Mercedes til Myklus Busticus og Bams Hrur. De oppnår til slutt 6,9 i promille og er i stand til å forstå teksten)", consequence: "Byens borgermester kommer innom med Nøkkelen til Byen for å hedre det faglige nivået. Borgermesteren lover også vekk en valgfri Mercedes til Myklus Busticus og Bams Hrur. De oppnår til slutt 6,9 i promille og er i stand til å forstå teksten.", next: 1 },
        { text: "Ta en lur, Pepsi Max og en joggetur for å klarne hodet (Skumløs-skogen)", consequence: "Skumløs-skogen.", next: 1 }
      ]
    },
    // Steg 2
    {
      text: `I teksten står det at Kai Andre først og fremst må reddes fra Skumløs-skogens fortapelse før han kan gjeninnta tronen i himmelriket. Det må gjøres gjennom å bekjempe den onde trollmannen som styrer Skumløs-skogen. Navnet fremgår ikke av teksten. Det står også litt forskjellig i boka om Molde Fotballklubb som de blar fort forbi. Selv 6,9 i promille er ikke høyt nok til å lide se gjennom det. Bams Hrur og Myklus Busticus diskuterer litt frem og tilbake om glassholdet på Brasserie Hobs, og konkluderer med følgende:`,
      options: [
        { text: "Holdet er OK, spesielt på Maesen (Uttalelsen kan forsvares. De får sitte i fred og drikke litt til. Nå skal de ha seg en KFC før de skal på Clob)", consequence: "Uttalelsen kan forsvares. De får sitte i fred og drikke litt til. Nå skal de ha seg en KFC før de skal på Clob.", next: 2 },
        { text: "Holdet er bra (De lokale nikker nok en gang anerkjennende for vurderingen. En mann ved døra med hatt og PC-veske nikker bukker for de når de går ut av lokalet. KFC neste)", consequence: "De lokale nikker nok en gang anerkjennende for vurderingen. En mann ved døra med hatt og PC-veske nikker bukker for de når de går ut av lokalet. KFC neste.", next: 2 },
        { text: "Holdet er fraværende (Kelneren kommer bort og spytter på de. De går ut av lokalet og bort til KFC)", consequence: "Kelneren kommer bort og spytter på de. De går ut av lokalet og bort til KFC.", next: 2 }
      ]
    },
    // Steg 3
    {
      text: `Obersten lyser opp veggen foran de, og de får følgende valg:`,
      options: [
        { text: "Liten meny med brus (Skumløs-skogen)", consequence: "Skumløs-skogen.", next: 3 },
        { text: "Medium meny med øl (Alt for lite mat. De bestiller en stor meny når de er ferdige med den første. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.)", consequence: "Alt for lite mat. De bestiller en stor meny når de er ferdige med den første. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.", next: 3 },
        { text: "Altfor stor meny med mat nok til en afrikansk landsby. (De lokale nikker nok en gang anerkjennende. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.)", consequence: "De lokale nikker nok en gang anerkjennende. Det ender med fråtsing nok en gang. De får bare utdelt en serviett på deling. De har såpass høy promille at Myklus Busticus sjangler og kommer borti Slaapmutske-glasset til en på nabobordet og det blir fett på innsiden av glasset.", next: 3 }
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
        { text: "Invitere Hasse Lynland og El Bonero på en øl på en tilfeldig pub (Fortsettelse følger i neste kapittel)", consequence: "Fortsettelse følger i neste kapittel." }
      ]
    }
  ];
  renderStory(container, story);
}

// Shared renderer
function renderStory(container, story) {
  function renderStep(i) {
    const step = story[i];
    container.innerHTML = `<p>${(step.text||"").replace(/\\n/g,"<br>")}</p>`;
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
    container.innerHTML = `<p>${opt.consequence||""}</p>`;
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
