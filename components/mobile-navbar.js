import { menu } from "../data/temp-curriculum.js";
class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/mobile-navbar.css">
      <header>
        <div class="container">
          <input type="checkbox" name="" id="check">
          <div class="logo-container">
            <h3 class="logo">Curriculum</h3>
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
          <div class="overlay"></div>
        </section>
      </main>
    `;
  }

  connectedCallback() {
    const menuData = menu;
    const navButton = this.shadowRoot.querySelector(".nav-btn");
    this.createMenu(navButton, menuData);
  }

  createMenu(parentElement, menuData) {
    const navLinks = document.createElement("div");
    navLinks.classList.add("nav-links");
    const ul = document.createElement("ul");

    menuData.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("nav-link");
      const a = document.createElement("a");
      a.textContent = "▶ " + item.name;
      li.appendChild(a);
      li.addEventListener("click", () => {
        this.toggleDropdown(li, a, item);
      });

      if (item.children) {
        this.createDropdown(li, item.children, 1);
      }
      ul.appendChild(li);
    });

    navLinks.appendChild(ul);
    parentElement.appendChild(navLinks);
  }

  toggleDropdown(li, a, item) {
    const isOpen = li.classList.toggle("open");
    a.textContent = isOpen ? "▼ " + item.name : "▶ " + item.name;

    const dropdown = li.querySelector(".dropdown");
    if (dropdown) {
      dropdown.style.display = isOpen ? "block" : "none";
    }

    // Close siblings' dropdowns
    const siblings = Array.from(li.parentElement.children).filter(
      (child) => child !== li
    );
    siblings.forEach((sibling) => {
      sibling.classList.remove("open");
      const siblingA = sibling.querySelector("a");
      siblingA.textContent = "▶ " + siblingA.textContent.slice(2);
      const siblingDropdown = sibling.querySelector(".dropdown");
      if (siblingDropdown) siblingDropdown.style.display = "none";
    });
  }

  createDropdown(parentElement, dropdownData, level) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    const darknessLevel = level * 10;
    dropdown.style.setProperty(
      "--base-color",
      `rgba(0, 0, 0, 0.${darknessLevel})`
    );

    const ul = document.createElement("ul");

    dropdownData.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("dropdown-link");
      const a = document.createElement("a");
      a.style.marginLeft = `${level * 10}px`;
      a.textContent = item.children ? "▶ " + item.name : "◆ " + item.name;
      li.appendChild(a);

      if (item.children) {
        li.addEventListener("click", (event) => {
          this.toggleDropdown(li, a, item);
          event.stopPropagation(); // Prevent click event from propagating to parent li
        });
        this.createDropdown(li, item.children, level + 1);
      }
      ul.appendChild(li);
    });

    dropdown.appendChild(ul);
    parentElement.appendChild(dropdown);
  }
}

customElements.define("navbar-component", NavbarComponent);
