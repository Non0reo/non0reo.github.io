// document.querySelector('#project-view').style.transform = 'translateX(0vw)';

const closeButton = document.querySelector('#project-view .leave-view');

closeButton.addEventListener('click', (e) => {
    console.log('close');
    document.querySelector('#project-view').style.transform = 'translateX(100vw)';
    document.querySelector("#main-view").style.width = '100vw';
});