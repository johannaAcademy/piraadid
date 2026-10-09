const teamData = {
  tiim1: {
    name: "TIIM 1",
    start: {
      title: "KAARDIL MÄÄRATUD ALGUSPUNKT",
      address: "Vaata täpset alguspunkti Google Mapsi marsruudilt.",
      note: "Alustage kaardil näidatud kohast. Esimene mõistatus juhatab teid Taani Kuninga aeda."
    },
    mapImage: "assets/tiim-1-kaart.png",
    mapLink: "https://maps.app.goo.gl/1bkvb2Zo4GqqxK9HA",
    // ASENDA OMA MESSENGERI GRUPI KUTSELINGIGA
    messengerLink: "SIIN_TIIM1_MESSENGERI_LINK",
    checkpoints: [
      {
        title: "TAANI KUNINGA AED",
        clue: "Meid on kolm, me ei räägi ega liigu, kuid ometi jälgime kõiki, kes meist mööduvad. Me kanname rüüd, aga pole enam kloostris. Meie aed kuulub kuningale, kelle kroonilt pole päike kunagi loojunud. Leia koht, kus kolm vaikivat munka valvavad oma saladust, äkki just nemad varjavadki aarde asukohta."
      },
      {
        title: "HIRVE SKULPTUUR",
        clue: "Vanade piraatide legend räägib metsloomast, kellel oli neli jalga, sarved ja üks saatuslik nõrkus: uudishimu. Ühel ööl sattus ta silmitsi kapten Mustkaheksajalaga ja vaatas talle otse silma. Juba järgmisel sekundil muutus ta kiviks."
      },
      {
        title: "PAKS MARGAREETA",
        clue: "Ma olen nii paks, et isegi suur muuseum mahub mu sisse ära. Kunagi kaitsesin linna nende eest, kes tulid merelt, nüüd peidan endas lugusid laevadest ja meresõitjatest"
      },
      {
        title: "KUNINGAKODA — LÕPP-PUNKT",
        clue: "Ärge laske end petta: kõige suuremad saladused ei peitu troonidel, vaid nende all. Otsige üles kuninglik koda, laskuge sinna, kuhu päevavalgus ei ulatu, ja valmistuge kohtuma oma saatusega."
      }
    ]
  },

  tiim2: {
    name: "TIIM 2",
    start: {
      title: "KLOOSTRIVÄRAV",
      address: "Gümnaasiumi tn 1, Tallinn",
      note: "See on teie alguspunkt. Esimene mõistatus juhatab teid Paksu Margareeta juurde."
    },
    mapImage: "assets/tiim-2-kaart.png",
    mapLink: "https://maps.app.goo.gl/6r1JTcLYn9dfaxyq5",
    // ASENDA OMA MESSENGERI GRUPI KUTSELINGIGA
    messengerLink: "SIIN_TIIM2_MESSENGERI_LINK",
    checkpoints: [
      {
        title: "PAKS MARGAREETA",
        clue: "Ma olen nii paks, et isegi suur muuseum mahub mu sisse ära. Kunagi kaitsesin linna nende eest, kes tulid merelt, nüüd peidan endas lugusid laevadest ja meresõitjatest"
      },
      {
        title: "HIRVE SKULPTUUR",
        clue: "Vanade piraatide legend räägib metsloomast, kellel oli neli jalga, sarved ja üks saatuslik nõrkus: uudishimu. Ühel ööl sattus ta silmitsi kapten Mustkaheksajalaga ja vaatas talle otse silma. Juba järgmisel sekundil muutus ta kiviks."
      },
      {
        title: "TAANI KUNINGA AED",
        clue: "Meid on kolm, me ei räägi ega liigu, kuid ometi jälgime kõiki, kes meist mööduvad. Me kanname rüüd, aga pole enam kloostris. Meie aed kuulub kuningale, kelle kroonilt pole päike kunagi loojunud. Leia koht, kus kolm vaikivat munka valvavad oma saladust, äkki just nemad varjavadki aarde asukohta."
      },
      {
        title: "KUNINGAKODA — LÕPP-PUNKT",
        clue: "Ärge laske end petta: kõige suuremad saladused ei peitu troonidel, vaid nende all. Otsige üles kuninglik koda, laskuge sinna, kuhu päevavalgus ei ulatu, ja valmistuge kohtuma oma saatusega."
      }
    ]
  }
};

const team = document.body.dataset.team;
const data = teamData[team];
const trail = document.getElementById("trail");
const extras = document.getElementById("extras");

if (!data || !trail) {
  console.error("Tiimi andmeid või teeraja elementi ei leitud.");
} else {
  let currentPoint = Number(
    localStorage.getItem(`${team}-currentPoint-v2`) || 0
  );

  // Need koodid tuleb tiimile Messengeris saata.
  // Muuda neid soovi korral enda valitud koodideks.
  const captainCodes = [
    "PUNKT2",
    "PUNKT3",
    "AARE",
    "LÕPP"
  ];

  function messengerButton(text = "SAADA TÕESTUS MESSENGERIS") {
    const a = document.createElement("a");
    a.className = "mapButton";
    a.href = data.messengerLink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `💬 ${text}`;
    return a;
  }

  function renderTrail() {
    trail.replaceChildren();

    // Näita alguspunkti eraldi; see ei ole üks kolmest mõistatusepunktist.
    const startCard = document.createElement("article");
    startCard.className = "card startCard";

    const startHeading = document.createElement("h3");
    startHeading.className = "pointTitle";
    startHeading.textContent = `⚓ ALGUS: ${data.start.title}`;

    const startAddress = document.createElement("p");
    startAddress.className = "taskText";
    startAddress.textContent = data.start.address;

    const startNote = document.createElement("p");
    startNote.className = "taskText";
    startNote.textContent = data.start.note;

    const routeLink = document.createElement("a");
    routeLink.className = "mapButton";
    routeLink.href = data.mapLink;
    routeLink.target = "_blank";
    routeLink.rel = "noopener noreferrer";
    routeLink.textContent = "🧭 AVA KOGU TEERADA GOOGLE MAPSIS";

    startCard.append(startHeading, startAddress, startNote, routeLink);
    trail.appendChild(startCard);

    data.checkpoints.forEach((point, index) => {
      const unlocked = index <= currentPoint;
      const completed = index < currentPoint;
      const card = document.createElement("article");

      card.className =
        `card ${!unlocked ? "locked" : ""} ` +
        `${completed ? "completed" : ""}`;

      const heading = document.createElement("h3");
      heading.className = "pointTitle";
      heading.textContent =
        `${unlocked ? "⚓" : "🔒"} ${point.title}`;

      card.appendChild(heading);

      if (!unlocked) {
        const lockedText = document.createElement("p");
        lockedText.className = "taskText";
        lockedText.textContent =
          "Lahendage eelmine punkt ja oodake kapteni kinnitust.";
        card.appendChild(lockedText);
      } else {
        const clue = document.createElement("div");
        clue.className = "clue";
        clue.textContent = `🗺️ KAPTENI VIHJE: ${point.clue}`;
        card.appendChild(clue);

        const map = document.createElement("img");
        map.className = "mapImage";
        map.src = data.mapImage;
        map.alt = `${data.name} aardekaart`;
        card.appendChild(map);

        const mapLink = document.createElement("a");
        mapLink.className = "mapButton";
        mapLink.href = data.mapLink;
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.textContent = "📍 AVA GOOGLE MAPSIS";
        card.appendChild(mapLink);

        if (completed) {
          const done = document.createElement("p");
          done.className = "message";
          done.textContent = "✅ See punkt on läbitud.";
          card.appendChild(done);
        } else {
          const instructions = document.createElement("p");
          instructions.className = "taskText";
          instructions.textContent =
            "Jõudsite kohale? Saatke oma tõestuspilt või video " +
            "tiimi Messengeri gruppi. Kapten saadab pärast kontrollimist " +
            "sinna järgmise punkti avamise koodi.";
          card.appendChild(instructions);

          card.appendChild(messengerButton());

          const unlockBox = document.createElement("div");
          unlockBox.className = "unlockBox";

          const input = document.createElement("input");
          input.placeholder = "KAPTENI KOOD";
          input.autocomplete = "off";
          input.id = `unlockCode${index}`;

          const button = document.createElement("button");
          button.className = "unlockButton";
          button.textContent = "⚓ AVA JÄRGMINE PUNKT";

          const message = document.createElement("p");
          message.className = "message";
          message.id = `unlockMessage${index}`;

          button.addEventListener("click", () => {
            const entered = input.value.trim().toUpperCase();
            const expected = captainCodes[index];

            if (entered === expected) {
              currentPoint = index + 1;

              localStorage.setItem(
                `${team}-currentPoint-v2`,
                String(currentPoint)
              );

              renderTrail();
              renderExtraTasks();

              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              message.textContent = "⚠️ Vale kood, merekoer!";
              input.value = "";
            }
          });

          unlockBox.append(input, button, message);
          card.appendChild(unlockBox);
        }
      }

      trail.appendChild(card);
    });
  }

  function renderExtraTasks() {
    if (!extras) return;

    const taskCards = extras.querySelectorAll(".extraTask");
    const finished = currentPoint >= data.checkpoints.length;

    taskCards.forEach((card, index) => {
      const existing = card.querySelector(".extraMessenger");

      if (existing) existing.remove();

      if (finished) {
        card.classList.add("locked");
        card.setAttribute("aria-disabled", "true");

        const note = document.createElement("p");
        note.className = "message extraMessenger";
        note.textContent = "🔒 Aardeni on jõutud. Lisapunktide ülesanded on suletud.";
        card.appendChild(note);
      } else {
        card.classList.remove("locked");
        card.removeAttribute("aria-disabled");

        const title =
          card.querySelector(".pointTitle")?.textContent.trim()
          || `Lisapunkt ${index + 1}`;

        const note = document.createElement("p");
        note.className = "taskText extraMessenger";
        note.textContent =
          "Kui ülesanne on tehtud, saatke pilt või video " +
          "Messengeri gruppi. Kirjutage sõnumisse ülesande nimi: " +
          title + ".";

        card.appendChild(note);

        const button = messengerButton();
        button.classList.add("extraMessenger");
        card.appendChild(button);
      }
    });
  }

  renderTrail();
  renderExtraTasks();
}