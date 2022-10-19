var blobitem = document.querySelector("#blobitem");
var holdprompt = document.querySelector("#hoverprompt");
var infohidden = document.querySelectorAll(".infohidden");

// Lerping positions
var blobX = 0, blobY = 0;
var mouseX = 0; mouseY = 0;
var blobScale = 1;
var lerpFactor = 0.2;
var state = "normal";

//Update mouse coordinates
document.addEventListener('mousemove', updateTargets);
function updateTargets(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

// Handlers for big and smallifying the circle
var m1 = false;
document.addEventListener('mousedown', () => { state = "big"; holdprompt.classList.add("hidden"); m1 = true });
document.addEventListener('mouseup', () => { state = "normal"; m1 = false; setTimeout(hoverAgain, 3000); });
function hoverAgain() {
    if (!m1)
        holdprompt.classList.remove("hidden")
}

// INTERACTIONS
function loop() {
    moveBlob()
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

function moveBlob() {
    //Handle mouse tracking
    blobX = lerp(blobX, mouseX, 0.2);
    blobY = lerp(blobY, mouseY, 0.2);

    //Handle Scale
    if (state == "normal") blobScale = lerp(blobScale, .3, lerpFactor * 0.5);
    if (state == "big") blobScale = lerp(blobScale, 6, lerpFactor * 0.5);

    //Set final attributes
    blobitem.setAttribute("transform", "translate(" + blobX + " " + blobY + ") scale(" + blobScale + ")")
    holdprompt.style.left = blobX + "px";
    holdprompt.style.top = blobY - 20 + "px";
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

// ANIMATE BEGINNING
(() => {
    for (item of infohidden) {
        item.classList.remove("infohidden");
    }
})()