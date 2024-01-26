document.addEventListener('DOMContentLoaded', function () {
    // Create the marquee element
    const marquee = document.createElement('marquee');
    marquee.classList.add('blink');
  
    // Marquee content
    marquee.textContent =
      'Suomen mielenterveyspalvelut ovat kriisissä, ja tarvitsemme muutosta! Apua ei saada ajoissa, ja monet kamppailevat vaikeuksien keskellä ilman riittävää tukea. Yhdessä voimme tehdä eron. Liity mukaan mielenosoitukseen 9.3.2024 klo 13 Senaatintorilla. Marssi kohti Eduskuntataloa alkaa klo 14, ja siellä odottaa monipuolinen ohjelma. Tule ilmaisemaan mielipiteesi ja vaatimaan parempia mielenterveyspalveluita kaikille. Yhdessä olemme vahvoja, ja yhdessä voimme muuttaa tulevaisuutta!';
  
    // Append marquee to the container element
    const marqueeContainer = document.querySelector('.marquee-container');
    marqueeContainer.appendChild(marquee);
  });
  