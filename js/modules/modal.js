function openModalWindow (modalWindowSelector, modalTimer) {
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.add('show', 'fade');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimer);
    if (modalTimer) {
       clearInterval(modalTimer); 
    }
    
}

function closeModal(modalWindowSelector) {
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}

function modal(openModalSelector, modalWindowSelector, modalTimer) {
    // Modal

    const modalOpen = document.querySelectorAll(openModalSelector),
          modalWindow = document.querySelector(modalWindowSelector);
    //   modalClose = document.querySelector('[data-close]');

    modalOpen.forEach(i => {
        i.addEventListener('click', () => openModalWindow(modalWindowSelector, modalTimer));
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalWindowSelector, modalTimer);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show', 'fade')) {
            closeModal(modalWindowSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalWindowSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default modal;
export {closeModal};
export {openModalWindow};