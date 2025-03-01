// document.querySelector('#project-view').style.transform = 'translateX(0vw)';

const closeButton = document.querySelector('#project-view .leave-view');

closeButton.addEventListener('click', (e) => {
    console.log('close');
    document.querySelectorAll("#projects > li.project").forEach(element => {
        element.classList.remove('active');
    });
    document.querySelector('#project-view').style.transform = 'translateX(100vw)';
    document.querySelector("#main-view").style.width = '100vw';
    document.querySelector("#home .text").style.fontSize = '2rem';
});