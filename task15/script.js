window.onload = function () {
    var body = document.querySelector('body');
    var header1 = document.querySelector('.header1');
    body.onscroll = function () {
        if (body.scrollTop > 800) {
            header1.style.background = "#000";
        }
        else {
            header1.style.background = "transparent";
        }
    }
}