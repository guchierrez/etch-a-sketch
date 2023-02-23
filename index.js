/*========================================
============1. GRID CREATION==============
========================================*/

const sketchpad = document.querySelector(".sketchpad");
const gridButton = document.getElementById("grid-size");

function createGrid8() {
  gridButton.textContent = "8 X 8";
  for (i = 0; i < 4096; i++) {
    const grid8 = document.createElement("div");
    grid8.className = "block s8x8";
    grid8.setAttribute("id", `block-${i}`);
    sketchpad.appendChild(grid8);
  }
}

function createGrid16() {
  gridButton.textContent = "16 X 16";
  for (i = 0; i < 1024; i++) {
    const grid16 = document.createElement("div");
    grid16.className = "block s16x16";
    grid16.setAttribute("id", `block-${i}`);
    sketchpad.appendChild(grid16);
  }
}

function createGrid32() {
  gridButton.textContent = "32 X 32";
  for (i = 0; i < 256; i++) {
    const grid32 = document.createElement("div");
    grid32.className = "block s32x32";
    grid32.setAttribute("id", `block-${i}`);
    sketchpad.appendChild(grid32);
  }
}

/*========================================
============2. BUTTON STYLING==============
========================================*/

const pencilButton = document.getElementById("pencil");
const rainbowButton = document.getElementById("rainbow");
const eraserButton = document.getElementById("eraser");

function unselectButtons(index) {
  let buttons = document.querySelectorAll("button");
  for (i = index; i < buttons.length; i++) {
    buttons[i].className = "";
  }
}

pencilButton.addEventListener("click", function () {
  unselectButtons(1);
  pencilButton.classList.toggle("selected");
});

rainbowButton.addEventListener("click", function () {
  unselectButtons(1);
  rainbowButton.classList.toggle("selected");
});

eraserButton.addEventListener("click", function () {
  unselectButtons(1);
  eraserButton.classList.toggle("selected");
});

/*========================================
=========3. GRID CONFIGURATION============
========GRID BUTTON FUNCTIONALITY=========
========================================*/

function addSketchpadStyle() {
  document.getElementById("main").style.gap = "4em";
  sketchpad.style.outline = "solid 1px black";
  sketchpad.style.boxShadow = "rgb(0, 0, 0, 0.35) 0px 5px 15px";
}

function removeGrid() {
  const blocks = document.querySelectorAll(".block");
  for (i = 0; i < blocks.length; i++) {
    blocks[i].remove();
  }
}

let clicked1 = false;
let clicked2 = false;

gridButton.addEventListener("click", function () {
  addSketchpadStyle();
  unselectButtons(0);
  gridButton.className = "selected";
  if (clicked1 == false) {
    removeGrid();
    createGrid8();
    clicked1 = true;
  } else if (clicked1 && clicked2 == false) {
    removeGrid();
    createGrid16();
    clicked2 = true;
  } else if (clicked1 && clicked2) {
    removeGrid();
    createGrid32();
    clicked1 = false;
    clicked2 = false;
  }
});

/*========================================
======4. RESET BUTTON FUNCTIONALITY=======
========================================*/

function resetGrid() {
  const blocks = document.querySelectorAll(".block");
  for (i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = "white";
  }
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  resetGrid();
});

/*========================================
======5. DRAWING BUTTON FUNCTIONALITY=====
=======PENCIL, RAINBOW AND ERASER=========
========================================*/

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

pencilButton.addEventListener("click", function () {
  sketchpad.addEventListener("mousedown", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    e.target.style.backgroundColor = "black";
  });
  sketchpad.addEventListener("mouseover", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    e.target.style.backgroundColor = "black";
  });
});

const colors = [
  "#9400D3",
  "#4B0082",
  "#0000FF",
  "#00FF00",
  "#FFFF00",
  "#FF7F00",
  "#FF0000",
];

rainbowButton.addEventListener("click", function () {
  sketchpad.addEventListener("mousedown", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    let randomColors = colors[(colors.length * Math.random()) | 0];
    e.target.style.backgroundColor = randomColors;
  });
  sketchpad.addEventListener("mouseover", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    let randomColors = colors[(colors.length * Math.random()) | 0];
    e.target.style.backgroundColor = randomColors;
  });
});

eraserButton.addEventListener("click", function () {
  sketchpad.addEventListener("mousedown", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    e.target.style.backgroundColor = "white";
  });
  sketchpad.addEventListener("mouseover", (e) => {
    if (e.type === "mouseover" && !mouseDown) return;
    e.target.style.backgroundColor = "white";
  });
});
