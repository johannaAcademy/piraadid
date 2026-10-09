const teamData = {
  tiim1: {
    name: "TIIM 1",
    mapImage: "assets/tiim-1-kaart.png",
    mapLink: "https://maps.app.goo.gl/h7wY4mK5Vum96ytQ7",

    checkpoints: [
      {
        title: "VIRU VÄRAV",
        clue: "PLACEHOLDER: esimene mõistatus tuleb siia."
      },
      {
        title: "PUNKT 2",
        clue: "PLACEHOLDER: teine mõistatus tuleb siia."
      },
      {
        title: "PUNKT 3",
        clue: "PLACEHOLDER: kolmas mõistatus tuleb siia."
      },
      {
        title: "PUNKT 4",
        clue: "PLACEHOLDER: neljas mõistatus tuleb siia."
      },
      {
        title: "KUNINGAKODA KELDER",
        clue: "PLACEHOLDER: lõpliku aarde vihje tuleb siia."
      }
    ]
  },

  tiim2: {
    name: "TIIM 2",
    mapImage: "assets/tiim-2-kaart.png",
    mapLink: "https://maps.app.goo.gl/xC6VHM5YAqpepyd66",

    checkpoints: [
      {
        title: "KLOOSTRIVÄRAV",
        clue: "PLACEHOLDER: esimene mõistatus tuleb siia."
      },
      {
        title: "PUNKT 2",
        clue: "PLACEHOLDER: teine mõistatus tuleb siia."
      },
      {
        title: "PUNKT 3",
        clue: "PLACEHOLDER: kolmas mõistatus tuleb siia."
      },
      {
        title: "PUNKT 4",
        clue: "PLACEHOLDER: neljas mõistatus tuleb siia."
      },
      {
        title: "KUNINGAKODA KELDER",
        clue: "PLACEHOLDER: lõpliku aarde vihje tuleb siia."
      }
    ]
  }
};


// --------------------------------
// TIIMI VALIMINE
// --------------------------------

const team = document.body.dataset.team;
const data = teamData[team];


// --------------------------------
// TEERADA
// --------------------------------

const trail = document.getElementById("trail");

let currentPoint =
  Number(localStorage.getItem(`${team}-currentPoint`)) || 0;

function renderTrail(){

  trail.innerHTML = "";

  data.checkpoints.forEach((point,index)=>{

    const unlocked = index <= currentPoint;
    const completed = index < currentPoint;
    const isCurrent = index === currentPoint;

    const card = document.createElement("div");

    card.className =
      `card ${!unlocked ? "locked" : ""} ${completed ? "completed" : ""}`;

    if(!unlocked){

      card.innerHTML = `
        <div class="pointHeader">
          <div>
            <div class="pointNumber">PUNKT ${index + 1}</div>
            <div class="pointTitle">🔒 ${point.title}</div>
          </div>

          <div class="status">LUKUS</div>
        </div>

        <div class="lockNotice">
          Lahenda eelmine punkt ja saada kaptenile tõestus.
        </div>
      `;

    } else {

      card.innerHTML = `
        <div class="pointHeader">

          <div>
            <div class="pointNumber">PUNKT ${index + 1}</div>
            <div class="pointTitle">
              ${completed ? "☠️" : "⚓"} ${point.title}
            </div>
          </div>

          <div class="status">
            ${completed ? "LÄBITUD" : "AKTIIVNE"}
          </div>

        </div>

        <div class="clue">
          <strong>🗺️ KAPTENI VIHJE</strong>
          <br><br>
          ${point.clue}
        </div>

        <img
          class="mapImage"
          src="${data.mapImage}"
          alt="${data.name} aardekaart"
        >

        <a
          class="mapButton"
          href="${data.mapLink}"
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 AVA ALGUSPUNKT GOOGLE MAPSIS
        </a>

        ${
          isCurrent
          ? `
            <div class="proofForm">
<form
  action="https://formsubmit.co/jxrandmae@gmail.com"
  method="POST"
  enctype="multipart/form-data"
>

                <input
                  type="hidden"
                  name="_subject"
                  value="🏴‍☠️ ${data.name} — PUNKT ${index + 1} TÕESTUS"
                >

                <input
                  type="hidden"
                  name="_template"
                  value="table"
                >

                <input
                  type="hidden"
                  name="_captcha"
                  value="true"
                >

                <input
                  type="hidden"
                  name="_honey"
                  value=""
                >

                <input
                  type="hidden"
                  name="team"
                  value="${data.name}"
                >

                <input
                  type="hidden"
                  name="point"
                  value="${index + 1} — ${point.title}"
                >

                <label>
                  📸 Tõestuspilt
                </label>

<label>
  📸 / 🎥 Vali tõestuspilt või -video
</label>

<input
  type="file"
  name="attachment"
  accept="image/*,video/*"
  required
>

                <button
                  class="sendButton"
                  type="submit"
                >
                  ☠️ SAADA TÕESTUS KAPTENILE
                </button>

                <div
                  class="message"
                  id="proofMessage${index}"
                ></div>

              </form>

            </div>

            <div class="unlockBox">

              <div>
                🔐 <b>Kapteni kinnitus</b>
              </div>

              <p style="margin:8px 0;color:#9a917e;font-size:14px">
                Kui kapten on tõestuse heaks kiitnud,
                saad temalt järgmise punkti avamise koodi.
              </p>

              <input
                id="unlockCode${index}"
                placeholder="KAPTENI KOOD"
                autocomplete="off"
              >

              <button
                class="unlockButton"
                onclick="unlockNext(${index})"
              >
                ⚓ AVA JÄRGMINE PUNKT
              </button>

              <div
                class="message"
                id="unlockMessage${index}"
              ></div>

            </div>
          `
          : ""
        }
      `;
    }

    trail.appendChild(card);
  });

  renderFinalState();
}


// --------------------------------
// FOTO SAATMINE
// --------------------------------

function proofSent(index){

  setTimeout(()=>{

    const message =
      document.getElementById(`proofMessage${index}`);

    if(message){
      message.innerHTML =
        "📨 Tõestus saadetud kaptenile! Oota kapteni kinnitust.";
    }

  },100);

}


// --------------------------------
// JÄRGMINE PUNKT
// --------------------------------

function unlockNext(index){

  const input =
    document.getElementById(`unlockCode${index}`);

  const message =
    document.getElementById(`unlockMessage${index}`);

  const code =
    input.value.trim().toUpperCase();

  /*
    PLACEHOLDER KOODID

    Hiljem muudame need päris koodideks.
  */

  const captainCodes = {

    0: "PUNKT2",
    1: "PUNKT3",
    2: "PUNKT4",
    3: "AARE",
    4: "LÕPP"

  };

  if(code === captainCodes[index]){

    currentPoint = index + 1;

    localStorage.setItem(
      `${team}-currentPoint`,
      currentPoint
    );

    renderTrail();

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }else{

    message.textContent =
      "⚠️ Vale kood, merekoer!";

    input.value = "";

  }
}


// --------------------------------
// LÕPP-PUNKT
// --------------------------------

function renderFinalState(){

  const extras =
    document.getElementById("extras");

  if(!extras) return;

  if(currentPoint >= data.checkpoints.length){

    extras.classList.add("locked");

    extras.innerHTML = `
      <div class="card">
        <div class="lockNotice">
          🔒 <b>LISAPUNKTIDE ÜLESANDED ON SULETUD</b>
          <br><br>
          Te jõudsite aardeni.
          Nüüd enam lisapunkte koguda ei saa.
        </div>
      </div>
    `;

  }
}

renderTrail();