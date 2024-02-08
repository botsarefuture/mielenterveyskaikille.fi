document.addEventListener("DOMContentLoaded", function () {
    // Load configuration from external JSON file
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Create header elements
            const header = document.createElement("header");
            header.style = "text-align: left;";
            const nav = document.createElement("nav");
            nav.className = config.navbarClass || "navbar navbar-expand-lg bg-dark container-fluid";

            // Navbar brand
            const brand = document.createElement("a");
            brand.className = "navbar-brand text-light";
            brand.href = config.brandHref || "./";
            brand.textContent = config.brandText || "Mielenterveys kuuluu kaikille!";
            brand.style = "font-family: 'Anton', sans-serif;";
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

            const links = config.links || [
                { text: "Koti", href: "index.html" },
                { text: "Tietoa", href: "info.html" },
                { text: "Tuotteet", href: "products.html" },
                { text: "Medialle", href: "for_media.html" },
            ];

            links.forEach((link) => {
                const listItem = document.createElement("li");
                listItem.className = "nav-item";

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
            header.appendChild(nav);

            // Append header to the body
            document.body.insertBefore(header, document.body.firstChild);
            if (config.multilingualSite || false == true) {
                // Your class-based JavaScript code here (MultilingualSite class instantiation)
                class MultilingualSite {
                    constructor(languageSelectorId) {
                        this.languageSelector = document.getElementById(languageSelectorId);

                        if (!this.languageSelector) {
                            console.error("Language selector not found.");
                            return;
                        }

                        this.setupEventListeners();
                        this.setPreferredLanguage();
                    }

                    setupEventListeners() {
                        this.languageSelector.addEventListener("change", this.handleLanguageChange.bind(this));
                    }

                    handleLanguageChange() {
                        const selectedLanguage = this.languageSelector.value;
                        const currentPath = window.location.pathname;

                        let newPath;

                        const regex = /^\/[a-z]{2}\//;
                        const hasLanguagePrefix = regex.test(currentPath);

                        if (hasLanguagePrefix) {
                            newPath = currentPath.replace(regex, `/${selectedLanguage}/`);
                        } else {
                            newPath = `/${selectedLanguage}${currentPath}`;
                        }

                        // Save the selected language to local storage
                        localStorage.setItem("selectedLanguage", selectedLanguage);

                        window.location.href = newPath;
                    }


                    setPreferredLanguage() {
                        const storedLanguage = localStorage.getItem("selectedLanguage");
                        const browserLanguage = navigator.language.substr(0, 2);

                        // Check if the user has already chosen a different language
                        if (storedLanguage && ['en', 'fi'].includes(storedLanguage)) {
                            this.languageSelector.value = storedLanguage;
                        } else if (['en', 'fi'].includes(browserLanguage)) {
                            // Set the browser language as the preferred language if not chosen by the user
                            this.languageSelector.value = browserLanguage;
                            // Save the preferred language to local storage
                            localStorage.setItem("selectedLanguage", browserLanguage);
                            this.handleLanguageChange();
                        }
                    }
                }
                // Create an instance of the MultilingualSite class
                const multilingualSite = new MultilingualSite("language-selector");
            }})

    .catch(error => console.error('Error loading configuration:', error));
});
