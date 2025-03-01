function createCustomText() {
    let spans = document.querySelectorAll('span.custom-text');
    spans.forEach(span => {
        const text = span.getAttribute('data-text');
        const effect = span.getAttribute('data-effect');
        span.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            let spanChar = document.createElement('span');
            spanChar.innerText = char;
            span.appendChild(spanChar);

            switch(effect) {
                case 'boat':
                    spanChar.style.animation = `boat 1s infinite`;
                    spanChar.style.fontWeight = 'bold';
                    break;
                case 'wave':
                    spanChar.style.animation = `wave 1s infinite`;
                    spanChar.style.animationDelay = `${i * 0.05}s`;
                    spanChar.style.fontWeight = 'bold';
                    break;
                case 'typewriter':
                    const startWait = 5000;
                    const speed = 400;
                    const totalWait = text.length * speed + startWait;
                    spanChar.style.opacity = '0';
                    setTimeout(() => {
                        spanChar.style.display = 'inline-block';
                        spanChar.style.opacity = `${1.1 * Math.pow(Math.E, -1.9 * i / text.length) -0.2}`;
                    }, i * speed + startWait);

                    break;
            }
        }

    });
}

createCustomText();


document.querySelector('#see-projects-btn').addEventListener('click', (e) => {
    /* document.querySelector('.projects').scrollIntoView({behavior: 'smooth'}); */
    backgroundChangeAnim(1);
    console.log(e)
});