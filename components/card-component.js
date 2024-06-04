export default class CardComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
                  <style>
                      /* Styles for the card */
                      .card {
                        flex: 1 1 auto; 
                        width: 350px;
                        height: 450px; 
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #ccc;
                        display: flex;
                        flex-direction: column;
                        padding: 5%;
                        margin: 1%;
                        background: white;
                        max-width: 500px;
                        
                       
                    }
                      .card img {
                          height: 40%;
                          width: auto;
                          display: block;
                          object-fit: contain;
                          background: darkorange;
                          border-radius: 8px; 
                      }
    
                      .card-content {
                          padding: 10px;
                          flex-grow: 1;
                  
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          overflow-y: auto;
                      }
    
                      .card-content::-webkit-scrollbar {
                          width: 1px;
                      }
    
                      .card-content::-webkit-scrollbar-thumb {
                          background-color: #888;
                          border-radius: 4px;
                      }
    
                      .card-title {
                          font-size: 20px;
                          font-weight: bold;
                          margin-bottom: 10px;
                          color: var(--title-color, black);
                          overflow: hidden;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 1; 
                          text-overflow: ellipsis;
                      }
    
                      .card-description {
                        font-size: 0.8rem;
                          margin-bottom: 15px;
                          color: var(--description-color, black);
                          overflow: hidden;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 5; 
                          text-overflow: ellipsis;
                        
                      }
    
                      .card-button {
                          min-width: 100px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          padding: 10px 20px;
                          background-color: var(--button-color, #fff578);
                          color: var(--button-text-color, white);
                          text-decoration: none;
                          border-radius: 4px;
                          transition: background-color 0.3s ease;
                          width: 20%;
                          color: black;
                          font-weight: bold;
                      }
    
                      .card-button:hover {
                          background-color: orange;
                      }

                      @media (max-width: 900px) {
                        .card {
                    
                          max-width: 350px; 
                          max-height: 400px;
                          margin:5%
                        }
                        .card-description {
                          font-size: 16px;
                          margin-bottom: 15px;
                          color: var(--description-color, black);
                          overflow: hidden;
                          display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 3; 
                          text-overflow: ellipsis;
                      }
                      
                      
                      }
                  </style>
    
                  <!-- Card component -->
                  <div class="card">
                      <img src="/public/windesheim-logo.png" alt="Image">
                      <div class="card-content">
                      <div class="card-top"> 
                          <h2 class="card-title">Title</h2>
                          <p class="card-description">Beshrijving</p>
                          </div>
                          <a class="card-button" href="#">Lees meer</a>
                      </div>
                  </div>
              `;
  }

  connectedCallback() {
    const imgElement = this.shadowRoot.querySelector("img");
    const titleElement = this.shadowRoot.querySelector(".card-title");
    const descriptionElement =
      this.shadowRoot.querySelector(".card-description");
    const buttonElement = this.shadowRoot.querySelector(".card-button");

    const data = JSON.parse(this.getAttribute("data"));

    imgElement.src = data.imageUrl || "/public/windesheim-logo.png";
    titleElement.textContent = data.title || "Titel";
    descriptionElement.textContent = data.description || "Beschrijving";
    buttonElement.href = data.buttonUrl || "#";

    this.style.setProperty("--title-color", data.titleColor || "black");
    this.style.setProperty(
      "--description-color",
      data.descriptionColor || "black"
    );
    this.style.setProperty("--button-color", data.buttonColor || "#f7cd46");
    this.style.setProperty(
      "--button-text-color",
      data.buttonTextColor || "white"
    );
  }
}

// Define the custom element
customElements.define("card-component", CardComponent);
