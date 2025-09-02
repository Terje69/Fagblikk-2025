// RPGen core data container. If an existing RPG_DATA object exists, we keep it.
window.RPG_DATA = window.RPG_DATA || {};

/**
 * New chapter: Skumløs-skogen → KFC & Trollmenn
 * The structure is additive and should not break existing consumers:
 * {
 *   title: string,
 *   start: string (step id),
 *   steps: {
 *     [stepId]: {
 *       text: string,
 *       choices: [{ label, consequence, next? }]
 *     }
 *   }
 * }
 */
window.RPG_DATA["kapittel_skumlos_kfc"] = {
  title: "Skumløs-skogen: KFC, Hasse Lynland og El Bonero",
  start: "steg1",
  steps: {
    "steg1": {
      text: "Bams Hrur drar frem en gammel bok, «Albin-koppen, Munnggoen og Bukksa som liger i frysseren». Den dufter svakt av Pepsi Max. «Nøkkelen til å gjeninnsette Kai Andre finner vi i denne hellige teksten», sier han til Myklus Busticus. Teksten er uleselig uten 6,9 i promille. Myklus foreslår Brasserie HOBS og Affligem Tripel for å komme i gang.",
      choices: [
        {
          label: "Drikke 2 Affligem før burging, fortsette med 8 Affligem",
          consequence: "Oppnår til slutt 6,9 i promille og blir i stand til å forstå teksten.",
          next: "steg2"
        },
        {
          label: "Veksle annenhver Affligem og Maes",
          consequence: "Borgermesteren hedrer nivået: Nøkkelen til Byen og en valgfri Mercedes. Promille 6,9 – teksten forstås.",
          next: "steg2"
        },
        {
          label: "Ta en lur, Pepsi Max og en joggetur for å klarne hodet",
          consequence: "De forviller seg mot Skumløs-skogen.",
          next: "steg2"
        }
      ]
    },
    "steg2": {
      text: "I teksten står det at Kai Andre må reddes fra Skumløs-skogens fortapelse ved å bekjempe den onde trollmannen som styrer skogen (navn ukjent). De blar raskt forbi et avsnitt om Molde Fotballklubb. Etter en diskusjon om glassholdet på Brasserie HOBS konkluderer de:",
      choices: [
        {
          label: "Holdet er OK, spesielt på Maesen",
          consequence: "Uttalelsen kan forsvares. De får sitte i fred og drikke litt til. Nå skal de ha seg en KFC før de skal på Clob.",
          next: "steg3"
        },
        {
          label: "Holdet er bra",
          consequence: "De lokale nikker anerkjennende. En mann ved døra med hatt og PC-veske bukker. KFC neste.",
          next: "steg3"
        },
        {
          label: "Holdet er fraværende",
          consequence: "Kelneren spytter på dem. De marsjerer til KFC.",
          next: "steg3"
        }
      ]
    },
    "steg3": {
      text: "Obersten lyser opp veggen. Bestillingsvalg:",
      choices: [
        {
          label: "Liten meny med brus",
          consequence: "Veien peker mot Skumløs-skogen.",
          next: "steg4"
        },
        {
          label: "Medium meny med øl",
          consequence: "Alt for lite mat → de bestiller en stor etterpå. Fråtsing. En Slaapmutske får fett på innsiden av glasset.",
          next: "steg4"
        },
        {
          label: "Altfor stor meny med mat nok til en afrikansk landsby",
          consequence: "De lokale nikker. Fråtsing. En Slaapmutske får fett på innsiden av glasset.",
          next: "steg4"
        }
      ]
    },
    "steg4": {
      text: "Mannen på nabobordet reiser seg – lysene flimrer, torden ruller, bakken rister. En kappekledd skikkelse med ornamentert stav avslører seg som Hasse Lynland. Ved siden av ham sitter spanjakken El Bonero, lederen for Bunadsgeriljaen. «Du må tørke hendene på buksa,» sier Hasse. El Bonero forklarer at KFC i Antwerpen er Fagets Hjerte før DJ Dock Daddy. Dock Daddy er egentlig Høyvind Hund, bror til Tore Hund – viktig for oppdraget om å gjeninnsette Kai Andre.",
      choices: [
        {
          label: "Invitere Hasse Lynland og El Bonero på en øl på en tilfeldig pub",
          consequence: "Fortsettelse følger i neste kapittel."
          // no next → chapter ends here
        }
      ]
    }
  }
};
