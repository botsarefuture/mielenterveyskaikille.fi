// Flag to track if the header was added
let headerAdded = false;

// Function to create a cookie
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get the value of a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Document Ready Event Listener
function tryLoad() {
  // Load Google Fonts stylesheet and other resources
  loadResources();

  // Load configuration from external JSON file
  fetch("config.json")
    .then((response) => response.json())
    .then((config) => {
      // Create header elements
      const header = createHeader(config);

      // Check if the language check cookie exists
      const languageChecked = getCookie("language_checked");

      // If the language check cookie doesn't exist, check user's preferred language and redirect
      if (!languageChecked) {
        redirectBasedOnPreferredLanguage(config);
      }

      // Append header to the body
      document.body.insertBefore(header, document.body.firstChild);
      headerAdded = true; // Set the flag to true after adding the header
    })
    .catch((error) => console.error("Error loading configuration:", error));
}

// Load necessary resources
function loadResources() {
  loadFontsAndStylesheet();
  addGoogleAnalytics();
}

// Load fonts and custom stylesheet
function loadFontsAndStylesheet() {
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
  document.head.appendChild(fontLink);

  const stylesLink = document.createElement("link");
  stylesLink.rel = "stylesheet";
  stylesLink.href = "/static/css/styles.css";
  document.head.appendChild(stylesLink);
}

// Add Google Analytics script
function addGoogleAnalytics() {
  const gtagScript1 = document.createElement("script");
  gtagScript1.async = true;
  gtagScript1.src = "https://www.googletagmanager.com/gtag/js?id=G-FPN2HKBMCE";
  document.head.appendChild(gtagScript1);

  const gtagScript2 = document.createElement("script");
  gtagScript2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FPN2HKBMCE');
    `;
  document.head.appendChild(gtagScript2);
}

// Create header based on configuration
function createHeader(config) {
  const header = document.createElement("header");
  header.style = "text-align: center; background-color: black;"; // Add background color style
  const nav = document.createElement("nav");
  nav.className = config.navbarClass || "navbar navbar-expand-lg bg-dark container-fluid";
  nav.style = "display: flex; justify-content: center;"; // Center the navbar items horizontally

  // Create navbar elements
  createNavbarElements(nav, config);

  header.appendChild(nav);
  return header;
}

// Create navbar elements
function createNavbarElements(nav, config) {
    // Navbar Brand Link
    const brandLink = document.createElement("a");
    brandLink.href = "https://mielenterveyskaikille.fi/";
    brandLink.classList.add("navbar-brand"); // Add navbar-brand class to maintain styling
    nav.appendChild(brandLink);

    // Navbar Brand Image
    const brand = document.createElement("img");
    brand.src = "/static/mielenterveyskaikille-04.svg";
    brand.alt = "Mielenterveys kuuluu kaikille logo"; // Provide alternative text for accessibility
    brandLink.appendChild(brand);

  // Navbar Toggler Button
  const togglerButton = document.createElement("button");
  togglerButton.className = "navbar-toggler";
  togglerButton.type = "button";
  togglerButton.setAttribute("data-toggle", "collapse");
  togglerButton.setAttribute("data-target", "#navbarSupportedContent");
  togglerButton.setAttribute("aria-controls", "navbarSupportedContent");
  togglerButton.setAttribute("aria-expanded", "false");
  togglerButton.setAttribute("aria-label", "Toggle navigation");
  togglerButton.innerHTML = config.togglerButtonIcon || '<span class="navbar-toggler-icon">☰</span>';
  nav.appendChild(togglerButton);

  // Language switch buttons
  const languageConfig = {
    FI: { url: "/", name_in_lang: { FI: "Suomeksi", EN: "In Finnish", SV: "På Finska" } },
    EN: { url: "/en/", name_in_lang: { FI: "Englanniksi", EN: "In English", SV: "På Engelska" } },
  };

  Object.keys(languageConfig).forEach((language) => {
    const languageButton = document.createElement("button");
    languageButton.textContent = language;
    languageButton.classList += "language-button";
    languageButton.addEventListener("click", () => switchLanguage(language));
    nav.appendChild(languageButton);
  });
}

// Redirect based on user's preferred language
function redirectBasedOnPreferredLanguage(config) {
  const userLanguage = navigator.language || navigator.userLanguage;
  const preferredLanguage = userLanguage.substring(0, 2).toUpperCase();
  const supportedLanguages = ["FI", "EN"]; // Add more supported languages if needed

  if (supportedLanguages.includes(preferredLanguage)) {
    createCookie("language_checked", "true", 365); // Cookie lasts for a year
    switchLanguage(preferredLanguage.toLowerCase());
  }
}

// Switch language
function switchLanguage(language) {
  const currentLang = window.location.pathname.split("/")[1]; // Get the current language from the URL
  const languageConfig = {
    FI: { url: "/", name_in_lang: { FI: "Suomeksi", EN: "In Finnish", SV: "På Finska" } },
    EN: { url: "/en/", name_in_lang: { FI: "Englanniksi", EN: "In English", SV: "På Engelska" } },
  };

  let targetUrl = languageConfig[language]?.url;

  if (!targetUrl) {
    console.error("Invalid target URL for language:", language);
    return; // Exit function if target URL is invalid
  }

  if (currentLang !== "en") {
    window.location.pathname = replacePathname(`${targetUrl}${window.location.pathname}`);
  } else {
    window.location.pathname = replacePathname(window.location.pathname.replace(currentLang, targetUrl));
  }

  // IF EVERYTHING WORKS, NOTHING HAPPENS BEYOND THIS LINE
  console.error("Something is wrong, check autoheader line 120 comment.");
}

// Function to replace pathname
function replacePathname(pathname) {
  while (pathname.includes("//")) {
    pathname = pathname.replace("//", "/");
  }
  return pathname;
}

// Function to check if the header was added
function isHeaderAdded() {
  return headerAdded;
}

// Call tryLoad when the DOM content is loaded
document.addEventListener("DOMContentLoaded", tryLoad);

// Loop to ensure header is added
do {
      tryLoad();
    
} while (isHeaderAdded() == false);
