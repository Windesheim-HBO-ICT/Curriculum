import DesktopComponent from "./desktop-navbar.js";
import MobileComponent from "./mobile-navbar.js";

class CurriculumComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.renderComponents();
  }

  connectedCallback() {
    this.debounceResize = this.debounce(this.renderComponents.bind(this), 100);
    window.addEventListener("resize", this.debounceResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.debounceResize);
  }

  /**
   * Debounce function to limit the rate at which a function can fire.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The time to wait in milliseconds.
   * @returns {Function} - The debounced function.
   */
  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Fetch resources from the provided URLs.
   * @param {Object} resources - An object where keys are resource names and values are URLs.
   * @returns {Object} - An object with the same keys but fetched data as values.
   */
  async fetchResources(resources) {
    const updatedResources = {};
    for (const [key, url] of Object.entries(resources)) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data for resource: ${key} from ${url}`
          );
        }
        const data = await response.json();
        updatedResources[key] = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    return updatedResources;
  }

  /**
   * Extracts resource attributes from the element's attributes.
   * @returns {Object} - An object where keys are resource names and values are attribute values.
   */
  getResourceAttributes() {
    const resourcesAttribute = {};
    const attributeNames = this.getAttributeNames();
    attributeNames.forEach((attributeName) => {
      if (attributeName.endsWith("-resource")) {
        const key = attributeName.replace("-resource", "");
        resourcesAttribute[key] = this.getAttribute(attributeName);
      }
    });
    return resourcesAttribute;
  }

  /**
   * Retrieves the data for the cards to be displayed in the content section.
   * @returns {Array} - An array of card data objects.
   */
  getCardsData() {
    return [
      {
        title: "SSDLC",
        description:
          "De SSDLC omvat: requirements, design, development, testing en deployment.",
        imageUrl: "/public/ssdlc.png",
        buttonUrl: "https://snyk.io/learn/secure-sdlc/",
      },
      {
        title: "HBO-I Domeinen",
        description:
          "HBO-I domeinen omvatten software engineering, infrastructuur, gebruikersinteractie, organisatieprocessen en hardware-interfacing.",
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
  }

  /**
   * Renders the appropriate component (mobile or desktop) based on the window size.
   */
  async renderComponents() {
    const resourcesAttribute = this.getResourceAttributes();
    const fetchedResources = await this.fetchResources(resourcesAttribute);
    const cardsData = this.getCardsData();
    const thresholdWidth = 900;

    if (window.innerWidth <= thresholdWidth) {
      this.renderComponent("mobile-component", fetchedResources, cardsData);
    } else {
      this.renderComponent("desktop-component", fetchedResources, cardsData);
    }
  }

  /**
   * Renders the specified component in the shadow DOM if not already rendered.
   * @param {string} componentTag - The tag name of the component to render (e.g., 'mobile-component').
   * @param {Object} resources - The resources to be passed to the component.
   * @param {Array} cardsData - The card data to be passed to the component.
   */
  renderComponent(componentTag, resources, cardsData) {
    if (!this.shadowRoot.querySelector(componentTag)) {
      this.shadowRoot.innerHTML = "";
      const component = document.createElement(componentTag);
      component.setAttribute("resources", JSON.stringify(resources));
      component.setAttribute("cards-data", JSON.stringify(cardsData));
      this.shadowRoot.appendChild(component);
    }
  }
}

customElements.define("curriculum-component", CurriculumComponent);
