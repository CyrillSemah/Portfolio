function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);



document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const indicatorParents = document.querySelector('.controls ul');
  var sectionIndex = 0;

  function setIndex() {
    document.querySelector('.controls .selected').classList.remove('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
  }

  document.querySelectorAll('.controls ul li').forEach(function (indicator, ind) {
    indicator.addEventListener('click', function () {
      sectionIndex = ind;
      setIndex();
      indicator.classList.add('selected');
    });
  });

  leftArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    setIndex();
    indicatorParents.children[sectionIndex].classList.add('selected');
  });

  rightArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3;
    setIndex();
    indicatorParents.children[sectionIndex].classList.add('selected');
  });
});
