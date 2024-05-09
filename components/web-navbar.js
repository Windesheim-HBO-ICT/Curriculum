const template = document.createElement("template");
template.innerHTML = `
    <div class="container">
      <div class="logo-container">
        <h3 class="logo">Curriculum</h3>
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
    parent.appendChild(ul);

    data.forEach((item) => {
      const ssldc_li = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      ssldc_li.classList.add("ssldc-item");
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);
      if (item.labels) {
        this.buildHboItems(item.labels, ssldc_li);
      }
    });
  }

  buildHboItems(data, parent){
    const ul = document.createElement("div");
    ul.classList.add("hbo-i-items");
    parent.appendChild(ul);

    
    data.forEach((item) => {
      const hbo_items = this.shadowRoot.appendChild(
        document.createElement("div"));
      hbo_items.classList.add("hbo-i-item");
      ul.appendChild(hbo_items);

      const hbo_tag = this.shadowRoot.appendChild(
        document.createElement("div"));
      hbo_tag.classList.add("hbo-i-tag");
      hbo_tag.textContent = item.naam;
      hbo_items.appendChild(hbo_tag);

      if (item.vaardigheden) {
        const vaardighedenUl = this.shadowRoot.appendChild(
          document.createElement("div")
        );
        vaardighedenUl.classList.add("hbo-i-activiteiten");
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
}


customElements.define("web-navbar", WebNavbar);
