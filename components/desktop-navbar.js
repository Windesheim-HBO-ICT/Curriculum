import softwareCurriculum from "../data/architectuurlaag/software/curriculum.js";
import organisatieprocessenCurriculum from "../data/architectuurlaag/organisatieprocessen/curriculum.js";
import gebruikersinteractieCurriculum from "../data/architectuurlaag/gebruikersinteractie/curriculum.js";
import infrastructureCurriculum from "../data/architectuurlaag/infrastructuur/curriculum.js";
import hardwareInterfacingCurriculum from "../data/architectuurlaag/hardwareInterfacing/curriculum.js";
import CardComponent from "./card-component.js";
const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/css/desktop-navbar.css">
    <div class="navbar" id="navbar">
    <div class="name-container">
        <div class="brand">HBO-ICT Curriculum</div>
        <select id="curriculumSelect">
            <option value="software">Software</option>
            <option value="infrastructuur">Infrastructuur</option>
            <option value="organisatieprocessen">Organisatie proccessen</option>
            <option value="hardwareinterfacing">Hardware Interfacing</option>
            <option value="gebruikersinteractie">Gebruikersinteractie</option>
            
        </select>
        </div>
        <ul class="tabs" id="tabs"></ul>
    </div>
    <div class="content" id="content">
        <div class="content-top"> 
            <div class="ssdlc-fase"> </div>
            <div class="label"> <div class="hbo-i-activiteit"></div> </div>
        </div>
        <div class="content-middle"></div>
        <div class="content-bottom"></div>
    </div>
    <div class="cards" id="cards"></div>
`;
export default class DesktopComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.curriculum = {
      software: softwareCurriculum,
      infrastructuur: infrastructureCurriculum,
      organisatieprocessen: organisatieprocessenCurriculum,
      hardwareinterfacing: hardwareInterfacingCurriculum,
      gebruikersinteractie: gebruikersinteractieCurriculum,
    };

    this.shadowRoot
      .querySelector("#curriculumSelect")
      .addEventListener("change", (event) => {
        const content = this.shadowRoot.querySelector(".content");
        if (content.classList.contains("show"))
          content.classList.remove("show");
        this.loadCurriculum(event.target.value);
      });
  }

  connectedCallback() {
    this.loadCurriculum(Object.keys(this.curriculum)[0]);
  }

  loadCurriculum(curriculumName) {
    const curriculumData = this.curriculum[curriculumName];
    this.buildHeader(curriculumData);
    this.buildContent(curriculumData);
  }

  buildHeader(curriculum) {
    const tabsContainer = this.shadowRoot.getElementById("tabs");
    tabsContainer.innerHTML = "";
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

    const vaardigheden = label.vaardigheden || [];
    this.addVaardigheden(vaardigheden);

    const content = this.shadowRoot.getElementById("content");
    const clickedTab = event.target.closest(".tab");
    this.setActiveTab(clickedTab);
  }

  addVaardigheden(vaardigheden) {
    const contentMiddle = this.shadowRoot.querySelector(".content-middle");
    contentMiddle.innerHTML = "";

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

        const subtree = document.createElement("ul");
        li.appendChild(subtree);
        subtree.style.display = "none";

        this.buildTree(item.vaardigheden, subtree, true);
      } else {
        const childIcon = document.createElement("span");
        childIcon.textContent = "◆";
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

  buildContent(curriculum) {
    const contentMiddle = this.shadowRoot.querySelector(".cards");
    contentMiddle.innerHTML = "";
    const content = this.shadowRoot.querySelector("#content");
    this.shadowRoot.querySelector(".brand").addEventListener("click", () => {
      if (content.classList.contains("show")) content.classList.remove("show");
    });
    const cardsData = [
      {
        title: "SSDLC",
        description: "Korte uitleg van SSDLC",
        imageUrl: "/public/ssdlc.png",
        buttonUrl: "https://snyk.io/learn/secure-sdlc/",
      },
      {
        title: "HBO-I Domeinen",
        description: "Korte beschrijving van HBO-I Domeinen",
        imageUrl: "/public/hboi.png",
        buttonUrl: "https://www.hbo-i.nl/publicaties-domeinbeschrijving",
      },
      {
        title: "Curriculum GitHub",
        description:
          "Opensource project voor Windesheim door Windesheim studenten.",
        imageUrl: "/public/windesheim-logo.png",
        buttonUrl: "https://github.com/Windesheim-HBO-ICT/Curriculum",
      },
    ];

    cardsData.forEach((data) => {
      const card = document.createElement("card-component");
      card.setAttribute("data", JSON.stringify(data));
      contentMiddle.appendChild(card);
    });
  }
}

customElements.define("desktop-component", DesktopComponent);
