// Function to dynamically add meta tags
function addMetaTags() {
    // Meta description
    var metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Osallistu mielenosoitukseen Senaatintorilla 3.6.2024 ja vaadi muutosta Suomen mielenterveyspalveluihin. Liity mukaan ja osoita tukesi!';
    document.head.appendChild(metaDescription);

    // Open Graph meta tags
    var ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Mielenterveys kuuluu kaikille';
    document.head.appendChild(ogTitle);

    var ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Osallistu mielenosoitukseen Senaatintorilla 3.6.2024 ja vaadi muutosta Suomen mielenterveyspalveluihin. Liity mukaan ja osoita tukesi!';
    document.head.appendChild(ogDescription);

    var ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    document.head.appendChild(ogType);

    var ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = 'https://mielenterveyskaikille.fi/';
    document.head.appendChild(ogUrl);

    var ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = 'https://mielenterveyskaikille.fi/mielenterveys1.svg';
    document.head.appendChild(ogImage);

    // Twitter Card meta tags
    var twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    twitterTitle.content = 'Mielenterveys kuuluu kaikille';
    document.head.appendChild(twitterTitle);

    var twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    twitterDescription.content = 'Osallistu mielenosoitukseen Senaatintorilla 3.6.2024 ja vaadi muutosta Suomen mielenterveyspalveluihin. Liity mukaan ja osoita tukesi!';
    document.head.appendChild(twitterDescription);

    var twitterImage = document.createElement('meta');
    twitterImage.name = 'twitter:image';
    twitterImage.content = 'https://mielenterveyskaikille.fi/mielenterveys1.svg';
    document.head.appendChild(twitterImage);

    var twitterCard = document.createElement('meta');
    twitterCard.name = 'twitter:card';
    twitterCard.content = 'summary_large_image';
    document.head.appendChild(twitterCard);
}

// Call the function to add meta tags
addMetaTags();
