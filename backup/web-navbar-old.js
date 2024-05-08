class WebNavbar extends HTMLElement {
    firstTime;
    constructor() {
      super();
      this.firstTime = true;
      import("/data/architectuurlaag/se/curriculum.js").then((module) => {
        buildTree(module.default, this.shadowRoot, this.firstTime);
      });
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/web-navbar.css">
      <div class = "container">
        <div class="logo-container">
            <h3 class="logo">Curriculum</h3>
          </div>
        </div>
      `;
    }
  }
  
  function buildTree(data, parent, firstTime) {
    console.log(data);
    const ul = document.createElement("ul");
    if(firstTime){
      ul.classList.add("ssldc-items");
      firstTime = false;
    } else {
      ul.classList.add("hbo-i-items");
    }
    parent.appendChild(ul);
  
    data.forEach((item) => {
      const ssldc_li = document.createElement("li");
      ssldc_li.classList.add("ssldc-item");
      ssldc_li.textContent = item.naam;
      ul.appendChild(ssldc_li);
  
      if (item.vaardigheden) {
        const vaardighedenUl = document.createElement("ul");
        vaardighedenUl.classList.add("hbo-i-activeiten");
        ssldc_li.appendChild(vaardighedenUl);
  
        item.vaardigheden.forEach((vaardigheid) => {
          const vaardigheidLi = document.createElement("li");
          vaardigheidLi.classList.add("hbo-i-activiteit")
          
          vaardigheidLi.textContent = vaardigheid.naam;
          vaardighedenUl.appendChild(vaardigheidLi);
  
          if (vaardigheid.vaardigheden) {
            buildTree(vaardigheid.vaardigheden, vaardighedenUl, firstTime);
          }
        });
      }
  
      if (item.labels) {
        buildTree(item.labels, ssldc_li, firstTime);
      }
    });
  }
  customElements.define("web-navbar", WebNavbar);
  
  
  