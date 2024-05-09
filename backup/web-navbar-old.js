const template = document.createElement("template");
template.innerHTML = `
    <div class="container">
      <div class="logo-container">
        <h3 class="logo">Curriculum</h3>
      </div>
    </div>
`;

class WebNavbar extends HTMLElement {
  iteration;
  firstTime;
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

  buildTree(data, parent, firstTime) {
    const ul = document.createElement("div");
    if (firstTime) {
      ul.classList.add("ssldc-items");
      firstTime = false;
    } else {
      ul.classList.add("hbo-i-items");
    }
    parent.appendChild(ul);

    data.forEach((item) => {
      const ssldc_li = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      // console.log(this.iteration);
      // if (this.iteration === 1) {
      //   ssldc_li.classList.add("ssldc-item");
      // } else if (this.iteration === 2) {
      //   ssldc_li.classList.add("hbo-i-activiteit");
      // } else if (this.iteration === 3) {
      //   ssldc_li.classList.add("hbo-i-item");
      // }
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);

      if (item.vaardigheden) {
        const vaardighedenUl = this.shadowRoot.appendChild(
          document.createElement("div")
        );
        vaardighedenUl.classList.add("hbo-i-activiteiten");
        ssldc_li.appendChild(vaardighedenUl);

        item.vaardigheden.forEach((vaardigheid) => {
          const vaardigheidLi = this.shadowRoot.appendChild(
            document.createElement("div")
          );
          vaardigheidLi.classList.add("hbo-i-vaardigheid");

          vaardigheidLi.textContent = vaardigheid.naam;
          vaardighedenUl.appendChild(vaardigheidLi);

          if (vaardigheid.vaardigheden) {
            this.buildTree(vaardigheid.vaardigheden, vaardighedenUl, firstTime);
            this.iteration = 3;
          }
        });
      }
      if (item.labels) {
        this.iteration = 3;
        this.buildHboItems(item.labels, ssldc_li);
        // this.buildTree(item.labels, ssldc_li, firstTime);
      }
    });
    this.iteration = 1;
  }

  buildHboItems(data, parent){
    console.log("here");

    const ul = document.createElement("div");
    ul.classList.add("hbo-i-items");
    parent.appendChild(ul);
  }

}

customElements.define("web-navbar", WebNavbar);
