const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

const newsletterButton = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");

newsletterButton.forEach(button => {
    button.addEventListener("click", () => {
        modal.classList.add("show");
    });
});

const close = document.querySelector(".close");

close.addEventListener("click", () => {
    modal.classList.remove("show");
});

const accordions = document.querySelectorAll(".accordions .title");
accordions.forEach(accordion => {
    accordion.addEventListener("click", event => {
        event.target.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("active");
    })
});

function updateCarousel(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: window.innerWidth < 960 ? 1 : 3,
        spaceBetween: 30,
        slidesPerGroup: window.innerWidth < 960 ? 1 : 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
    });
}
updateCarousel();

window.onresize = () => {
    // console.log(window.innerWidth);
    updateCarousel();
}



//website 
//https://codesandbox.io/p/sandbox/swiper-infinite-loop-with-slides-per-group-f78yv4?file=%2Findex.html%3A105%2C10