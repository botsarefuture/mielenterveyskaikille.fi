// Check if the user is on a mobile device
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Remove the initial domain from the pathname
  function removeInitialDomain(pathname) {
    return pathname.replace(/^\/mielenterveyskaikille\.fi/, '');
  }

  // Redirect to the mobile URL if on a mobile device
  function redirectMobile() {
    if (isMobile()) {
      var currentUrl = window.location.pathname;
      
      // Remove the initial domain from the pathname before constructing the mobile URL
      currentUrl = removeInitialDomain(currentUrl);

      var mobileUrl = "/mobile" + currentUrl;

      // Check if the mobile version exists
      fetch(mobileUrl, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            window.location.href = mobileUrl;
          }
        })
        .catch(error => {
          console.error('Error checking mobile version:', error);
        });
    }
  }

  // Run the redirection when the page loads
  window.onload = redirectMobile;