document.addEventListener("DOMContentLoaded", function () {
    // Load Google Fonts stylesheet
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
    document.head.appendChild(fontLink);

    // Load styles.css stylesheet
    const stylesLink = document.createElement("link");
    stylesLink.rel = "stylesheet";
    stylesLink.href = "/styles.css";
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
    
        if (language === lang) {
            return; // No need to switch if it's already in the desired language
        }
    
        // Construct the new URL based on the desired language
        let newPath = window.location.pathname;
    
        // Replace the language prefix in the pathname with the desired language
        if (currentLang === "en") {
            newPath = newPath.replace("/en/", `/${language.toLowerCase()}/`);
        } else {
            newPath = `/${language.toLowerCase()}${newPath}`;
        }
    
        // Redirect to the new URL
        window.location.href = newPath;
    }

    // Create language switch buttons

    Object.keys(languageConfig).forEach(language => {
        const languageButton = document.createElement("button");
        languageButton.textContent = language;
        languageButton.addEventListener("click", () => switchLanguage(language));
        nav.appendChild(languageButton);
    });

    header.appendChild(nav);

    // Append header to the body
    document.body.insertBefore(header, document.body.firstChild);
})

.catch(error => console.error('Error loading configuration:', error));
});
