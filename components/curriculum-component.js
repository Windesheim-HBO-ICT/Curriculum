import DesktopComponent from "./desktop-navbar.js";
import MobileComponent from "./mobile-navbar.js";

class CurriculumComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.renderComponents();
  }

  connectedCallback() {
    window.addEventListener("resize", () => {
      this.renderComponents();
    });
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
          throw new Error(`Failed to fetch data for resource: ${key}`);
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
   * Renders the appropriate component (mobile or desktop) based on the window size.
   */
  async renderComponents() {
    const resourcesAttribute = this.getResourceAttributes();
    const fetchedResources = await this.fetchResources(resourcesAttribute);
    const thresholdWidth = 900;

    if (window.innerWidth <= thresholdWidth) {
      this.renderComponent("mobile-component", fetchedResources);
    } else {
      this.renderComponent("desktop-component", fetchedResources);
    }
  }
  /**
   * Renders the specified component in the shadow DOM if not already rendered.
   * @param {string} componentTag - The tag name of the component to render (e.g., 'mobile-component').
   * @param {Object} resources - The resources to be passed to the component.
   */
  renderComponent(componentTag, resources) {
    if (!this.shadowRoot.querySelector(componentTag)) {
      this.shadowRoot.innerHTML = "";
      const component = document.createElement(componentTag);
      component.setAttribute("resources", JSON.stringify(resources));
      this.shadowRoot.appendChild(component);
    }
  }
}

customElements.define("curriculum-component", CurriculumComponent);
