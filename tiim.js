const teamData = {
  tiim1: {
    name: "TIIM 1",
    mapImage: "assets/tiim-1-kaart.png",
    mapLink: "https://maps.app.goo.gl/h7wY4mK5Vum96ytQ7",

    // ASENDA OMA MESSENGERI GRUPI KUTSELINGIGA
    messengerLink: "SIIN_TIIM1_MESSENGERI_LINK",

    checkpoints: [
      {
        title: "VIRU VÄRAV",
        clue: "PLACEHOLDER: esimene mõistatus."
      },
      {
        title: "PUNKT 2",
        clue: "PLACEHOLDER: teine mõistatus."
      },
      {
        title: "PUNKT 3",
        clue: "PLACEHOLDER: kolmas mõistatus."
      },
      {
        title: "PUNKT 4",
        clue: "PLACEHOLDER: neljas mõistatus."
      },
      {
        title: "KUNINGAKODA KELDER",
        clue: "PLACEHOLDER: lõpliku aarde mõistatus."
      }
    ]
  },

  tiim2: {
    name: "TIIM 2",
    mapImage: "assets/tiim-2-kaart.png",
    mapLink: "https://maps.app.goo.gl/xC6VHM5YAqpepyd66",

    // ASENDA OMA MESSENGERI GRUPI KUTSELINGIGA
    messengerLink: "SIIN_TIIM2_MESSENGERI_LINK",

    checkpoints: [
      {
        title: "KLOOSTRIVÄRAV",
        clue: "PLACEHOLDER: esimene mõistatus."
      },
      {
        title: "PUNKT 2",
        clue: "PLACEHOLDER: teine mõistatus."
      },
      {
        title: "PUNKT 3",
        clue: "PLACEHOLDER: kolmas mõistatus."
      },
      {
        title: "PUNKT 4",
        clue: "PLACEHOLDER: neljas mõistatus."
      },
      {
        title: "KUNINGAKODA KELDER",
        clue: "PLACEHOLDER: lõpliku aarde mõistatus."
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
    localStorage.getItem(`${team}-currentPoint`) || 0
  );

  // Need koodid tuleb tiimile Messengeris saata.
  // Muuda neid soovi korral enda valitud koodideks.
  const captainCodes = [
    "PUNKT2",
    "PUNKT3",
    "PUNKT4",
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
                `${team}-currentPoint`,
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