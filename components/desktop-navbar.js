import CardComponent from "./card-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/css/desktop-navbar.css">
   

    <div class="main">
    <div class="navbar" id="navbar">
        <div class="name-container">
            <div class="brand">HBO-ICT Curriculum</div>
            <select id="curriculumSelect"></select>
        </div>
        <ul class="tabs" id="tabs"></ul>
    </div>
    <div class="content" id="content">
        <div class="content-top"> 
            <div class="ssdlc-fase"></div>
            <div class="label"><div class="hbo-i-activiteit"></div></div>
        </div>
        <div class="content-middle"></div>
      
    </div>
    <div class="cards" id="cards"></div>
    </div>
`;
export default class DesktopComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.curriculum = {};
    this.initEventListeners();
  }

  connectedCallback() {
    this.loadResources();
  }
  /**
   * Sets up initial event listeners for the component.
   */
  initEventListeners() {
    this.shadowRoot
      .querySelector("#curriculumSelect")
      .addEventListener("change", (event) => {
        this.handleCurriculumChange(event.target.value);
      });
    this.shadowRoot.querySelector(".brand").addEventListener("click", () => {
      this.showCards();
    });
  }
  /**
   * Loads resources from the element's attributes.
   * Parses the resources and initializes the curriculum data.
   */
  loadResources() {
    const resourcesAttr = this.getAttribute("resources");
    if (resourcesAttr) {
      this.curriculum = JSON.parse(resourcesAttr);
      const initialCurriculum = Object.keys(this.curriculum)[0];
      this.loadCurriculum(initialCurriculum);
      this.buildSelectOptions(Object.keys(this.curriculum));
    } else {
      console.error("No resources attribute provided.");
    }
  }
  /**
   * Handles changes to the selected curriculum.
   * @param {string} curriculumName - The name of the selected curriculum.
   */
  handleCurriculumChange(curriculumName) {
    const content = this.shadowRoot.querySelector(".content");
    if (content.classList.contains("show")) content.classList.remove("show");
    this.loadCurriculum(curriculumName);
    this.showCards();
  }
  /**
   * Loads the specified curriculum and updates the view.
   * @param {string} curriculumName - The name of the curriculum to load.
   */
  loadCurriculum(curriculumName) {
    const curriculumData = this.curriculum[curriculumName];
    this.buildHeader(curriculumData);

    if (this.hasAttribute("cards-data"))
      this.buildContent(JSON.parse(this.getAttribute("cards-data")));
  }
  /**
   * Builds the header tabs based on the curriculum data.
   * @param {Object} curriculum - The curriculum data to display in the header.
   */
  buildHeader(curriculum) {
    const tabsContainer = this.shadowRoot.getElementById("tabs");
    tabsContainer.innerHTML = "";
    if (curriculum) {
      curriculum.forEach((item) => {
        const tab = this.createTab(item);
        tabsContainer.appendChild(tab);
      });
    }
  }
  /**
   * Creates a tab element for the given curriculum item.
   * @param {Object} item - The curriculum item to create a tab for.
   * @returns {HTMLElement} - The created tab element.
   */
  createTab(item) {
    const tab = document.createElement("li");
    tab.classList.add("tab");
    tab.textContent = item.naam;
    tab.setAttribute("data-color", item.kleur);

    const dropdown = document.createElement("ul");
    dropdown.classList.add("dropdown");
    item.activiteiten?.forEach((label) => {
      const dropdownItem = this.createDropdownItem(item, label);
      dropdown.appendChild(dropdownItem);
    });

    tab.appendChild(dropdown);
    return tab;
  }
  /**
   * Creates a dropdown item for the given label.
   * @param {Object} item - The curriculum item containing the label.
   * @param {Object} label - The label to create a dropdown item for.
   * @returns {HTMLElement} - The created dropdown item element.
   */
  createDropdownItem(item, label) {
    const dropdownItem = document.createElement("li");
    dropdownItem.textContent = label.naam;
    dropdownItem.addEventListener("click", (event) => {
      this.showTree(item, label, event);
    });
    return dropdownItem;
  }
  /**
   * Builds the select options for the curriculum dropdown.
   * @param {Array} options - The options to add to the select dropdown.
   */
  buildSelectOptions(options) {
    const select = this.shadowRoot.querySelector("#curriculumSelect");
    select.innerHTML = "";
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
  }
  /**
   * Displays the tree structure for the selected curriculum item and label.
   * @param {Object} item - The curriculum item.
   * @param {Object} label - The label within the curriculum item.
   * @param {Event} event - The event that triggered this method.
   */
  showTree(item, label, event) {
    this.updateContentTop(item.naam, label.naam);
    this.addVaardigheden(label.vaardigheden || []);
    this.setActiveTab(event.target.closest(".tab"));
  }

  /**
   * Updates the top part of the content area with the given item and label names.
   * @param {string} itemName - The name of the curriculum item.
   * @param {string} labelName - The name of the label.
   */
  updateContentTop(itemName, labelName) {
    this.shadowRoot.querySelector(".ssdlc-fase").textContent = itemName;
    this.shadowRoot.querySelector(".hbo-i-activiteit").textContent = labelName;
  }
  /**
   * Adds the vaardigheden (skills) to the content middle section.
   * @param {Array} vaardigheden - The vaardigheden to add.
   */
  addV;
  addVaardigheden(vaardigheden) {
    const contentMiddle = this.shadowRoot.querySelector(".content-middle");
    contentMiddle.innerHTML = "";
    this.buildTree(vaardigheden, contentMiddle);
  }
  /**
   * Builds a tree structure for the given data and appends it to the parent element.
   * @param {Array} data - The data to build the tree from.
   * @param {HTMLElement} parent - The parent element to append the tree to.
   * @param {boolean} [isChild=false] - Indicates if the current level is a child level.
   */
  buildTree(data, parent, isChild = false) {
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    parent.appendChild(ul);

    data.forEach((item) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const label = document.createElement("label");
      label.textContent = item.naam;

      // Check if the vaardigheid has a URL
      if (item.link) {
        // Make the cursor pointer if the vaardigheid has a URL
        label.style.cursor = "pointer";

        // Add click event listener to the label
        label.addEventListener("click", () => {
          window.location.href = item.link;
        });
      }

      li.appendChild(label);
      if (item.vaardigheden) {
        this.addSubtreeToggle(li, label, item.vaardigheden);
      } else {
        this.addChildIcon(label);
      }
    });
  }

  /**
   * Adds a toggle button to a tree node that can expand or collapse its children.
   * @param {HTMLElement} li - The tree node element.
   * @param {HTMLElement} label - The label element of the tree node.
   * @param {Array} vaardigheden - The children of the tree node.
   */
  addSubtreeToggle(li, label, vaardigheden) {
    const toggleIcon = document.createElement("span");
    toggleIcon.textContent = "▼";
    toggleIcon.classList.add("toggle-icon");
    label.insertBefore(toggleIcon, label.firstChild);

    label.addEventListener("click", () => this.toggleSubtree(li));
    label.classList.add("active-vaardigheid");

    const subtree = document.createElement("ul");
    subtree.style.display = "block";
    li.appendChild(subtree);

    this.buildTree(vaardigheden, subtree, true);
  }
  /**
   * Adds an icon to a tree node that indicates it has no children.
   * @param {HTMLElement} label - The label element of the tree node.
   */
  addChildIcon(label) {
    const childIcon = document.createElement("span");
    childIcon.textContent = "◆";
    childIcon.style.marginRight = "5px";
    label.insertBefore(childIcon, label.firstChild);
  }
  /**
   * Toggles the visibility of a subtree within a tree node.
   * @param {HTMLElement} parentNode - The parent tree node element.
   */
  toggleSubtree(parentNode) {
    const subtree = parentNode.querySelector("ul");
    if (subtree) {
      const isOpen = subtree.style.display === "block";
      subtree.style.display = isOpen ? "none" : "block";
      parentNode.querySelector(".toggle-icon").textContent = isOpen ? "▶" : "▼";
      parentNode
        .querySelector("label")
        .classList.toggle("active-vaardigheid", !isOpen);
    }
  }
  /**
   * Sets the clicked tab as active and updates the content area background color.
   * @param {HTMLElement} clickedTab - The clicked tab element.
   */
  setActiveTab(clickedTab) {
    const cards = this.shadowRoot.querySelector(".cards");
    if (!cards.classList.contains("hide")) cards.classList.add("hide");
    const tabs = this.shadowRoot.querySelectorAll(".tab");
    const content = this.shadowRoot.querySelector(".content");
    if (!content.classList.contains("show")) content.classList.add("show");

    tabs.forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");

    const color = clickedTab.getAttribute("data-color");
    this.shadowRoot.querySelector(".content-top").style.backgroundColor = color;
  }

  /**
   * Toggles the visibility of the content area.
   */
  showCards() {
    const content = this.shadowRoot.querySelector("#content");
    if (content.classList.contains("show")) content.classList.remove("show");
    const cards = this.shadowRoot.querySelector(".cards");
    if (cards.classList.contains("hide")) cards.classList.remove("hide");
  }
  /**
   * Builds the content section with cards based on the card data.
   * @param {Array} cardsData - The card data to use.
   */
  buildContent(cardsData) {
    this.shadowRoot.querySelector(".cards").innerHTML = "";

    cardsData.forEach((data) => {
      const card = document.createElement("card-component");
      card.setAttribute("data", JSON.stringify(data));
      this.shadowRoot.querySelector(".cards").appendChild(card);
    });
  }
}

customElements.define("desktop-component", DesktopComponent);
