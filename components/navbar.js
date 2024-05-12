// Function to create NavbarComponent
function createMobileNavbar() {
  const navbar = document.createElement("navbar-component");
  document.body.appendChild(navbar);
}

// Function to create WebNavbar
function createWebNavbar() {
  const webNavbar = document.createElement("web-navbar");
  document.body.appendChild(webNavbar);
}

// Function to remove NavbarComponent or WebNavbar
function removeNavbar() {
  const navbar = document.querySelector("navbar-component");
  if (navbar) {
    navbar.remove();
  }

  const webNavbar = document.querySelector("web-navbar");
  if (webNavbar) {
    webNavbar.remove();
  }
}

// Function to switch between NavbarComponent and WebNavbar based on screen width
function switchNavbar() {
  const screenWidth = window.innerWidth;
  const isMobileNavbarVisible = !!document.querySelector("navbar-component");
  const isWebNavbarVisible = !!document.querySelector("web-navbar");

  if (screenWidth <= 920 && !isMobileNavbarVisible) {
    createMobileNavbar();
    removeWebNavbar();
  } else if (screenWidth > 920 && !isWebNavbarVisible) {
    createWebNavbar();
    removeMobileNavbar();
  }
}

// Function to remove MobileNavbar
function removeMobileNavbar() {
  const navbar = document.querySelector("navbar-component");
  if (navbar) {
    navbar.remove();
  }
}

// Function to remove WebNavbar
function removeWebNavbar() {
  const webNavbar = document.querySelector("web-navbar");
  if (webNavbar) {
    webNavbar.remove();
  }
}

// Initial switch based on screen width
switchNavbar();

// Event listener for window resize to dynamically switch between components
window.addEventListener("resize", switchNavbar);
