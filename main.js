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
const burger = document.querySelector(".burger");
function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";

}
function activeCursor(e) {
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
function navtoggle(e){
    if (!e.target.classlist.contains('active')){
    e.target.classList.add('active');
    gsap.to("line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to("line2", 0.5, { rotate: "-45", y: 5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to("nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
} else {
        e.target.classList.remove('active');
        gsap.to("line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to("nav-bar", 1, { clippath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
    }
}

//eventlister
burger.addEventListener("click", navtoggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();