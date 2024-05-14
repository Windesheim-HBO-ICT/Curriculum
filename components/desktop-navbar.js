import curriculum from "../data/architectuurlaag/se/curriculum.js";

const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/css/style.css">
  <div class="navbar" id="navbar">
      <div class="brand">HBO-ICT Curriculum</div>
      <ul class="tabs" id="tabs"></ul>
    </div>
 <div class="content" id="content">
  <div class="content-top"> 
    <div class="ssdlc-fase"> </div>
    <div class="label"> <div class="hbo-i-activiteit"></div> </div>
  </div>
  <div class="content-middle"> </div>
  <div class="content-bottom"> </div>
 </div>
`;

export default class DesktopComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.buildHeader();
  }

  buildHeader() {
    const tabsContainer = this.shadowRoot.getElementById("tabs");
    curriculum.forEach((item) => {
      const tab = document.createElement("li");
      tab.classList.add("tab");
      tab.textContent = item.naam;
      tabsContainer.appendChild(tab);

      const dropdown = document.createElement("ul");
      dropdown.classList.add("dropdown");
      item.labels.forEach((label) => {
        const dropdownItem = document.createElement("li");
        dropdownItem.textContent = label.naam;
        dropdown.appendChild(dropdownItem);
        dropdownItem.addEventListener("click", (event) => {
          this.showTree(item, label, event);
        });
      });
      tab.appendChild(dropdown);
    });
  }

  showTree(item, label, event) {
    const ssdlcFaseElement = this.shadowRoot.querySelector(".ssdlc-fase");
    const hboIActiviteitElement =
      this.shadowRoot.querySelector(".hbo-i-activiteit");
    ssdlcFaseElement.textContent = item.naam;
    hboIActiviteitElement.textContent = label.naam;

    // Voeg de vaardighedenboom toe aan content-middle
    const vaardigheden = label.vaardigheden || []; // Controleer of vaardigheden aanwezig zijn
    this.addVaardigheden(vaardigheden);

    const content = this.shadowRoot.getElementById("content");
    const clickedTab = event.target.closest(".tab");
    this.setActiveTab(clickedTab);
  }

  addVaardigheden(vaardigheden) {
    const contentMiddle = this.shadowRoot.querySelector(".content-middle");

    // Leeg de inhoud van content-middle
    contentMiddle.innerHTML = "";

    // Bouw de boomstructuur van de vaardigheden en voeg deze toe aan content-middle
    this.buildTree(vaardigheden, contentMiddle);
  }

  buildTree(data, parent, isChild = false) {
    const ul = document.createElement("ul");
    parent.appendChild(ul);
    ul.style.listStyleType = "none";

    data.forEach((item) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const label = document.createElement("label");
      label.textContent = item.naam;
      li.appendChild(label);

      if (item.vaardigheden) {
        const toggleIcon = document.createElement("span");
        toggleIcon.textContent = "▶";
        toggleIcon.classList.add("toggle-icon");
        label.insertBefore(toggleIcon, label.firstChild);

        label.addEventListener("click", () => this.toggleSubtree(li));

        // Hier zetten we alle subbomen op display: none
        const subtree = document.createElement("ul");
        li.appendChild(subtree);
        subtree.style.display = "none";

        this.buildTree(item.vaardigheden, subtree, true);
      } else {
        const childIcon = document.createElement("span");
        childIcon.textContent = "◆"; // Hier kun je het pictogram voor kinderen aanpassen, bijvoorbeeld een sterretje
        childIcon.style.marginRight = "5px";
        label.insertBefore(childIcon, label.firstChild);
      }
    });
  }

  toggleSubtree(parentNode) {
    const subtree = parentNode.querySelector("ul");
    if (subtree) {
      const isOpen = subtree.style.display === "block";
      subtree.style.display = isOpen ? "none" : "block";
      const toggleIcon = parentNode.querySelector(".toggle-icon");
      toggleIcon.textContent = isOpen ? "▶" : "▼";
      const label = parentNode.querySelector("label");
      if (isOpen) {
        if (label.classList.contains("active-vaardigheid"))
          label.classList.remove("active-vaardigheid");
        console.log("add");
      } else {
        label.classList.add("active-vaardigheid");
      }
    }
  }

  setActiveTab(clickedTab) {
    const tabs = this.shadowRoot.querySelectorAll(".tab");
    const content = this.shadowRoot.querySelector(".content");
    if (!content.classList.contains("show")) content.classList.add("show");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    clickedTab.classList.add("active");
  }
}

customElements.define("desktop-component", DesktopComponent);
