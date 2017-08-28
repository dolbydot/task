var btn = document.querySelector('#btn-modal'),
    modal = document.querySelector('#modal-1'),
    modalCt = document.querySelector('.modal-ct'),
    close = document.querySelector('#modal-1 .close'),
    btnCancel = document.querySelector('.btn-cancel');

var hidden = function () {
    modal.classList.add('open');
}

var show = function () {
    modal.classList.remove('open');
}

btn.addEventListener('click', hidden);

close.addEventListener('click', show);

btnCancel.addEventListener('click', show);

modal.addEventListener('click', show);

modalCt.addEventListener('click', function (e) {
    e.stopPropagation();
})

