import softwareCurriculum from "../data/architectuurlaag/software/curriculum.js";
import organisatieprocessenCurriculum from "../data/architectuurlaag/organisatieprocessen/curriculum.js";
import gebruikersinteractieCurriculum from "../data/architectuurlaag/gebruikersinteractie/curriculum.js";
import infrastructureCurriculum from "../data/architectuurlaag/infrastructuur/curriculum.js";
import hardwareInterfacingCurriculum from "../data/architectuurlaag/hardwareInterfacing/curriculum.js";
import CardComponent from "./card-component.js";
const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/css/mobile-navbar.css">
  <header>
    <div class="container">
      <input type="checkbox" name="" id="check">
      <div class="logo-container">
        <h3 class="logo">HBO-ICT Curriculum</h3>
        <select id="curriculumSelect">
        <option value="software">Software</option>
        <option value="infrastructuur">Infrastructuur</option>
        <option value="organisatieprocessen">Organisatie proccessen</option>
        <option value="hardwareinterfacing">Hardware Interfacing</option>
        <option value="gebruikersinteractie">Gebruikersinteractie</option>
    </select>
      </div>
      <div class="nav-btn"></div>
      <div class="menu-container">
        <div class="menu">
          <div></div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <section>
      <div class="overlay">
      </div>
    </section>
  </main>
`;
export default class MobileComponent extends HTMLElement {
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
  }

  loadCurriculum(curriculumName) {
    const curriculumData = this.curriculum[curriculumName];
    const navButton = this.shadowRoot.querySelector(".nav-btn");
    this.createMenu(navButton, curriculumData);
    this.createCards();
  }
  /**
   * Creates the navigation menu.
   * @param {HTMLElement} parentElement - The parent element to which the menu will be appended.
   * @param {Array} menuData - The data for the menu items.
   */
  createMenu(parentElement, menuData) {
    const navLinks = document.createElement("div");

    parentElement.innerHTML = "";
    navLinks.classList.add("nav-links");
    const ul = document.createElement("ul");

    menuData.forEach((item) => {
      const li = this.createMenuItem(item);
      ul.appendChild(li);
    });

    navLinks.appendChild(ul);
    parentElement.appendChild(navLinks);
  }

  async connectedCallback() {
    const navButton = this.shadowRoot.querySelector(".nav-btn");
    const selector = this.shadowRoot.querySelector("#curriculumSelect");

    // Listen for change event from the select element
    selector.addEventListener("change", (event) => {
      const selectedCurriculum = event.target.value;
      const navButton = this.shadowRoot.querySelector(".nav-btn");
      const curriculumData = this.curriculum[selectedCurriculum];
      this.createMenu(navButton, curriculumData);
    });

    this.createMenu(navButton, this.curriculum.software);
    this.createCards();
  }
  /**
   * Creates a menu item (list item) based on the provided item data.
   * @param {Object} item - The data for the menu item.
   * @returns {HTMLElement} - The created menu item element.
   */
  createMenuItem(item) {
    const li = document.createElement("li");
    li.classList.add("nav-link");
    const a = document.createElement("a");
    a.textContent = item.naam;
    li.appendChild(a);

    if (item.activiteiten && item.activiteiten.length > 0) {
      this.createLabels(li, item.activiteiten);
    }

    return li;
  }

  /**
   * Creates activiteiten for sub-menu items and adds click event listeners to toggle their visibility.
   * @param {HTMLElement} parentElement - The parent element to which activiteiten will be appended.
   * @param {Array} vaardigheden - The data for the sub-menu items.
   */
  createLabels(parentElement, vaardigheden) {
    const tags = document.createElement("div");
    tags.className = "activiteiten";
    vaardigheden.forEach((child) => {
      const tag = document.createElement("div");
      tag.textContent = "📂 " + child.naam;
      tag.className = "label";
      tag.addEventListener("click", () => {
        this.toggleLabels(parentElement, tag);
        this.toggleDropdown(parentElement, child.vaardigheden, 1);
      });
      tags.appendChild(tag);
    });

    parentElement.appendChild(tags);
  }

  /**
   * Toggles the active state of activiteiten and closes any open dropdowns not associated with the clicked label.
   * @param {HTMLElement} parentElement - The parent element containing activiteiten and dropdowns.
   * @param {HTMLElement} clickedLabel - The label that was clicked.
   */
  toggleLabels(parentElement, clickedLabel) {
    const allLabels = this.shadowRoot.querySelectorAll(".label");
    allLabels.forEach((label) => {
      if (label !== clickedLabel) {
        label.classList.remove("active");
      }
    });
    clickedLabel.classList.toggle("active");
    const openDropdown = parentElement.querySelector(".dropdown");
    if (openDropdown) openDropdown.remove();
  }

  /**
   * Toggles the visibility of dropdown menus based on the clicked label and closes unrelated open dropdowns.
   * @param {HTMLElement} parentElement - The parent element containing activiteiten and dropdowns.
   * @param {Array} dropdownData - The data for the dropdown items.
   * @param {number} level - The depth level of the dropdown.
   */
  toggleDropdown(parentElement, dropdownData, level) {
    const openDropdown = parentElement.querySelector(".dropdown.open");
    const clickedLabel = parentElement.querySelector(".label.active");

    if (
      openDropdown &&
      (!clickedLabel || !openDropdown.contains(clickedLabel))
    ) {
      openDropdown.style.display = "none";
      openDropdown.classList.remove("open");
    } else if (!clickedLabel) {
      const dropdownToRemove = parentElement.querySelector(".dropdown");
      if (dropdownToRemove) {
        dropdownToRemove.remove();
      }
      return;
    }

    const dropdown = parentElement.querySelector(".dropdown");
    if (!dropdown) {
      this.createDropdown(parentElement, dropdownData, level);
    } else {
      if (!dropdown.contains(clickedLabel)) {
        dropdown.style.display = "none";
        dropdown.classList.remove("open");
      }
    }
  }

  /**
   * Creates a dropdown menu for sub-menu items and appends it to the specified parent element.
   * @param {HTMLElement} parentElement - The parent element to which the dropdown will be appended.
   * @param {Array} dropdownData - The data for the dropdown items.
   * @param {number} level - The depth level of the dropdown.
   */
  createDropdown(parentElement, dropdownData, level) {
    const dropdown = this.createDropdownElement(level);

    dropdownData.forEach((item) => {
      const { li, a } = this.createDropdownLink(item, level);
      li.appendChild(a);
      this.addDropdownToggleListener(li, a, item, level);
      dropdown.appendChild(li);
    });

    parentElement.appendChild(dropdown);
  }

  /**
   * Creates a dropdown element (div) with a specific darkness level based on the menu depth.
   * @param {number} level - The depth level of the dropdown.
   * @returns {HTMLElement} - The created dropdown element.
   */
  createDropdownElement(level) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    const darknessLevel = level * 10;
    dropdown.style.setProperty(
      "--base-color",
      `rgba(0, 0, 0, 0.${darknessLevel})`
    );
    return dropdown;
  }

  /**
   * Adds a click event listener to toggle dropdown visibility for menu items with vaardigheden.
   * @param {HTMLElement} li - The list item element to which the listener will be added.
   * @param {HTMLElement} a - The anchor element within the list item.
   * @param {Object} item - The data for the menu item.
   * @param {number} level - The depth level of the dropdown.
   */
  addDropdownToggleListener(li, a, item, level) {
    if (item.vaardigheden) {
      li.addEventListener("click", (event) => {
        event.stopPropagation();
        const submenu = li.querySelector(".dropdown");
        if (!submenu || event.target.classList.contains("leaf")) {
          return;
        }
        this.handleDropdownToggle(li, a, submenu, item);
      });
      this.createDropdown(li, item.vaardigheden, level + 1);
    }
  }

  /**
   * Handles the toggling of dropdown visibility for a clicked menu item.
   * @param {HTMLElement} li - The list item element representing the clicked menu item.
   * @param {HTMLElement} a - The anchor element within the list item.
   * @param {HTMLElement} submenu - The dropdown submenu element associated with the clicked menu item.
   * @param {Object} item - The data for the clicked menu item.
   */
  handleDropdownToggle(li, a, submenu, item) {
    const parentUl = li.parentNode;
    const isOpen = li.classList.toggle("open");
    a.textContent = isOpen ? "▼ " + item.naam : "▶ " + item.naam;
    this.closeSiblings(parentUl, li);
    if (submenu) submenu.style.display = isOpen ? "block" : "none";
  }

  /**
   * Closes any open sibling dropdown menus when a new dropdown is opened.
   * @param {HTMLElement} parentUl - The parent ul element containing the list items.
   * @param {HTMLElement} currentLi - The currently clicked list item element.
   */
  closeSiblings(parentUl, currentLi) {
    const siblings = parentUl.querySelectorAll(".dropdown-link.open");
    siblings.forEach((sibling) => {
      if (sibling !== currentLi) {
        sibling.classList.remove("open");
        const siblingSubmenu = sibling.querySelector(".dropdown");
        if (siblingSubmenu) siblingSubmenu.style.display = "none";
        sibling.querySelector("a").textContent =
          "▶ " + sibling.querySelector("a").textContent.substring(2);
      }
    });
  }

  /**
   * Creates a link (anchor) element for a menu item with appropriate styling and text content.
   * @param {Object} item - The data for the menu item.
   * @param {number} level - The depth level of the menu item.
   * @returns {Object} - An object containing the created list item and anchor elements.
   */
  createDropdownLink(item, level) {
    const li = document.createElement("li");
    li.classList.add("dropdown-link");
    const a = document.createElement("a");
    a.style.marginLeft = `${level * 10}px`;
    if (!item.vaardigheden) {
      li.classList.add("leaf");
      a.classList.add("leaf");
    }
    a.textContent = item.vaardigheden ? "▶ " + item.naam : "◆ " + item.naam;
    return { li, a };
  }

  /**
   * Retrieves the curriculum data asynchronously.
   * @returns {Promise<Array>} - A promise that resolves to the curriculum data.
   */
  async getCurriculum() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const architectuurlaag = urlParams.get("architectuurlaag");
      const moduleUrl = `../data/architectuurlaag/${architectuurlaag}/curriculum.js`;
      const module = await import(moduleUrl);
      return module.default;
    } catch (error) {
      console.error("Error loading module:", error);
    }
  }

  /**
   * Creates the card components and appends them to the main content area.
   */
  createCards() {
    const contentMiddle = this.shadowRoot.querySelector("section .overlay");
    contentMiddle.innerHTML = "";
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

customElements.define("mobile-component", MobileComponent);
