const checkUpper = document.querySelector(".check-upper");
const checkLower = document.querySelector(".check-lower");
const checkNumber = document.querySelector(".check-number");
const checkSymbol = document.querySelector(".check-symbol");
const checks = document.querySelectorAll(".check");
const btnGenerate = document.querySelector(".btn-generate");
const fieldPwd = document.querySelector(".pwd");
const length = document.querySelector(".length");
const copyBtn = document.querySelector(".container-logo-copy");
const copyPopUp = document.querySelector(".copy");
const allLevel = document.querySelectorAll(".level-bar");
const txtLevel = document.querySelector(".txt-level");
const generateBtnTxt = document.querySelector(".txt-generate");
const logoArrow = document.querySelector(".logo-arrow");
const slider = document.querySelector("input");
const progressBar = document.querySelector("progress");


////////////////////////////////////////////////////////////////////////


const renderLowerCase  = function() {
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
  const num = Math.floor(Math.random() * alphabet.length);
  return alphabet[num];
}


const renderNumbers  = function() {
  const num = Math.floor(Math.random() * 10);
  return num;
}


const renderSymbol = function() {
  const symbols = "~!@#$%^*()_-+={[}]:.,?";
  const num = Math.floor(Math.random() * symbols.length);
  return symbols[num];
}


const recursionMixPassword = function (pwd, password) {

  if(pwd.length === 0) return;
  if(pwd.length === 1) return password.push(pwd[0]);

  let arr = [...pwd];
  const rand = Math.floor(Math.random() * arr.length);
  password.push(arr[rand]);
  arr = arr.join("").replace(arr[rand], "/").match(/[^/]/g);

  return recursionMixPassword(arr, password);
}


const renderPassword = function() {

  let pwd = [];
  const password = [];
  const num = Number(length.innerHTML);

  while(pwd.length < num){
    if(checkUpper.dataset.clicked === "true") pwd.push(renderLowerCase().toUpperCase());
    if(checkLower.dataset.clicked === "true") pwd.push(renderLowerCase());
    if(checkNumber.dataset.clicked === "true") pwd.push(renderNumbers());
    if(checkSymbol.dataset.clicked === "true") pwd.push(renderSymbol());
    if(checkUpper.dataset.clicked === "false" && checkLower.dataset.clicked === "false" && checkNumber.dataset.clicked === "false" && checkSymbol.dataset.clicked === "false") break;
 }

 pwd.length = num;

 recursionMixPassword(pwd, password);

 return password.join("");
}


const setLevelOnClick = function() {

  const level = length.innerText;

  if( level > 0 && level < 5) {
    txtLevel.innerHTML = "TOO WEAK!";

    allLevel.forEach( el => el.style.border = "2px solid var(--almost-white, #E6E5EA)");
    allLevel[0].style.border = "2px solid var(--1-red, #F64A4A)";

    allLevel.forEach( el => el.style.backgroundColor = "#18171F");
    allLevel[0].style.backgroundColor = "var(--1-red, #F64A4A)";

  } else if( level >= 5 && level < 8) {
    txtLevel.innerHTML = "WEAK";

    allLevel.forEach( el => el.style.border = "2px solid var(--almost-white, #E6E5EA)");
    [...allLevel].slice(0, -2).forEach( el => el.style.border = "2px solid var(--2-orange, #FB7C58)");

    allLevel.forEach( el => el.style.backgroundColor = "#18171F");
    [...allLevel].slice(0, -2).forEach( el => el.style.backgroundColor = "var(--2-orange, #FB7C58)");
  } else if( level >= 8 && level < 11) {
    txtLevel.innerHTML = "MEDIUM";

    allLevel.forEach( el => el.style.border = "2px solid var(--almost-white, #E6E5EA)");
    [...allLevel].slice(0, -1).forEach( el => el.style.border = "2px solid var(--3-yellow, #F8CD65)");

    allLevel.forEach( el => el.style.backgroundColor = "#18171F");
    [...allLevel].slice(0, -1).forEach( el => el.style.backgroundColor = "var(--3-yellow, #F8CD65)");
  } else if(level >= 11) {
    txtLevel.innerHTML = "STRONG";

    allLevel.forEach( el => el.style.border = "2px solid var(--neon-green, #A4FFAF)");
    allLevel.forEach( el => el.style.backgroundColor = "var(--neon-green, #A4FFAF)");
  } else {
    txtLevel.innerHTML = "";

    allLevel.forEach( el => el.style.border = "2px solid var(--almost-white, #E6E5EA)");
    allLevel.forEach( el => el.style.backgroundColor = "#18171F");
  }
}


const renderNumCaracters = function(value) {

  numTrue = [...checks].map( el => el.dataset.clicked).filter( el => el === "true").length;

  let num = Math.round((value / 10) * 2);
  length.innerHTML = `${num}`;

  if(num <= numTrue) {
    length.innerHTML = `${numTrue}`;
    num = numTrue;
    slider.value = numTrue * 5;
    progressBar.value = slider.value;
  }
  
  return num;   
}


const copyText = async function() {
  try {

    let text = fieldPwd.innerText;

    // Create a box(HTML element) were to store the text(password) in it and i add it to the body
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.style.display = "none";

    // I select the text to copy inside the box newly created
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    // i copy the text selected
    await navigator.clipboard.writeText(text);

    // Once copied i remove the box
    document.body.removeChild(tempTextArea);
    window.getSelection().removeAllRanges();

  } catch(err) {
    console.error('Failed to copy text: ', err);
  }
}


const btnGenerateHover = function() {

  btnGenerate.style.backgroundColor = "var(--dark-grey, #24232C)";
  btnGenerate.style.border = "3px solid var(--neon-green, #A4FFAF)";
  generateBtnTxt.style.color = "var(--neon-green, #A4FFAF)";
  logoArrow.setAttribute("fill", "var(--neon-green, #A4FFAF)"); 
}


const btnGenerateDefault = function() {

  btnGenerate.style.backgroundColor = "var(--neon-green, #A4FFAF)";
  btnGenerate.style.border = "none";
  generateBtnTxt.style.color = "var(--dark-grey, #24232C)";
  logoArrow.setAttribute("fill", "#24232C"); 
}


const btnGenerateActionClick = function(num) {

  if(num === 0) {
    fieldPwd.innerHTML = "You must select at least one of the options below";
    fieldPwd.classList.add("error");
  } else {
    fieldPwd.classList.remove("error");
    fieldPwd.innerHTML = `${renderPassword()}`;
  } 
}


////////////////////////////////////////////////////////////////////////////////////////


slider.addEventListener("input", function(e) {

  progressBar.value = slider.value;
  renderNumCaracters(slider.value);
  setLevelOnClick();  
})


////////////////////////////////////////////////////////////////////////////


const setChecksBoxes = function(element, typeEvent) {

  element.addEventListener(typeEvent, function(e) {
    e.preventDefault()

    element.classList.toggle("check-toggle");   
   
    if(element.dataset.clicked === "false") {
       element.dataset.clicked = "true";
  
       numTrue = [...checks].map( element => element.dataset.clicked).filter( element => element === "true").length;
  
       if(Number(length.innerHTML) < 4 && Number(length.innerHTML) < numTrue) {
         length.innerHTML = Number(length.innerHTML) + 1;
         slider.value = Number(slider.value) + 5;
         progressBar.value = slider.value;
       }
    } else {
       element.dataset.clicked = "false";
    } 
  })

}


checks.forEach( (el) => setChecksBoxes(el, "click"));
checks.forEach( (el) => setChecksBoxes(el, "touchend"));


////////////////////////////////////////////////////////////////////////////


btnGenerate.addEventListener("mouseover", function(e) {
  e.preventDefault();

  btnGenerateHover();
})


btnGenerate.addEventListener("mouseout", function(e) {
  e.preventDefault();

  btnGenerateDefault();
})


btnGenerate.addEventListener("click", function(e) {
  e.preventDefault();

  numTrue = [...checks].map( el => el.dataset.clicked).filter( el => el === "true").length;

  btnGenerateActionClick(numTrue);

})


btnGenerate.addEventListener("touchstart", function(e) {
  e.preventDefault();

  btnGenerateHover();
}, {passive: false})


btnGenerate.addEventListener("touchend", function(e) {
  e.preventDefault();

  btnGenerateDefault();

  numTrue = [...checks].map( el => el.dataset.clicked).filter( el => el === "true").length;

  btnGenerateActionClick(numTrue);

}, {passive: false})


///////////////////////////////////////////////////////////////////////////


copyBtn.addEventListener("mouseover", function(e) {
  e.preventDefault();

  copyPopUp.classList.add("copy-pop-up");
  copyPopUp.innerHTML = "COPY";

});


copyBtn.addEventListener("mouseout", function(e) {
  e.preventDefault();

  copyPopUp.classList.remove("copy-pop-up");
  copyPopUp.innerHTML = "";

});


copyBtn.addEventListener("click", function(e) {

    copyPopUp.classList.add("copy-pop-up");
    copyPopUp.innerHTML = "COPIED";
    copyText();
})


copyBtn.addEventListener("touchstart", function(e) {
  e.preventDefault();

  if(e.target === copyPopUp) return;

  copyPopUp.style.transition = "none";
  copyPopUp.classList.add("copy-pop-up");
  copyPopUp.innerHTML = "COPIED";

}, {passive: false});


copyBtn.addEventListener("touchend", function(e) {
  e.preventDefault();

  if(e.target === copyPopUp) return;
 
  copyText();

  setInterval( function() {
          
    copyPopUp.classList.remove("copy-pop-up");
    copyPopUp.innerHTML = "";    
  },500);
  
}, {passive: false});



// let isMouseDown = false;
// let startX = 0;

// slider.addEventListener('mousedown', handleMouseDown);
// slider.addEventListener('mouseup', handleMouseUp);
// slider.addEventListener('mousemove', handleMouseMove);

// function handleMouseDown(event) {
//   isMouseDown = true;
//   startX = event.clientX;
// }

// function handleMouseUp() {
//   isMouseDown = false;
// }

// function handleMouseMove(event) {
//   if (isMouseDown) {
//     const endX = event.clientX;

//     // Calculate the mouse direction
//     const directionX = endX - startX;

//     if(directionX > 0) {
//       setLevelOnClick();
//     } 

//     if(directionX < 0) {
//       console.log("left");
//       setLevelOnClick();
      
//     }
//     startX = endX;
//   }
// }




// slider.addEventListener('touchstart', function handleMouseDown(event) {
  
//   isMouseDown = true;
//   startX = event.touches[0].pageX;
// }, {passive: false});


// slider.addEventListener('touchmove', function handleMouseUp(event) {

//   if (isMouseDown) {
//     let endX = event.touches[0].pageX;
    
//     const directionX = endX - startX;

//     if(directionX > 0) {
//       setLevelUp();
//     } 

//     if(directionX < 0) {
//       setLevelDown();
      
//     }
//     startX = endX;
//   }
  
// }, {passive: false});


// slider.addEventListener('touchend', function handleMouseMove(event) {
//   isMouseDown = false;
  
// }, {passive: false});