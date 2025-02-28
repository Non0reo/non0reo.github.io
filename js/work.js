let preview = document.querySelector('.preview');
let selectedProject = null;
let language = 'en';
let scrollPercentage = 0;

/* projectsList = fetch('js/data/projets.json').then(response => response.json()).then(data => {
    let projects = data.projects;
    let projectsList = document.querySelector('#projects');
    projects.forEach(project => {
        let projectElement = document.createElement('li');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        `;
        projectsList.appendChild(projectElement);
    });
    return projectsList;
}); */

fetch('js/data/projects.json').then(response => response.json()).then(data => {
    console.log(data);
    let projectsList = document.querySelector('#projects');
    data.forEach(project => {
        let projectElement = document.createElement('li');
        projectElement.className = 'project';
        projectElement.setAttribute('data-project', project.id);
        projectElement.innerHTML = `
            <div class="project-content">
                <h3 class="text">— ${project.name[language]}</h3>
                <p class="text">${project.year}</p>
            </div>
            <img src="assets/imgs/ui/arrow_right.svg" alt="See more" class="arrow">
        `;
        projectsList.appendChild(projectElement);
    });



    preview.style.display = 'none';
    document.querySelectorAll("#projects > li.project").forEach(element => {    
        element.addEventListener('mouseenter', (e) => {
            preview.style.display = 'block';
            selectedProject = data.find(project => project.id == element.getAttribute('data-project'));
            /* preview.innerHTML = `
                <h3>${selectedProject.name.en}</h3>
                <p>${selectedProject.year}</p>
                <p>${selectedProject.description.en}</p> */
            preview.querySelector('.preview-img').src = getProjectBasePath(selectedProject.id) + 'preview.png';
            preview.querySelector('.preview-title').innerText = selectedProject.name[language];
            preview.querySelector('.preview-year').innerText = selectedProject.year;
        });
    
        element.addEventListener('mouseout', (e) => {
            preview.style.display = 'none';
        });

        element.addEventListener('click', (e) => {
            showProjectPanel();
            const projectView = document.querySelector('#project-view');
            projectView.style.backgroundColor = selectedProject.color;
            projectView.style.transform = 'translateX(50vw)';
            document.querySelector("#main-view").style.width = '50vw';

            projectView.querySelector('.project-title').innerText = selectedProject.name[language];
            projectView.querySelector('.project-year').innerText = selectedProject.year;
            projectView.querySelector('.project-description').innerText = selectedProject.description[language];
            projectView.querySelector('.project-tags').innerHTML = `<span class="text tag">${selectedProject.type[language]}</span>`;
        });
    });
});



document.body.addEventListener('mousemove', (e) => {
    preview.style.left = e.clientX + 'px';
    preview.style.top = e.clientY + 'px';

    const bottomDelta = window.innerHeight - e.clientY;
    if (bottomDelta < preview.clientHeight) {
        preview.style.top = e.clientY - preview.clientHeight + 'px';
    }
});


/* document.body.onscroll = () => {
    scrollPercentage = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight ) * 100;

    if (scrollPercentage > 50) {
        backgroundChangeAnim({clientX: window.innerWidth / 2, clientY: window.innerHeight / 2}, 1);
    }
} */



function showProjectPanel() {
    document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
}

function getProjectBasePath(id) {
    return `assets/imgs/projects/${id}/`;
}