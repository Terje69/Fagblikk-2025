
const rpgData = {
  1: [
    {
      text: "Myklus Busticus våkner i mørket. Han aner ikke hvor han er, men kjenner en vag smak av Rochefort 10 i munnen.",
      options: [
        { text: "Stå opp og se seg rundt", outcome: "Han finner et tomt glass med Westvleteren 12. En stemme sier: 'Du må finne de fem hellige øl.'" },
        { text: "Ligg litt til og drøm om Chimay Blue", outcome: "I drømmen møter han en gammel munk som gir han et kart til de fem hellige øl." },
        { text: "Rop på hjelp", outcome: "Et ekko svarer: 'Bare de verdige kan finne veien...'" }
      ]
    },
    {
      text: "Myklus går ut døra og ser tre stier.",
      options: [
        { text: "Følg lyden av latter", outcome: "Han finner en liten bar hvor de serverer Orval. Første øl funnet!" },
        { text: "Følg lukten av belgiske vafler", outcome: "Han havner på markedet. Ingen øl, men mye inspirasjon." },
        { text: "Gå rett frem mot tåka", outcome: "Han trår inn i Skumløs-skogen hvor glassholdet er forferdelig og det kun serveres Hansa. Spill over." }
      ]
    },
    {
      text: "Han går videre og møter en vakt.",
      options: [
        { text: "Bestikk vakten med Westmalle Dubbel", outcome: "Vakten smiler og lar han passere. Andre øl funnet!" },
        { text: "Syng en sang om Trappist-tradisjoner", outcome: "Vakten blir rørt og gir han Rochefort 8. Tredje øl funnet!" },
        { text: "Ignorér vakten og løp forbi", outcome: "Han blir sendt tilbake til Skumløs-skogen. Spill over." }
      ]
    },
    {
      text: "Myklus ankommer Belgia og møter Heim E. Vernet og hans hjelper Vegard Beid.",
      options: [
        { text: "Utfordre dem til ølquiz", outcome: "Han vinner og får Chimay Blue. Fjerde øl funnet!" },
        { text: "Skål dem ut med Duvel", outcome: "De klarer ikke matche tempoet. Femte øl funnet!" },
        { text: "Prøv å flykte", outcome: "Han snubler og blir fanget. Spill over." }
      ]
    }
  ],
  2: [
    {
      text: "Myklus løper inn i baren hvor de selger pølse med surkål og potetgull. Vegard Beid følger etter.",
      options: [
        { text: "Kaste tomt Hoegaarden-glass", outcome: "Vegard Beid havner i Leffe-baren og blir sittende. Myklus slipper unna." },
        { text: "Styrte Hoegaarden og kaste glasset", outcome: "Vegard ender opp i Den Siste Snille og blir sittende. Myklus slipper unna." },
        { text: "Kaste en vape", outcome: "Paven svever ned og skryter Vegard i senk. Myklus slipper unna." }
      ]
    },
    {
      text: "Myklus tar toget til Gent og drikker en Jupiler.",
      options: [
        { text: "Bestille ost og en tripel", outcome: "De lokale nikker. Heim E. Vernet dukker opp." },
        { text: "Bestille Jupiler, ost og vurdere menyen", outcome: "De lokale nikker. Heim E. Vernet dukker opp." },
        { text: "Bestille en tripel og to Jupiler", outcome: "De lokale nikker. Heim E. Vernet dukker opp." }
      ]
    },
    {
      text: "Heim E. Vernet kommer løpende. Myklus må flykte.",
      options: [
        { text: "Innom Frituur Frans", outcome: "Han lurer Vernet med blomster. Hos Sinte-Måsen venter Rulle: 'Myklus, jeg har et oppdrag til deg...'" },
        { text: "Innom Dulle Griet", outcome: "Han mister en sko. Heim E. Vernet fanger ham. Til Skumløs-skogen med deg!" },
        { text: "Innom Allegro Moderati", outcome: "Giske sjekker opp Vernet. Myklus møter Rulle hos Sinte-Måsen: 'Myklus, jeg har et oppdrag til deg...'" }
      ]
    }
  ]
};

let currentChapter = 1;
let currentStep = 0;

function startRPG(chapter) {
  currentChapter = chapter;
  currentStep = 0;
  document.getElementById("rpgContainer").innerHTML = "";
  showStep();
}

function showStep() {
  const step = rpgData[currentChapter][currentStep];
  const container = document.getElementById("rpgContainer");
  container.innerHTML = '<div class="rpg-step"><p>' + step.text + '</p></div>';
  step.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "rpg-option";
    btn.innerText = opt.text;
    btn.onclick = () => showOutcome(opt.outcome);
    container.appendChild(btn);
  });
}

function showOutcome(outcome) {
  const container = document.getElementById("rpgContainer");
  container.innerHTML = '<div class="rpg-outcome"><p>' + outcome + '</p></div>';
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Neste";
  nextBtn.className = "next-btn";
  nextBtn.onclick = () => {
    currentStep++;
    if (currentStep < rpgData[currentChapter].length) {
      showStep();
    } else {
      container.innerHTML = "<p>Kapittelet er ferdig. Fortsettelse følger...</p>";
    }
  };
  container.appendChild(nextBtn);
}
