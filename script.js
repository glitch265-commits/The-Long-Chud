const container = document.getElementById("personContainer");
const wowCount = document.getElementById("wowCount");
const lengthCount = document.getElementById("lengthCount");
const wowBtn = document.getElementById("wowBtn");
const secretBtn = document.getElementById("secretBtn");
const printBtn = document.getElementById("printBtn");
const toast = document.getElementById("toast");

let length = 0;
let wows = 0;
let loading = false;

function addPersonPiece() {
  const img = document.createElement("img");
  img.className = "person-piece";
  img.src = "assets/person.png";
  img.alt = "The long challenge character";
  img.loading = "lazy";

  // If the image is ever moved, this still gives a useful fallback.
  img.onerror = () => {
    img.alt = "Character image could not be loaded";
  };

  container.appendChild(img);
  length++;
  lengthCount.textContent = length;
}

function addPieces(amount = 3) {
  for (let i = 0; i < amount; i++) {
    addPersonPiece();
  }
}

function showWow(message = "WOW!") {
  wows++;
  wowCount.textContent = wows;

  toast.textContent = message;
  toast.classList.remove("show");

  // Restart the animation.
  void toast.offsetWidth;
  toast.classList.add("show");
}

wowBtn.addEventListener("click", () => showWow("WOW!"));

secretBtn.addEventListener("click", () => {
  showWow("SECRET WOW!");
  document.body.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 350 }
  );
});

printBtn.addEventListener("click", () => {
  window.print();
});

// Start with a few pieces.
addPieces(4);

// Infinite growth: when the visitor gets close to the bottom,
// add more copies of the character.
window.addEventListener("scroll", () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1200;

  if (nearBottom && !loading) {
    loading = true;
    addPieces(3);

    // Small delay prevents a rapid-fire pileup on very fast scrolling.
    setTimeout(() => {
      loading = false;
    }, 100);
  }
});
