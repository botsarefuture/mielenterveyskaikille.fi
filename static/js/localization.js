document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'fi';
    
    document.querySelectorAll('[data-lang-fi]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-lang-${lang}`);
    });
});
