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
            <img src="assets/imgs/ui/arrow_right.svg" alt="See more" class="arrow need-invert">
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
            preview.querySelector('.preview-img').src = getProjectBasePath(selectedProject.id) + '0.png';
            preview.querySelector('.preview-title').innerText = selectedProject.name[language];
            preview.querySelector('.preview-year').innerText = selectedProject.year;
        });
    
        element.addEventListener('mouseout', (e) => {
            preview.style.display = 'none';
        });

        element.addEventListener('click', (e) => {
            //showProjectPanel();
            const projectView = document.querySelector('#project-view');
            projectView.style.backgroundColor = selectedProject.color || /* 'transparent' */document.documentElement.style.getPropertyValue('--color1');
            projectView.style.transform = 'translateX(50vw)';
            document.querySelector("#main-view").style.width = '50vw';
            document.querySelector("header").style.width = '50vw';
            document.querySelector("#home .text").style.fontSize = '1rem';

            document.querySelectorAll("#projects li.project").forEach(element => {
                element.classList.remove('active');
            });
            element.classList.add('active');
            
            projectView.querySelector('.project-title').innerText = selectedProject.name[language];
            projectView.querySelector('.project-year').innerText = selectedProject.year;
            projectView.querySelector('.project-description').innerText = selectedProject.description[language];
            projectView.querySelector('.project-tags').innerHTML = `<span class="text tag">${selectedProject.type[language]}</span>`;
            projectView.querySelector('.project-pictures').innerHTML = '';
            if (!selectedProject.filecount) return;
            for (let i = 0; i < selectedProject.filecount; i++) {
                let img = document.createElement('img');
                img.src = getProjectBasePath(selectedProject.id) + i + '.png';
                projectView.querySelector('.project-pictures').appendChild(img);

                // img.style.right = `${Math.random() * 50}%`;
                // img.style.bottom = `${Math.random() * 30}%`;
                //img.style.transform = `rotate(${Math.random() * 360}deg) translate(-50%, -50%)`;

                img.style.top = `${i * 10}px`;
                img.style.left = `${i * 10}px`;
            }
        });
    });


    let concernedElements = [
        ...document.querySelectorAll('.text'),
        ...document.querySelectorAll('.project'),
        ...document.querySelectorAll('.tag'),
        ...document.querySelectorAll('.need-invert'),
        ...document.querySelectorAll('.need-child-invert'),
        /* ...document.querySelectorAll('#work') */
    ];

    concernedElements.forEach((el, i) => {
        let div = document.createElement('div');
        div.classList.add('invert-element');
        console.log(el.classList, el.classList.contains('.need-child-invert'));

        if(!el.classList.contains('need-child-invert')) {
            el.parentNode.insertBefore(div, el);
            div.appendChild(el);
        } else {
            //put el content in the div, remove the content of el and put the div inside the element
            div.innerHTML = el.innerHTML;
            el.innerHTML = '';
            el.appendChild(div);
        }
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
window.addEventListener('scroll', (e) => {
    const scrollAmount = (document.body.scrollTop || document.documentElement.scrollTop);
    const pageSize = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollAmount / pageSize * 100;
    //console.log(scrollAmount, pageSize, scrollPercentage);
    //console.log(document.documentElement.scrollTop, window.innerHeight, document.documentElement.scrollHeight - document.documentElement.clientHeight, scrollPercentage);
    console.log(scrollAmount, window.innerHeight);

    let activeBackground = background.id.replace('background', '');

    //if (scrollAmount > window.innerHeight) {
    /* if (scrollAmount > 0) {
        if (activeBackground === '1') {
            backgroundChangeAnim(1);
        }

        const middle = scrollPercentage + window.innerHeight / 2;
        const projectsDiv = document.querySelector('#work');

        //projectsDiv.style.transform = `translateY(${middle}px)`;


    }
    if (scrollAmount < window.innerHeight) {
        if (activeBackground === '2') {
            backgroundChangeAnim(1);
        }
    } */
});



function scrollToElement(query) {
    closeProjectView();
    const element = document.querySelector(query);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 300;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });

}

function getProjectBasePath(id) {
    return `assets/imgs/projects/${id}/`;
}