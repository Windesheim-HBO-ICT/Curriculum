import curriculum from "/data/architectuurlaag/se/curriculum.js";
// Functie om de boomstructuur op te bouwen
function buildTree(data, parent) {
  const ul = document.createElement("ul");
  parent.appendChild(ul);

  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.naam;
    ul.appendChild(li);

    // Controleer of het item vaardigheden heeft
    if (item.vaardigheden) {
      const vaardighedenUl = document.createElement("ul");
      li.appendChild(vaardighedenUl);
      item.vaardigheden.forEach((vaardigheid) => {
        const vaardigheidLi = document.createElement("li");
        vaardigheidLi.textContent = vaardigheid.naam;
        vaardighedenUl.appendChild(vaardigheidLi);

        // Controleer of de vaardigheid ook vaardigheden heeft
        if (vaardigheid.vaardigheden) {
          buildTree(vaardigheid.vaardigheden, vaardighedenUl); // Recursief bouwen van de subboom
        }
      });
    }

    // Controleer of het item labels (HBO-I activiteiten) heeft
    if (item.labels) {
      buildTree(item.labels, li); // Recursief bouwen van de subboom
    }
  });
}

// ik heb nu in example.html een div met id tree, maar moet een webcomponent worden.
const treeContainer = document.getElementById("tree");
buildTree(curriculum, treeContainer);
traverseTree(curriculum);
