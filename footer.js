document.addEventListener('DOMContentLoaded', function() {
    fetch('config.json')
      .then(response => response.json())
      .then(data => {
        const footer = document.createElement('footer');
        const p = document.createElement('p');
        p.textContent = `© ${new Date().getFullYear()} ${data.footerText}`;
        footer.appendChild(p);
  
        const div = document.createElement('div');
        div.className = 'social-icons';
  
        const socialMedia = data.socialMedia;
  
        for (const platform in socialMedia) {
          const a = document.createElement('a');
          a.href = socialMedia[platform].url;
          a.target = '_blank';
  
          const i = document.createElement('i');
          i.className = socialMedia[platform].iconClass;
          i.style.color = socialMedia[platform].iconColor;
  
          a.appendChild(i);
          div.appendChild(a);
        }
  
        footer.appendChild(div);
        document.body.appendChild(footer);
      })
      .catch(error => console.error('Error fetching config:', error));
  });
  