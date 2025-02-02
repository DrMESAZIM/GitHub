// Carousel Func ###################

const track = document.querySelector(".carousel__track");
const carouselSlide = document.querySelector(".carousel__slide");
const slides = Array.from(track.children);
const lbtn = document.querySelector(".carousel__button--left");
const rbtn = document.querySelector(".carousel__button--right");
const slideWidth = slides[0].getBoundingClientRect().width;

var clientX;
var deltaX;
const arangeSlides = (slide, index) => {
  ////////// Swipe
  slide.addEventListener("touchstart", (e) => {
    clientX = e.touches[0].clientX;
  });
  slide.addEventListener("touchend", (e) => {
    deltaX = e.changedTouches[0].clientX - clientX;
    touchMove();
  });
  /////////// Swipe ^^^
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(arangeSlides);

////////// Swipe
function touchMove() {
  if (deltaX < 0) {
    const currentSlide = track.querySelector(".current--slide");
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    if (nextIndex === -1) return;
    currentSlide.tabindex = "-1";
    nextSlide.tabindex = "0";
    moveSlider(currentSlide, nextSlide);
    updateBtn(slides, lbtn, rbtn, nextIndex);
    updateHoverRight(currentSlide, nextSlide);
  } else if (deltaX > 0) {
    const currentSlide = track.querySelector(".current--slide");
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    if (prevIndex === -1) return;
    currentSlide.tabindex = "-1";
    prevSlide.tabindex = "0";
    moveSlider(currentSlide, prevSlide);
    updateBtn(slides, lbtn, rbtn, prevIndex);
    updateHoverLeft(currentSlide, prevSlide);
  }
}
//////// Swipe ^^
const updateBtn = (slides, lbtn, rbtn, sIndex) => {
  if (sIndex === 0) {
    lbtn.classList.add("btn-hidden");
    rbtn.classList.remove("btn-hidden");
  } else if (sIndex === slides.length - 1) {
    rbtn.classList.add("btn-hidden");
    lbtn.classList.remove("btn-hidden");

    const seeBtn = document.querySelector(".see--more");
    if (seeBtn.classList.contains("btn-see")) return;
    seeBtn.classList.add("btn-see");
  } else {
    lbtn.classList.remove("btn-hidden");
    rbtn.classList.remove("btn-hidden");
  }
};

const updateHoverLeft = (currentSlide, prevSlide) => {
  currentSlide.classList.remove("carousel-focus");
  prevSlide.classList.add("carousel-focus");
};
const updateHoverRight = (currentSlide, nextSlide) => {
  currentSlide.classList.remove("carousel-focus");
  nextSlide.classList.add("carousel-focus");
};

const moveSlider = (currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";

  currentSlide.classList.remove("current--slide");
  targetSlide.classList.add("current--slide");
};

rbtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current--slide");
  const nextSlide = currentSlide.nextElementSibling;
  currentSlide.tabindex = "-1";
  nextSlide.tabindex = "0";
  moveSlider(currentSlide, nextSlide);
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  updateBtn(slides, lbtn, rbtn, nextIndex);
  const html = document.querySelector("html");
  if (html.clientWidth < 720) {
    updateHoverRight(currentSlide, nextSlide);
  }
});
lbtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current--slide");
  const prevSlide = currentSlide.previousElementSibling;
  currentSlide.tabindex = "-1";
  prevSlide.tabindex = "0";
  moveSlider(currentSlide, prevSlide);
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  updateBtn(slides, lbtn, rbtn, prevIndex);
  const html = document.querySelector("html");
  if (html.clientWidth < 720) {
    updateHoverLeft(currentSlide, prevSlide);
  }
});
// ##################
// Read More func ##################
const rmText = document.querySelector(".read-more-text");
const rmBtn = document.querySelector(".dots");

window.onload = function () {
  const html = document.querySelector("html");
  if (html.clientWidth > 720) {
    rmText.classList.remove("rm-hidden");
    rmBtn.classList.add("rm-hidden");
  }
};

rmBtn.addEventListener("click", () => {
  rmText.classList.remove("rm-hidden");
  rmBtn.classList.add("rm-hidden");
});
// ###################
// Observer #########
// Carousel ##########
const section = document.querySelectorAll("section");
const carousel = document.querySelector(".carousel");
const option = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -70px 0px",
};
const carouselObs = new IntersectionObserver(function (entries, carouselObs) {
  entries.forEach((entry) => {
    const html = document.querySelector("html");
    if (html.clientWidth < 720) {
      if (!entry.isIntersecting) {
        const currentSlide = document.querySelector(".current--slide");
        currentSlide.classList.remove("carousel-focus");
      } else if (entry.isIntersecting) {
        const currentSlide = document.querySelector(".current--slide");
        currentSlide.classList.add("carousel-focus");
      }
      return;
    }
  });
}, option);
carouselObs.observe(carousel);
// Header ##############
const options = {
  root: null,
  threshold: 0,
  rootMargin: "-10px 0px 0px 0px",
};
const nav = document.querySelector("nav");
const heroCont = document.querySelector(".hero__container");

const navObs = new IntersectionObserver(function (entries, navObs) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      nav.classList.remove("nav--fixed");
    } else if (!entry.isIntersecting) {
      nav.classList.add("nav--fixed");
    }
  });
}, options);
navObs.observe(heroCont);
