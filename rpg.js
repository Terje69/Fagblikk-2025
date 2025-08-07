
const rpgData = {
  1: {
    title: "Kapittel 1: Myklus Oppvåkning",
    steps: [
      {
        text: "Myklus Busticus våkner med et brak. Kontingentet er under angrep, og glassene er i fare. Hva gjør han?",
        options: [
          { text: "Roper på Claus", outcome: "Claus kommer, men han er i sokkelesten og snubler i en kurv med friterte kyllingklubber. Myklus må klare seg selv." },
          { text: "Leter etter sin hellige Jupiler", outcome: "Han finner tre, men mangler de to siste av de fem hellige øl." },
          { text: "Griper etter sverdet og stormer ut", outcome: "Myklus stormer ut i kampens hete, men blir raskt overmannet og sendt til Skumløs-skogen. Der er glassholdet forferdelig og det serveres kun Hansa. En skjebne verre enn døden." }
        ]
      },
      {
        text: "Myklus møter den onde Heim E. Vernet for første gang. Hva gjør han?",
        options: [
          { text: "Kaster en Duvel mot han", outcome: "Heim E. Vernet blokkerer enkelt og ler hånlig." },
          { text: "Ringer Rulle for backup", outcome: "Rulle svarer ikke – han er på en løpeøkt i Molde." },
          { text: "Synger den hellige hymnen om malt og humle", outcome: "Heim E. Vernet trekker seg litt tilbake, forvirret og urolig." }
        ]
      },
      {
        text: "Myklus oppdager et hemmelig kart som leder til de fem hellige øl. Hvor går han først?",
        options: [
          { text: "Til Pateren", outcome: "Der finner han en Westvleteren 12 og visdom fra en gammel munk." },
          { text: "Til Delirium Café", outcome: "Han finner to av de hellige ølene, men også Vegard Beid." },
          { text: "Til en mystisk bod bak Brugge-torget", outcome: "Der er det kun cider. Han blir svimmel og må starte på nytt." }
        ]
      }
    ]
  },
  2: {
    title: "Kapittel 2: Jakten på Jupiler",
    steps: [
      {
        text: "Myklus løper inn i baren hvor de selger pølse med surkål og potetgull i et forsøk på å stikke av. Heim E. Vernet sender Vegard Beid etter Myklus Busticus.",
        options: [
          { text: "Kaste et tomt halvlitersglass med Hoegaarden mot Vegard Beid", outcome: "Treffer midt i planeten til Vegard Beid, han blir sendt inn i Leffe-baren og tar seg en Leffe som han synes er OK men ikke noe å skrive hjem om. Myklus kjøper seg litt tid til å stikke av. Det ender med at Vegard Beid havner bak noen hunder på vei ut og blir stengt inne på flyplassen til evig tid." },
          { text: "Styrte et halvlitersglass Hoegaarden, kaste det tomme glasset mot Vegard Beid", outcome: "Treffer midt i planeten til Vegard Beid, han blir sendt inn til Den Siste Snille hvor han stortrives og blir sittende og drikke arbeids-Jupiler i all fremtid. Vegard Beid er beseiret." },
          { text: "Kaste en vape som ligger på et bord mot Vegard Beid", outcome: "Rommet fylles med lys og Paven kommer svevende ned. Vegard Beid bekjempes ved at Paven begynner å skryte til han så mye at han ikke kommer seg unna." }
        ]
      },
      {
        text: "Myklus Busticus setter seg på toget i retning Gent. Det er ingen Heim E. Vernet ombord i toget som dundrer gjennom det Kontignentale landskapet. Myklus Busticus setter seg ned på en uteservering og tar seg en iskald Jupiler.",
        options: [
          { text: "Bestille litt ost og enda en Jupiler, etterfulgt av en tripel", outcome: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han." },
          { text: "Bestille en Jupiler, litt ost, og se litt på menyen før han bestiller en tripel", outcome: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han." },
          { text: "Bestille en tripel og to Jupiler til å skylle ned. Kjenne litt med føttene på brosteinen", outcome: "De lokale nikker anerkjennende til hans faglig sterke oppførsel. Han ser et kjent ansikt stå nederst i gata. Heim E. Vernet har funnet han." }
        ]
      },
      {
        text: "Heim E. Vernet kommer løpende i hans retning. Nå er tiden knapp og mulighetene få. Han dypper osten i litt sennep før han tar den siste slurken av tripelen. Myklus Busticus fikk ikke med seg sitt magiske sverd, Bjænn, gjennom sikkerhetskontrollen, så han kan ikke bekjempe Heim E. Vernet på vanlig vis. Han legger på sprang.",
        options: [
          { text: "Innom Frituur Frans", outcome: "Han ber Frans gi en bukett til Heim E. Vernet og løper videre inn til Sinte-Måsen. Heim E. Vernet kommer seg ikke inn med ekstern bukett, og Myklus Busticus er i trygghet inntil videre. Han bestiller en Rochefort 10 og skal finne en plass å sitte. Innerst i hjørnet sitter en mystisk, kappekledd figur. Det viser seg å være Rulle, som har rullet helt fra Molde. Han sier 'Myklus, jeg har et oppdrag til deg.....'" },
          { text: "Innom Dulle Griet", outcome: "Myklus rekker å ta seg en stor Kwak, men klarer ikke løpe like fort med bare en sko. Heim E. Vernet tar han igjen og sender han til Skumløs-skogen, hvor glassholdet er forferdelig og det kun serveres Hansa." },
          { text: "Innom Allegro Moderati", outcome: "Trond Giske sitter i restauranten og prøver å sjekke opp Heim E. Vernet når han kommer. De utvikler en romanse, og Myklus kommer seg i trygghet hos Sinte-Måsen. Innerst i hjørnet sitter en mystisk, kappekledd figur. Det viser seg å være Rulle, som har rullet helt fra Molde. Han sier 'Myklus, jeg har et oppdrag til deg.....'" }
        ]
      }
    ]
  }
};

let currentStep = 0;
let currentChapter = 1;

function startRPG(chapter) {
  currentChapter = chapter;
  currentStep = 0;
  document.getElementById("rpgContainer").innerHTML = "";
  showStep();
}

function showStep() {
  const step = rpgData[currentChapter].steps[currentStep];
  const container = document.getElementById("rpgContainer");
  container.innerHTML = `
    <div class="rpg-step">
      <p>${step.text}</p>
      ${step.options
        .map(
          (opt, idx) =>
            `<div class="rpg-option" onclick="chooseOption(${idx})">${opt.text}</div>`
        )
        .join("")}
    </div>
  `;
}

function chooseOption(index) {
  const outcome = rpgData[currentChapter].steps[currentStep].options[index].outcome;
  const container = document.getElementById("rpgContainer");
  container.innerHTML = `
    <div class="rpg-outcome">
      <p>${outcome}</p>
      ${
        currentStep < rpgData[currentChapter].steps.length - 1
          ? '<button class="next-btn" onclick="nextStep()">Neste</button>'
          : '<p><em>Fortsettelse følger i neste kapittel...</em></p>'
      }
    </div>
  `;
}

function nextStep() {
  currentStep++;
  showStep();
}
