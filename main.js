let controller;
let slideScene;
let pageScene;

function animateSlides(){
    //init controller
    controller = new ScrollMagic.controller();
    //select some things
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //loop over each slide
    sliders.forEach(slide =>{
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        //GSAP
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        });
        slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.5");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
        //create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerhook: 0.25,
            reverse: false
        })
            .setTween(slideTl)
            .addIndicators({
                colorstart: "white",
                colortrigger: "white",
                name: "slide"
            })
            .addTo(controller);
        //add new animations
        const pageTl = gsap.timeline();
        let nextSlide = slides.legth - 1 === index ? 'end' : slides[index + 1];
        pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        //create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerhook: 0
        })
            .addIndicators({
                colorstart: "white",
                colortrigger: "white",
                name: "slide",
                indent: 200
            })
            .setPin(slide, {pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller);
    });
}

let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";

}
function acriveCursor(e) {
    const item = e.target;
    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("nav-active");
    } else {
        mouse.classList.remove("nav-active");
    }
    if (item.classlist.contains("eplore")){
        mouse.classlist.add("explore-active");
        gsap.to(".title-swipe", 1, { y: "0%" });
        mouseTxt.innertext = "tap";
    } else{
        mouse.classlist.remove("explore-active");
        mouseTxt.innertext = "";
        gsap.to(".title-swipe", 1, { y: "100%" });
    }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();