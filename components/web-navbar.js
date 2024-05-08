const template = document.createElement("template");
template.innerHTML = `
    <div class="container">
      <div class="logo-container">
        <h3 class="logo">Curriculum</h3>
      </div>
    </div>
`;

class WebNavbar extends HTMLElement {
  firstTime;
  shadowRoot;

  attachStyling(){
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "/css/web-navbar.css");
    this.shadowRoot.appendChild(linkElem);
  }

  constructor() {
    super();
    this.firstTime = true;
    this.shadowRoot = this.attachShadow({ mode: "open" });
    import("/data/architectuurlaag/se/curriculum.js").then((module) => {
      this.buildTree(module.default, this.shadowRoot, this.firstTime);
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attachStyling();

  }

  buildTree(data, parent, firstTime) {
    const ul = document.createElement("ul");
    if (firstTime) {
      ul.classList.add("ssldc-items");
      firstTime = false;
    } else {
      ul.classList.add("hbo-i-items");
    }
    parent.appendChild(ul);

    data.forEach((item) => {
      const ssldc_li = this.shadowRoot.appendChild(document.createElement("li"));
      //on first time: add ssldc-item
      // on second time: add hbo-i-item
      // on third time: addh hbo-i-activiteit
      ssldc_li.classList.add("ssldc-item");
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);

      if (item.vaardigheden) {
        const vaardighedenUl =  this.shadowRoot.appendChild(document.createElement("ul"));
        vaardighedenUl.classList.add("hbo-i-activeiten");
        ssldc_li.appendChild(vaardighedenUl);

        item.vaardigheden.forEach((vaardigheid) => {
          const vaardigheidLi =  this.shadowRoot.appendChild(document.createElement("li"));
          vaardigheidLi.classList.add("hbo-i-activiteit");

          vaardigheidLi.textContent = vaardigheid.naam;
          vaardighedenUl.appendChild(vaardigheidLi);

          if (vaardigheid.vaardigheden) {
            this.buildTree(vaardigheid.vaardigheden, vaardighedenUl, firstTime);
          }
        });
      }
      
      if (item.labels) {
        this.buildTree(item.labels, ssldc_li, firstTime);
      }
    });
  }
}

customElements.define("web-navbar", WebNavbar);
