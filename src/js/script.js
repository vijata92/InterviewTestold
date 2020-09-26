//Make the DIV element draggagle:

dragElement(document.getElementById("blueDiv"));

var diffX;
var diffY;
var initialX;
var initialY;
var newX;
var newY;
var boundryX;
var boundryY;

function dragElement(elmnt) {
  var posX = 0, posY = 0;
  var dragItem = document.getElementById("blueDiv");
  var container = document.getElementById("yellowDiv");
  
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // set the draggable item background colour
    elmnt.style.background = "red";
    // get the mouse cursor and element position at startup:
    posX = e.clientX;
    posY = e.clientY;
    initialX = elmnt.offsetLeft;
    initialY = elmnt.offsetTop;
    diffX = posX - initialX;
    diffY = posY - initialY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    
      document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    boundryX = container.offsetWidth - dragItem.offsetWidth;
    boundryY = container.offsetHeight - dragItem.offsetHeight;
    posX = e.clientX;
    posY = e.clientY;
    newX = posX - diffX;
    newY = posY - diffY;
              
    if((newX>0)&&(newX<boundryX)&&(newY>0)&&(newY<boundryY)) {             
      // set the element's new position:
      elmnt.style.top = (newY) + "px";
      elmnt.style.left = (newX) + "px";
    }

  }

  function closeDragElement() {
    elmnt.style.background = "blue";
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  

  var resizeBtn = document.getElementById('resize');

  resizeBtn.addEventListener('click', function init() {
      var resizer = document.createElement('div');
      resizer.className = 'resizer';
      elmnt.appendChild(resizer);
      resizer.addEventListener('mousedown', initDrag, false);
  }, false);

  var startX, startY, startWidth, startHeight;

  function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(elmnt).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(elmnt).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }

  function doDrag(e) {
    elmnt.style.width = (startWidth + e.clientX - startX) + 'px';
    elmnt.style.height = (startHeight + e.clientY - startY) + 'px';
  }

  function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);    
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
  }

}







