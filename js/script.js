//background animations
let background = document.getElementById('background1');
let largestSide = () => {
    const side = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight
    return side * 2;
};
let largestDiagonal = () => {
    return Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) * 2;
};

function backgroundNone() {
    background.style.transitionDuration = '0s';
    background.style.transitionTimingFunction = 'none';
    background.style.transitionProperty = 'none';
    background.style.width = '0vw';
    background.style.height = '0vw';
    /* background.style.transform = 'none'; */
}

function backgroundPoint(size = 2) {
    background.style.transition = 'width 1s cubic-bezier(.67,.21,.19,1.03), height 1s cubic-bezier(.67,.21,.19,1.03)';
    background.style.transform = 'translate(-50%, -50%)';
    background.style.width = size + 'vw';
    background.style.height = size + 'vw';
    background.style.borderRadius = '50%';
}

function backgroundBar(percent) {
    background.style.height = '100vw';
    background.style.transitionDuration = '1s';
    background.style.transitionTimingFunction = 'cubic-bezier(.33,.79,.81,-0.03)';
    background.style.width = percent + 'dvw';
    
    background.style.borderRadius = '0';
}

function backgroundGrow(rule, value, duration = 1) {
    background.style.inset = '0';

    switch (rule) {
        case 'topRight':
            background.style.top = '0';
            background.style.left = '100%';
            break;
        case 'topLeft':
            background.style.top = '0';
            background.style.left = '0';
            break;
        case 'center':
            background.style.top = '50%';
            background.style.left = '50%';
            break;
        case 'custom':
            background.style.top = value.top;
            background.style.left = value.left;
            break;
    }


    
    background.style.borderRadius = '50%';
    background.style.transform = 'translate(-50%, -50%)';
    background.style.transition = `width ${duration}s ease-in-out, height ${duration}s ease-in-out`;
    background.style.width = largestDiagonal() + 'px';
    background.style.height = largestDiagonal() + 'px';
   
}


document.body.addEventListener('mousemove', (e) => {
    background.style.left = e.clientX + 'px';
    background.style.top = e.clientY + 'px';
});

/* document.body.addEventListener('mousedown', (e) => {
    backgroundGrow('custom', {
        top: e.clientY + 'px',
        left: e.clientX + 'px',
    });
    setTimeout(() => {
        backgroundNone();
        swapRootColors();
    }, 1000);
});
document.body.addEventListener('mouseup', (e) => backgroundPoint()); */


//timing func: cubic-bezier(.67,.21,.19,1.03);
//timing inverse: cubic-bezier(.33,.79,.81,-0.03);



//Size on Load

window.onload = () => {
    /* console.log(
        '%cShantay you stay!',
        'color:rgb(255, 255, 255); padding: 15px; font-size: 50px; text-shadow: 2px 2px 0 rgb(255, 0, 0), 4px 4px 0 rgb(255, 165, 0), 6px 6px 0 rgb(255, 255, 0), 8px 8px 0 rgb(0, 128, 0), 10px 10px 0 rgb(0, 0, 255), 12px 12px 0 rgb(75, 0, 130), 14px 14px 0 rgb(238, 130, 238);'
    ); */
    document.documentElement.style.setProperty('--color1', 'white')
    document.documentElement.style.setProperty('--color2', 'black')
      
    backgroundPoint();

    document.querySelector('h1').style.opacity = '1';
    document.querySelector('h1').style.animation = 'fadeIn 2s ease-in-out forwards';

    document.querySelectorAll('.nav-links').forEach((btn, i) => {
        btn.style.opacity = '0';
        setTimeout(() => {
            btn.style.animation = 'fadeIn 2s ease-in-out forwards, pushLeft 2s forwards';
        }, i * 200);
    });
}



/* function swapRootColors() {
    const color1 = document.documentElement.style.getPropertyValue('--color1')
    const color2 = document.documentElement.style.getPropertyValue('--color2')
    document.documentElement.style.setProperty('--color1', color2)
    document.documentElement.style.setProperty('--color2', color1)
} */


function changeMainBackgorund() {
    let activeBackground = background.id.replace('background', '');
    // background.style.transitionProperty = 'none';
    // background.style.transitionDuration = '0s';
    // background.style.transitionTimingFunction = 'none';
    background.style.zIndex = '-10';
    background.style.top = '50%';
    background.style.left = '50%';

    background = activeBackground === '1' ? document.getElementById('background2') : document.getElementById('background1');
    background.style = '';
    background.style.zIndex = '-5';
    background.style.width = '0';
    background.style.height = '0';
    
}

let pointTimeout;
function backgroundChangeAnim(e, duration) {
    clearTimeout(pointTimeout);
    backgroundGrow('custom', {
        top: e.clientY + 'px',
        left: e.clientX + 'px',
    }, duration);
    
    pointTimeout = setTimeout(() => {
        changePoint(e);
    }, duration * 1000);


    //swapRootColors();
    
    /* setTimeout(() => {
        backgroundNone();
        
        setTimeout(() => {
            backgroundPoint();
        }, 10);
        // backgroundNone();
        // console.log(background.style.width, background.style.height)
        // backgroundPoint(10);
        // console.log(background.style.width, background.style.height)
    }, duration * 1000); */
}

function changePoint(e) {
    changeMainBackgorund();
    backgroundNone();
    background.style.transition = 'top 0.1s ease-in-out, left 0.1s ease-in-out';
    background.style.left = e.clientX + 'px';
    background.style.top = e.clientY + 'px';

    setTimeout(() => {
        backgroundPoint();
    }, 10);
}