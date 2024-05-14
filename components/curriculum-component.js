import DesktopComponent from "./desktop-navbar.js";
import MobileComponent from "./mobile-navbar.js";

class CurriculumComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    window.addEventListener("resize", () => {
      // Check if the screen width passes the threshold (1000px)
      if (window.innerWidth < 900 && !this.isMobileRendered) {
        this.renderMobileComponent();
      } else if (window.innerWidth >= 1000 && !this.isDesktopRendered) {
        this.renderDesktopComponent();
      }
    });

    // Initial render based on screen width
    if (window.innerWidth < 1000) {
      this.renderMobileComponent();
    } else {
      this.renderDesktopComponent();
    }
  }

  renderMobileComponent() {
    this.shadowRoot.innerHTML = ""; // Clear the shadow DOM
    const mobileComponent = document.createElement("mobile-component");
    this.shadowRoot.appendChild(mobileComponent);
    this.isMobileRendered = true;
    this.isDesktopRendered = false;
  }

  renderDesktopComponent() {
    this.shadowRoot.innerHTML = ""; // Clear the shadow DOM
    const desktopComponent = document.createElement("desktop-component");
    this.shadowRoot.appendChild(desktopComponent);
    this.isMobileRendered = false;
    this.isDesktopRendered = true;
  }
}

customElements.define("curriculum-component", CurriculumComponent);
