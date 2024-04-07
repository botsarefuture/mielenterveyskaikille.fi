function toggleDescription(element) {
    var description = element.querySelector('.demand-description');
    var clickToShow = element.querySelector('.click-to-show');
    if (description.style.display === 'none' || description.style.display === '') {
      description.style.display = 'block';
      clickToShow.innerHTML = 'Klikkaa tästä';
    } else {
      description.style.display = 'none';
      clickToShow.innerHTML = 'Klikkaa tästä';
    }
  }