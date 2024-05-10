// Start Angle in Radians
const START_ACUTE = (Math.floor(Math.random() * 31) + 30) * (Math.PI/180);
let quadrant = Math.floor(Math.random() * 4)
const START_X = Math.floor(Math.random() * window.screen.availWidth);
const START_Y = Math.floor(Math.random() * window.screen.availHeight);
const SPEED = 10;
let xpos = START_X;
let ypos = START_Y;
let c = setInterval(COLOR, 100);
let m = setInterval(MOVE, 10);

// On unfocus
document.body.onblur = () => {
    // Choose random width and height, x and y for new window
    let w = Math.floor(Math.random() * window.screen.width);
    let h = Math.floor(Math.random() * window.screen.height);
    // Open new window to the same page
    window.open(
        window.location.href, // URL
        "_blank", // Target (_blank means new window or tab)
        `width=${w},height=${h}` // Specs and Parameters
    );
}

// Set color background
function COLOR()
{
    // Generate random numbers for each color channel
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.floor(Math.random() * 255);
    // Set Random Color
    document.body.style = `background-color:rgba(${r},${g},${b},${a});`;
}

// Move window
function MOVE()
{
    switch(quadrant)
    {
        case 0: // Q1 (A)
            xpos += SPEED * Math.cos(START_ACUTE);
            ypos -= SPEED * Math.sin(START_ACUTE);
            if (ypos < 0) quadrant = 3; // Q4
            if (xpos + window.outerWidth > window.screen.availWidth)
            {
                quadrant = Math.floor(quadrant / 3) + 1; // Q1(0)->Q2(1) or Q4(3)->Q3(2)
            }
            break;
        case 1: // Q2 (S)
            xpos += -1 * SPEED * Math.cos(START_ACUTE);
            ypos -= SPEED * Math.sin(START_ACUTE);
            if (ypos < 0) quadrant = 2; // Q3
            if (xpos < 0) quadrant = (quadrant - 1) * 3 // Q2(1)->Q1(0) or Q3(2)->Q4(3)
            break;
        case 2: // Q3 (T)
            xpos += -1 * SPEED * Math.cos(START_ACUTE);
            ypos -= -1 * SPEED * Math.sin(START_ACUTE);
            if (ypos + window.outerHeight > window.screen.availHeight) quadrant = 1; // Q2
            if (xpos < 0) quadrant = (quadrant - 1) * 3;
            break;      
        case 3: // Q4 (C)
            xpos += SPEED * Math.cos(START_ACUTE);
            ypos -= -1 * SPEED * Math.sin(START_ACUTE);
            if (ypos + window.outerHeight > window.screen.availHeight) quadrant = 0; // Q1
            if (xpos + window.outerWidth > window.screen.availWidth)
            {
                quadrant = Math.floor(quadrant / 3) + 1 // Q1(0)->Q2(1) or Q4(3)->Q3(2)
            }
            break;
    }
    window.moveTo(xpos, ypos);
}

// Make sure user cannot clear interval
c = null;
m = null;
