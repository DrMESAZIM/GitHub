// Carousel Func ###################

const track = document.querySelector(".carousel__track");
const carouselSlide = document.querySelector(".carousel__slide");
const slides = Array.from(track.children);
const lbtn = document.querySelector(".carousel__button--left");
const rbtn = document.querySelector(".carousel__button--right");
const slideWidth = slides[0].getBoundingClientRect().width;

const arangeSlides = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(arangeSlides);

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
    console.log(seeBtn.classList.contains("btn-see"));
  } else {
    lbtn.classList.remove("btn-hidden");
    rbtn.classList.remove("btn-hidden");
  }
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
});
lbtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current--slide");
  const prevSlide = currentSlide.previousElementSibling;
  currentSlide.tabindex = "-1";
  prevSlide.tabindex = "0";
  moveSlider(currentSlide, prevSlide);
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  updateBtn(slides, lbtn, rbtn, prevIndex);
});
// ##################
// Read More func ##################
const rmText = document.querySelector(".read-more-text");
const rmBtn = document.querySelector(".dots");

rmBtn.addEventListener("click", () => {
  rmText.classList.remove("rm-hidden");
  rmBtn.classList.add("rm-hidden");
});
// ###################
