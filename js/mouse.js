document.addEventListener("DOMContentLoaded", () => {
  let mousePosX = 0,
    mousePosY = 0,
    // mouseCircle = document.getElementById("mouse-circle");
    mouseCircle1 = document.getElementById("mouse-circle1");
  mouseCircle2 = document.getElementById("mouse-circle2");
  mouseCircle3 = document.getElementById("mouse-circle3");
  mouseCircle4 = document.getElementById("mouse-circle4");
  mouseCircle5 = document.getElementById("mouse-circle5");
  mouseCircle6 = document.getElementById("mouse-circle6");
  mouseCircle7 = document.getElementById("mouse-circle7");
  mouseCircle8 = document.getElementById("mouse-circle8");

  document.onmousemove = (e) => {
    mousePosX = e.pageX;
    mousePosY = e.pageY;
  };

  let delay1 = 6,
    revisedMousePosX1 = 0,
    revisedMousePosY1 = 0;

  let delay2 = 7,
    revisedMousePosX2 = 0,
    revisedMousePosY2 = 0;

  let delay3 = 8,
    revisedMousePosX3 = 0,
    revisedMousePosY3 = 0;

  let delay4 = 9,
    revisedMousePosX4 = 0,
    revisedMousePosY4 = 0;

  let delay5 = 10,
    revisedMousePosX5 = 0,
    revisedMousePosY5 = 0;

  let delay6 = 11,
    revisedMousePosX6 = 0,
    revisedMousePosY6 = 0;

  let delay7 = 12,
    revisedMousePosX7 = 0,
    revisedMousePosY7 = 0;

  let delay8 = 13,
    revisedMousePosX8 = 0,
    revisedMousePosY8 = 0;

  function delayMouseFollow() {
    requestAnimationFrame(delayMouseFollow);

    revisedMousePosX1 += (mousePosX - revisedMousePosX1) / delay1;
    revisedMousePosY1 += (mousePosY - revisedMousePosY1) / delay1;

    revisedMousePosX2 += (mousePosX - revisedMousePosX2) / delay2;
    revisedMousePosY2 += (mousePosY - revisedMousePosY2) / delay2;

    revisedMousePosX3 += (mousePosX - revisedMousePosX3) / delay3;
    revisedMousePosY3 += (mousePosY - revisedMousePosY3) / delay3;

    revisedMousePosX4 += (mousePosX - revisedMousePosX4) / delay4;
    revisedMousePosY4 += (mousePosY - revisedMousePosY4) / delay4;

    revisedMousePosX5 += (mousePosX - revisedMousePosX5) / delay5;
    revisedMousePosY5 += (mousePosY - revisedMousePosY5) / delay5;

    revisedMousePosX6 += (mousePosX - revisedMousePosX6) / delay6;
    revisedMousePosY6 += (mousePosY - revisedMousePosY6) / delay6;

    revisedMousePosX7 += (mousePosX - revisedMousePosX7) / delay7;
    revisedMousePosY7 += (mousePosY - revisedMousePosY7) / delay7;

    revisedMousePosX8 += (mousePosX - revisedMousePosX8) / delay8;
    revisedMousePosY8 += (mousePosY - revisedMousePosY8) / delay8;

    // mouseCircle.style.top = revisedMousePosY + "px";
    // mouseCircle.style.left = revisedMousePosX + "px";
    mouseCircle1.style.top = revisedMousePosY1 - 8 + "px";
    mouseCircle1.style.left = revisedMousePosX1 - 9 + "px";

    mouseCircle2.style.top = revisedMousePosY2 - 8 + "px";
    mouseCircle2.style.left = revisedMousePosX2 - 9 + "px";

    mouseCircle3.style.top = revisedMousePosY3 - 8 + "px";
    mouseCircle3.style.left = revisedMousePosX3 - 9 + "px";

    mouseCircle4.style.top = revisedMousePosY4 - 8 + "px";
    mouseCircle4.style.left = revisedMousePosX4 - 9 + "px";

    mouseCircle5.style.top = revisedMousePosY5 - 8 + "px";
    mouseCircle5.style.left = revisedMousePosX5 - 9 + "px";

    mouseCircle6.style.top = revisedMousePosY6 - 8 + "px";
    mouseCircle6.style.left = revisedMousePosX6 - 9 + "px";

    mouseCircle7.style.top = revisedMousePosY7 - 8 + "px";
    mouseCircle7.style.left = revisedMousePosX7 - 9 + "px";

    mouseCircle8.style.top = revisedMousePosY8 - 8 + "px";
    mouseCircle8.style.left = revisedMousePosX8 - 9 + "px";
  }
  delayMouseFollow();
});
