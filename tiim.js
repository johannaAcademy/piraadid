const teamData = {
  tiim1: {
    name: "TIIM 1",
    start: {
      title: "PIKK HERMANN",
      address: "Peate asuma Pika Hermani torni juures",
      note: "Esimene mõistatus juhatab teid järgmisse sihtkohta."
    },
    messengerLink: "SIIN_TIIM1_MESSENGERI_LINK",
    checkpoints: [
      {
        location: "Taani Kuninga aed",
        clue: "Meid on kolm, me ei räägi ega liigu, meil pole nägu, kuid ometi jälgime kõiki, kes meist mööduvad. Me kanname rüüd, aga pole enam kloostris. Meie aed kuulub kuningale. Leia koht, kus valvame oma saladust."
      },
{
  location: "Beer House",
  clue: "Bravuursed piraadid, nüüd algab uus jaht,\n" +
    "Ees ootab teid koht, kus kuldne on vaht.\n" +
    "Ei ole see laev ega mereavarus,\n" +
    "Rohkem on siin tähtis janu kustutus.\n" +
    "Hoidke nüüd silmad ja meeled kõik lahti,\n" +
    "Otsige kõrtsi, kus vahutab vaati.\n" +
    "Uhked mereröövlid, astuge sisse,\n" +
    "Sisse astudes baaridaamile andke teada,\n" +
    "Et „ÜKS MEREMEHE KEELEKASTE, PALUN!” janu peletada aitab!\n\n" +
    "PS! Soovi korral saate seal retkest puhata ja tualetti kasutada, kuid pidage meeles, et aardeni esimesena jõudev tiim saab rohkem punkte."
}
      {
        location: "Hirve skulptuur",
        clue: "Vanade piraatide legend räägib metsloomast, kellel oli neli jalga, sarved ja üks saatuslik nõrkus: uudishimu. Ühel ööl sattus ta silmitsi kapten Mustkaheksajalaga ja vaatas talle otse silma. Juba järgmisel sekundil muutus ta kiviks."
      },
      {
        location: "Paks Margareeta (Eesti Meremuuseum)",
        clue: "Kunagi kaitsesin linna nende eest, kes tulid merelt, nüüd peidan endas lugusid laevadest ja meresõitjatest. Ma olen nii pirakas, et isegi muuseum mahub mu sisse ära."
      },
      {
        location: "KUNINGAKODA",
        clue: "Ärge laske end petta: kõige suuremad saladused ei peitu troonidel, vaid nende all. Otsige üles kuninglik koda, laskuge sinna, kuhu päevavalgus ei ulatu, ja valmistuge kohtuma oma saatusega."
      }
    ]
  },

  tiim2: {
    name: "TIIM 2",
    start: {
      title: "KLOOSTRIVÄRAV",
      address: "Gümnaasiumi tn 1, Tallinn",
      note: "See on teie alguspunkt. Esimene mõistatus juhatab teid järgmisse sihtkohta."
    },
    messengerLink: "SIIN_TIIM2_MESSENGERI_LINK",
    checkpoints: [
      {
        location: "Paks Margareeta (Eesti Meremuuseum)",
        clue: "Ma olen nii paks, et isegi suur muuseum mahub mu sisse ära. Kunagi kaitsesin linna nende eest, kes tulid merelt, nüüd peidan endas lugusid laevadest ja meresõitjatest."
      },
      {
        location: "Beer House",
        clue: "Järgmine peatus on Beer House. Öelge baaridaamile kapteni salasõna ja teid teenindatakse. Joogid selguvad kohapeal. Soovi korral saate siin retkest puhata ja tualetti kasutada. Pidage meeles: aardeni esimesena jõudev tiim saab rohkem punkte."
      },
      {
        location: "Hirve skulptuur",
        clue: "Vanade piraatide legend räägib metsloomast, kellel oli neli jalga, sarved ja üks saatuslik nõrkus: uudishimu. Ühel ööl sattus ta silmitsi kapten Mustkaheksajalaga ja vaatas talle otse silma. Juba järgmisel sekundil muutus ta kiviks."
      },
      {
        location: "Taani Kuninga aed",
        clue: "Meid on kolm, me ei räägi ega liigu, kuid ometi jälgime kõiki, kes meist mööduvad. Me kanname rüüd, aga pole enam kloostris. Meie aed kuulub kuningale, kelle kroonilt pole päike kunagi loojunud. Leia koht, kus kolm vaikivat munka valvavad oma saladust, äkki just nemad varjavadki aarde asukohta."
      },
      {
        location: "KUNINGAKODA",
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
  // Uus võtmeversioon alustab muudetud teekonna puhtalt lehelt.
  let currentPoint = Number(
    localStorage.getItem(`${team}-currentPoint-v4`) || 0
  );

  // Kapten saadab koodi alles pärast tõestuspildi või video kontrollimist.
  const captainCodes = ["AUK TEKIL", "BANAAN", "KOMPASS", "TUULEHAIS", "EHE PIRАAT"];

  function messengerButton(text = "SAADA TÕESTUS MESSENGERIS") {
    const a = document.createElement("a");
    a.className = "actionButton";
    a.href = data.messengerLink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = `💬 ${text}`;

    if (data.messengerLink.startsWith("https://")) {
      return a;
    }

    a.removeAttribute("href");
    a.textContent = "💬 Lisa siia Messengeri grupi link";
    a.style.opacity = "0.7";
    return a;
  }

  function renderTrail() {
    trail.replaceChildren();

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

    startCard.append(startHeading, startAddress, startNote);
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
      heading.textContent = unlocked
        ? `⚓ ${point.location === "Beer House" ? "Beer House" : index === data.checkpoints.length - 1 ? "LÕPP-MÕISTATUS" : `MÕISTATUS ${index + 1}`}`
        : `🔒 MÕISTATUS ${index + 1}`;
      card.appendChild(heading);

      if (!unlocked) {
        const lockedText = document.createElement("p");
        lockedText.className = "taskText";
        lockedText.textContent =
          "Lahendage eelmine punkt, saatke kaptenile tõestus ja oodake avamiskoodi.";
        card.appendChild(lockedText);
      } else {
        const clue = document.createElement("div");
        clue.className = "clue";
                card.appendChild(clue);
                  clue.textContent = `🗺️ KAPTENI VIHJE: ${point.clue}`;
        if (completed) {
          const done = document.createElement("p");
          done.className = "message";
          done.textContent = "✅ See punkt on läbitud.";
          card.appendChild(done);
        } else {
          const instructions = document.createElement("p");
          instructions.className = "taskText";

          instructions.textContent =
            "Arvake mõistatuse järgi täpne asukoht ja minge sinna. " +
            "Kohale jõudes saatke tõestuspilt või video tiimi Messengeri gruppi, tiimiliikmed peavad peal olema. " +
            "Kapten saadab pärast kontrollimist järgmise punkti avamise koodi.";
          card.appendChild(instructions);

          card.appendChild(messengerButton());

          const unlockBox = document.createElement("div");
          unlockBox.className = "unlockBox";

          const input = document.createElement("input");
          input.placeholder = "KAPTENI KOOD";
          input.autocomplete = "off";
          input.autocapitalize = "characters";
          input.id = `unlockCode${index}`;

          const button = document.createElement("button");
          button.className = "unlockButton";
          button.type = "button";
          button.textContent = index === data.checkpoints.length - 1 ? "🏴‍☠️ LÕPETA MÄNG" : "⚓ AVA JÄRGMINE MÕISTATUS";

          const message = document.createElement("p");
          message.className = "message";
          message.id = `unlockMessage${index}`;

          button.addEventListener("click", () => {
            const entered = input.value.trim().toUpperCase();
            const expected = captainCodes[index];

            if (entered === expected) {
              currentPoint = index + 1;
              localStorage.setItem(`${team}-currentPoint-v4`, String(currentPoint));
              renderTrail();
              renderExtraTasks();
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              message.textContent = "⚠️ Vale kood, merekoer!";
              input.value = "";
            }
          });

          input.addEventListener("keydown", event => {
            if (event.key === "Enter") button.click();
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
      card.querySelectorAll(".extraMessenger").forEach(el => el.remove());

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
          card.querySelector(".pointTitle")?.textContent.trim() ||
          `Lisapunkt ${index + 1}`;

        const note = document.createElement("p");
        note.className = "taskText extraMessenger";
        note.textContent =
          "Kui ülesanne on tehtud, saatke pilt või video Messengeri gruppi. " +
          "Kirjutage sõnumisse ülesande nimi: " + title + ".";

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
