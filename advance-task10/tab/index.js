var tabs = document.querySelectorAll('.tab-ct .header>li');
var panels = document.querySelectorAll('.tab-ct .content>li');

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
        tabs.forEach(function (node) {
            node.classList.remove('active');
        })
        this.classList.add('active');
        var index = [].indexOf.call(tabs, this);

        panels.forEach(function(node){
            node.classList.remove('active');
        })
        panels[index].classList.add('active');
    })
})
