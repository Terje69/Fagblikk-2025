
function showPage(id) {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function goBack() {
  showPage("main");
}

function incrementCounter() {
  let count = localStorage.getItem("engeCount") || 0;
  count++;
  localStorage.setItem("engeCount", count);
  document.getElementById("engeCount").innerText = count;
}

const beers = [
  "Westvleteren 12",
  "Chimay Blue",
  "Rochefort 10",
  "Duvel",
  "Orval",
  "Westmalle Dubbel",
  "Jupiler",
  "Hoegaarden",
  "Leffe",
  "Tripel Karmeliet"
];

function renderChecklist() {
  const list = document.getElementById("beerChecklist");
  list.innerHTML = "";
  beers.forEach((beer, i) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "beer_" + i;
    checkbox.checked = localStorage.getItem("beer_" + i) === "true";
    checkbox.onchange = () => {
      localStorage.setItem("beer_" + i, checkbox.checked);
    };
    li.appendChild(checkbox);
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerText = " " + beer;
    li.appendChild(label);
    list.appendChild(li);
  });
}

renderChecklist();
