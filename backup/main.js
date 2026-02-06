const topbar = document.querySelector('.topbar_scrolled');

window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        topbar.style.display="flex";
    }
    else{
        topbar.style.display="none";
    }
})