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

  async renderComponents() {
    this.shadowRoot.innerHTML = "";

    const resourcesAttribute = {};
    const attributeNames = this.getAttributeNames();
    attributeNames.forEach((attributeName) => {
      if (attributeName.endsWith("-resource")) {
        const key = attributeName.replace("-resource", "");
        const value = this.getAttribute(attributeName);
        resourcesAttribute[key] = value;
      }
    });

    const fetchedResources = await this.fetchResources(resourcesAttribute);
    this.shadowRoot.innerHTML = "";
    if (window.innerWidth < 900) {
      const mobileComponent = document.createElement("mobile-component");
      mobileComponent.setAttribute(
        "resources",
        JSON.stringify(fetchedResources)
      );
      this.shadowRoot.appendChild(mobileComponent);
    } else {
      const desktopComponent = document.createElement("desktop-component");
      desktopComponent.setAttribute(
        "resources",
        JSON.stringify(fetchedResources)
      );
      this.shadowRoot.appendChild(desktopComponent);
    }
  }
}
customElements.define("curriculum-component", CurriculumComponent);
