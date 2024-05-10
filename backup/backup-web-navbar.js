const template = document.createElement("template");
template.innerHTML = `
    <div class="container">
      <div class="logo-container">
        <h3 class="logo">Curriculum</h3>
        <button class="SEMButton SEButton">Software Engineering</button>
        <button class="SEMButton ESAButton">Embedded Systems and Automation</button>
        <button class="SEMButton IDSButton">Infrastructure Design and Security</button>
        <button class="SEMButton BIMButton">Business IT and Management</button>
      </div>
    </div>
`;

class WebNavbar extends HTMLElement {
  shadowRoot;

  attachStyling() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "/css/web-navbar.css");
    this.shadowRoot.appendChild(linkElem);
  }

  constructor() {
    super();
    this.firstTime = true;
    this.iteration = 1;
    this.shadowRoot = this.attachShadow({ mode: "open" });
    import("/data/architectuurlaag/se/curriculum.js").then((module) => {
      this.buildTree(module.default, this.shadowRoot, this.firstTime);
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attachStyling();
  }

  buildTree(data, parent) {
    const ul = document.createElement("div");
    ul.classList.add("ssldc-items");
    //when clicked show the ssldc-item
    ul.addEventListener("click", function () {
      this.className += " active";
    });
    parent.appendChild(ul);

    data.forEach((item) => {
      const ssldc_li = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      ssldc_li.classList.add("ssldc-item");
      //when clicked show the hbo-i-items
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);
      if (item.labels) {
        this.buildHboItems(item.labels, ssldc_li);
      }
    });
  }

  buildHboItems(data, parent) {
    const ul = document.createElement("div");
    ul.classList.add("hbo-i-items");
    //when clicked show the hbo-i-activiteiten

    parent.appendChild(ul);

    data.forEach((item) => {
      const hbo_items = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      hbo_items.classList.add("hbo-i-item");
      ul.appendChild(hbo_items);

      const hbo_tag = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      hbo_tag.classList.add("hbo-i-tag");
      hbo_tag.textContent = item.naam;
      hbo_items.appendChild(hbo_tag);

      if (item.vaardigheden) {
        const vaardighedenUl = this.shadowRoot.appendChild(
          document.createElement("div")
        );
        vaardighedenUl.classList.add("hbo-i-activiteiten");
        //when clicked show the hbo-i-vaardigheden
        hbo_items.appendChild(vaardighedenUl);

        item.vaardigheden.forEach((vaardigheid) => {
          const vaardigheidLi = this.shadowRoot.appendChild(
            document.createElement("div")
          );
          vaardigheidLi.classList.add("hbo-i-activiteit");

          vaardigheidLi.textContent = vaardigheid.naam;
          vaardighedenUl.appendChild(vaardigheidLi);

          if (vaardigheid.vaardigheden) {
            this.buildHboVaardigheden(vaardigheid.vaardigheden, vaardigheidLi);
            this.iteration = 3;
          }
        });
      }
    });
  }

  buildHboVaardigheden(data, parent) {
    const ul = document.createElement("div");
    ul.classList.add("hbo-i-vaardigheden");
    parent.appendChild(ul);

    data.forEach((item) => {
      const ssldc_li = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      ssldc_li.classList.add("hbo-i-vaardigheid");
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);
      if (item.labels) {
        this.buildHboItems(item.labels, ssldc_li);
      }
    });
  }

  onNavClick() {
    //on nav click
  }

  onSsldcClick() {
    //on ssldc click > show hbo-i-items(tags)
  }

  onHBOTagClick() {
    //on hbo tag click > show hbo-i-activiteiten
  }

  onHBOActivityClick() {
    //on hbo activiteiten click > show hbo-i-vaardigheden
  }
}

customElements.define("web-navbar", WebNavbar);
