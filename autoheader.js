document.addEventListener("DOMContentLoaded", function () {
    // Load configuration from external JSON file
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Create header elements
            const header = document.createElement("header");
            const nav = document.createElement("nav");
            nav.className = config.navbarClass || "navbar navbar-expand-lg bg-dark container-fluid";

            // Navbar brand
            const brand = document.createElement("a");
            brand.className = "navbar-brand text-light";
            brand.href = config.brandHref || "./";
            brand.textContent = config.brandText || "Mielenterveys kuuluu kaikille!";
            brand.style = "font-family: 'Anton', sans-serif;"
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
        })
        .catch(error => console.error('Error loading configuration:', error));
});
