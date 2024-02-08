const cookieConsent = {
    showBanner: function() {
        const consentBanner = document.createElement('div');
        consentBanner.id = 'cookieConsent';
        consentBanner.classList.add('cookie-consent');
        consentBanner.innerHTML = `
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <button id="acceptCookiesBtn">Accept</button>
        `;
        document.body.appendChild(consentBanner);

        const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
        acceptCookiesBtn.addEventListener('click', function() {
            cookieConsent.setCookie('cookieConsent', 'accepted', 365); // Set cookie for 365 days
            consentBanner.style.display = 'none';
            cookieConsent.allowGoogleAnalytics();
        });

        // Check if the user has already accepted cookies
        if (cookieConsent.getCookie('cookieConsent') === 'accepted') {
            consentBanner.style.display = 'none';
            cookieConsent.allowGoogleAnalytics();
        }
    },
    allowGoogleAnalytics: function() {
        // Replace 'UA-XXXXXXXXX-X' with your Google Analytics tracking ID
        const gaTrackingID = 'UA-XXXXXXXXX-X';
        const gaScript = document.createElement('script');
        gaScript.setAttribute('async', 'true');
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingID}`;
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gaTrackingID);
    },
    setCookie: function(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },
    getCookie: function(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
};

document.addEventListener("DOMContentLoaded", function() {
    cookieConsent.showBanner();
});
