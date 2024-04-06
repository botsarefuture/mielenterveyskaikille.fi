const languageConfig = {
    FI: {"url": "/", "name_in_lang": {"FI": "Suomeksi", "EN": "In Finnish", "SV": "På Finska"}},
    EN: {"url": "/en/", "name_in_lang": {"FI": "Englanniksi", "EN": "In English", "SV": "På Engelska"}}
}

lang = ""

function switchLanguage(language) {
    const currentLang = window.location.pathname.split("/", 2)[1];
    console.log(currentLang)
    if (currentLang == "") {
        lang = "FI"
    }

    if (currentLang == "en") {
        lang = "EN"
    }

    if (lang === "EN") {
        // Remove "/en/" from the beginning of the URL
        window.location.href = window.location.href.replace(/^\/en\//, '/');

    } else if (lang === "FI") {
        // Add "/en" before the current pathname
        var currentPath = window.location.pathname;
        window.location.href = "/en" + currentPath;
    }
    

}
switchLanguage("s");