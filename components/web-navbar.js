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

    // Add event listeners to hbo-i-tag elements to toggle visibility of hbo-i-activiteiten
  }

  //create tree first part
  buildTree(data, parent) {
    //create the ssldc-items, this is where all of the other elements will be placed into.
    const ul = document.createElement("div");
    ul.classList.add("ssldc-items");
    parent.appendChild(ul);

    data.forEach((item) => {
      //create new element (ssldc-item)
      const ssldc_li = this.shadowRoot.appendChild(
        document.createElement("div")
      );

      //sanitize the name so it can be placed in the classlist.
      const naamWithoutSSLDC = item.naam.replace("SSLDC", "");
      const sanitizedNaam = naamWithoutSSLDC.trim().replace(/\s+/g, "-");
      ssldc_li.classList.add("ssldc-item");
      ssldc_li.classList.add(sanitizedNaam);

      //create element for the name of the class (styling purposes)
      const ssldc_item_text = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      ssldc_item_text.classList.add("ssldc-item-text");
      ssldc_item_text.textContent = item.naam;
      //add text to ssldc-item element
      ssldc_li.appendChild(ssldc_item_text);

      //add ssldc-item element to the ssldc-items element
      ul.appendChild(ssldc_li);
      if (item.labels) {
        //call buildHboItems.
        this.buildHboItems(item.labels, ssldc_li);
      }
    });
  }

  buildHboItems(data, parent) {
    const ul = document.createElement("div");
    //create element to place the hbo-i-items into.
    ul.classList.add("hbo-i-items");
    parent.appendChild(ul);

    data.forEach((item) => {
      //create hbo-i-item element for each item
      const hbo_items = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      hbo_items.classList.add("hbo-i-item");
      ul.appendChild(hbo_items);

      //create tag/text for styling purposes
      const hbo_tag = this.shadowRoot.appendChild(
        document.createElement("div")
      );

      //sanitize the classname
      const naamWithoutHBOI = item.naam.replace("HBO-I", "");
      const sanitizedNaam = naamWithoutHBOI.trim().replace(/\s+/g, "-");

      hbo_tag.classList.add("hbo-i-tag");
      hbo_tag.classList.add(sanitizedNaam);

      hbo_tag.textContent = item.naam;
      //add tag to hbo_item element
      hbo_items.appendChild(hbo_tag);

      if (item.vaardigheden) {
        //create hbo-i-activiteiten element
        const hboActiviteiten = this.shadowRoot.appendChild(
          document.createElement("div")
        );
        hboActiviteiten.classList.add("hbo-i-activiteiten");
        hboActiviteiten.classList.add("hidden"); // Add 'hidden' class by default

        //this event listener should make the hbo-i-activiteiten class inside the hbo-i-item class visible. For now it only logs the textcontent of the hbo_tag.
        hbo_tag.addEventListener("click", function (event) {
          console.log("hbo_tag_pressed");
          const activiteiten = this.nextElementSibling;
          activiteiten.classList.toggle("hidden"); // Toggle the 'hidden' class

          // Hide other hbo-i-activiteiten elements within the same hbo-i-items container
          const itemsContainer = this.closest(".hbo-i-items");
          itemsContainer
            .querySelectorAll(".hbo-i-activiteiten")
            .forEach((activiteitenElement) => {
              if (activiteitenElement !== activiteiten) {
                activiteitenElement.classList.add("hidden");
              }
            });
        });
        //add the hboo-i-activeiten element to the hbo_items element.
        hbo_items.appendChild(hboActiviteiten);

        item.vaardigheden.forEach((vaardigheid) => {
          const hboActiviteit = this.shadowRoot.appendChild(
            document.createElement("div")
          );
          const sanitizedNaam = vaardigheid.naam.trim().replace(/\s+/g, "-");

          hboActiviteit.classList.add("hbo-i-activiteit");
          hboActiviteit.classList.add(sanitizedNaam);

          const hboActiviteit_text = this.shadowRoot.appendChild(
            document.createElement("div")
          );

          hboActiviteit_text.textContent = vaardigheid.naam;
          hboActiviteit_text.classList.add("hbo-i-activiteit-text");

          //this event listener should make the hbo-i-vaardigheiden class inside the hbo-i-activiteiten class visible. For now it only logs the textcontent of the hbo_tag.
          hboActiviteit.addEventListener("click", function (event) {
            console.log("activiteit clicked");
            const vaardigheden = this.querySelector(".hbo-i-vaardigheden");
            vaardigheden.classList.toggle("hidden"); // Toggle the 'hidden' class
          });

          hboActiviteit.appendChild(hboActiviteit_text);
          hboActiviteiten.appendChild(hboActiviteit);

          if (vaardigheid.vaardigheden) {
            this.buildHboVaardigheden(
              vaardigheid.vaardigheden,
              hboActiviteit,
              sanitizedNaam
            );
          }
        });
      }
    });
  }

  buildHboVaardigheden(data, parent, classname) {
    const hboVaardigheden = document.createElement("div");
    hboVaardigheden.classList.add("hbo-i-vaardigheden");
    hboVaardigheden.classList.add(classname);
    hboVaardigheden.classList.add("hidden");

    parent.appendChild(hboVaardigheden);

    data.forEach((item) => {
      const hboVaardigheid = this.shadowRoot.appendChild(
        document.createElement("div")
      );
      hboVaardigheid.classList.add("hbo-i-vaardigheid");
      hboVaardigheid.textContent = item.naam;
      hboVaardigheden.appendChild(hboVaardigheid);
      if (item.labels) {
        this.buildHboItems(item.labels, hboVaardigheid);
      }
    });
  }
}

customElements.define("web-navbar", WebNavbar);
