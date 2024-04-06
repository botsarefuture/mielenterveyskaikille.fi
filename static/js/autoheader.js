document.addEventListener("DOMContentLoaded", function () {
    // Load Google Fonts stylesheet
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
    document.head.appendChild(fontLink);

    // Load styles.css stylesheet
    const stylesLink = document.createElement("link");
    stylesLink.rel = "stylesheet";
    stylesLink.href = "/static/css/styles.css";
    document.head.appendChild(stylesLink);

    // Add add meta
    const metaTags = document.createElement("script");
    metaTags.defer = true;
    metaTags.src = "addMetaTags.js";
    document.head.appendChild(metaTags);

    // Add Google Tag Manager script
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

    // Load configuration from external JSON file
fetch('config.json')
.then(response => response.json())
.then(config => {
    // Create header elements
    const header = document.createElement("header");
    header.style = "text-align: center; background-color: black;"; // Add background color style
    const nav = document.createElement("nav");
    nav.className = config.navbarClass || "navbar navbar-expand-lg bg-dark container-fluid";
    nav.style = "display: flex; justify-content: center;"; // Center the navbar items horizontally

    // Navbar brand
    const brand = document.createElement("h1");
    brand.className = "navbar-brand";
    brand.style = "color: white; max-width: 100%;";
    const brandSpan = document.createElement("span");
    brandSpan.style = "color: var(--red);";
    brandSpan.textContent = "KUULUU KAIKILLE!";
    brand.appendChild(document.createTextNode("MIELENTERVEYS "));
    brand.appendChild(brandSpan);
    brand.style.fontFamily = "'Anton', sans-serif;";
    nav.appendChild(brand);

    // Navbar toggler button
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

    // Navbar collapse
    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse navbar-collapse";
    collapseDiv.id = "navbarSupportedContent";

    // Navbar links
    const navList = document.createElement("ul");
    navList.className = "navbar-nav me-auto mb-2 mb-lg-0";
    navList.style = "align-items: center;"

    const links = config.links || [
        { text: "Koti", href: "index.html" },
        { text: "Tietoa", href: "info.html" },
        { text: "Tuotteet", href: "products.html" },
        { text: "Medialle", href: "for_media.html" },
    ];

    links.forEach((link) => {
        const listItem = document.createElement("li");
        listItem.className = "nav-item";

        if (link.hasOwnProperty("class")) {
            listItem.className = `nav-item ${link.class}`;
        }

        // Check if the link is active
        if (window.location.href.endsWith(link.href)) {
            listItem.classList.add("active");
        }

        const anchor = document.createElement("a");
        anchor.className = "nav-link text-light";
        anchor.href = link.href;
        anchor.textContent = link.text;
        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });

    collapseDiv.appendChild(navList);
    nav.appendChild(collapseDiv);

    // Configuration object for supported languages and their URLs
    const languageConfig = {
        FI: {"url": "/", "name_in_lang": {"FI": "Suomeksi", "EN": "In Finnish", "SV": "På Finska"}},
        EN: {"url": "/en/", "name_in_lang": {"FI": "Englanniksi", "EN": "In English", "SV": "På Engelska"}}
    };

    function switchLanguage(language) {
        const currentLang = window.location.pathname.split("/")[1]; // Get the current language from the URL
        let lang = "FI"; // Default language
        
        if (currentLang === "en") {
            lang = "EN";
        }
    
        if (language.toUpperCase() === lang || language === lang) {
            return; // No need to switch if it's already in the desired language
        }
    
        // Construct the new URL based on the desired language
        let newPath = window.location.pathname;
    
        // Replace the language prefix in the pathname with the desired language
        if (currentLang === "en" && language === "fi") {
            newPath = newPath.replace("/en/", "/");
        } else {
            if (language !== "FI") {
            newPath = `/${language.toLowerCase()}${newPath}`;
            }
        }
    
        // Redirect to the new URL
        window.location.href = newPath;
    }

    // Create language switch buttons

    Object.keys(languageConfig).forEach(language => {
        const languageButton = document.createElement("button");
        languageButton.textContent = language;
        languageButton.classList += "language-button";
        languageButton.addEventListener("click", () => switchLanguage(language));
        nav.appendChild(languageButton);
    });

    header.appendChild(nav);

     // Function to create cookie
    function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Function to get cookie value
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if the language check cookie exists
    var languageChecked = getCookie("language_checked");

    // If the language check cookie doesn't exist, check user's preferred language and redirect
    if (!languageChecked) {
        var userLanguage = navigator.language || navigator.userLanguage;
        var preferredLanguage = userLanguage.substring(0, 2).toUpperCase(); // Get the first two letters for language code
        var supportedLanguages = ["FI", "EN"]; // Add more supported languages if needed

        // Check if the user's preferred language is supported
        if (supportedLanguages.includes(preferredLanguage)) {
            // Create cookie to indicate language check
            createCookie("language_checked", "true", 365); // Cookie lasts for a year

            switchLanguage(preferredLanguage.toLowerCase());
            // Redirect to the user's preferred language page
        }
    }
    
    // Append header to the body
    document.body.insertBefore(header, document.body.firstChild);
})

.catch(error => console.error('Error loading configuration:', error));
});
