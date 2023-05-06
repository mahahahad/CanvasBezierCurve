const canvasEl = document.querySelector("#canvas");
canvasEl.height = innerHeight;
canvasEl.width = innerWidth;

function drawBezierCurve(canvasContext, start, end, cp1, cp2) {
  let cpRadius = 7;
  // Reset canvas to blank state
  canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw bezier curve with specified parameters
  canvasContext.strokeStyle = "white";
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.moveTo(start.x, start.y);
  canvasContext.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  canvasContext.stroke();
  canvasContext.lineWidth = 1;

  // Decrease stroke opacity for handle lines
  canvasContext.strokeStyle = "rgba(255, 255, 255, 0.5)";

  // Change fill style to blue for control points
  canvasContext.fillStyle = "dodgerblue";

  // Draw first control point line
  canvasContext.beginPath();
  canvasContext.moveTo(cp1.x, cp1.y);
  canvasContext.lineTo(start.x, start.y);
  canvasContext.stroke();

  // Draw first control point
  canvasContext.beginPath();
  canvasContext.arc(cp1.x, cp1.y, cpRadius, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.lineWidth = 2;
  canvasContext.stroke();
  canvasContext.lineWidth = 1;

  // Draw second control point line
  canvasContext.beginPath();
  canvasContext.moveTo(cp2.x, cp2.y);
  canvasContext.lineTo(end.x, end.y);
  canvasContext.stroke();

  // Draw second control point
  canvasContext.beginPath();
  canvasContext.arc(cp2.x, cp2.y, cpRadius, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.lineWidth = 2;
  canvasContext.stroke();
  canvasContext.lineWidth = 1;

  // Reset stroke and fill styles for next time the function is called
  canvasContext.fillStyle = "white";
  canvasContext.strokeStyle = "white";
}

if (canvasEl.getContext) {
  const c = canvasEl.getContext("2d");
  let size = 200;
  let screenYMidpoint = window.innerHeight / 2;
  let screenXMidpoint = window.innerWidth / 2;
  let start = { x: screenXMidpoint - size / 2, y: screenYMidpoint + size / 2 };
  let end = { x: screenXMidpoint + size / 2, y: screenYMidpoint - size / 2 };
  let cp1 = { x: screenXMidpoint, y: screenYMidpoint + size / 2 };
  let cp2 = { x: screenXMidpoint, y: screenYMidpoint - size / 2 };
  let clicked;

  // Draw initial bezier curve
  drawBezierCurve(c, start, end, cp1, cp2);

  document.addEventListener("mousemove", (e) => {
    if (!clicked) return;
    // TODO: Once clicked on control point, ignore if it is within the range and simply draw curve and update till mouse button is released
    if (
      e.clientX >= cp1.x - 10 &&
      e.clientX <= cp1.x + 10 &&
      e.clientY >= cp1.y - 10 &&
      e.clientY <= cp1.y + 10
    ) {
      cp1.x = e.clientX;
      cp1.y = e.clientY;
      drawBezierCurve(c, start, end, cp1, cp2);
    }
    if (
      e.clientX >= cp2.x - 10 &&
      e.clientX <= cp2.x + 10 &&
      e.clientY >= cp2.y - 10 &&
      e.clientY <= cp2.y + 10
    ) {
      cp2.x = e.clientX;
      cp2.y = e.clientY;
      drawBezierCurve(c, start, end, cp1, cp2);
    }
  });

  document.addEventListener("mousedown", () => {
    clicked = true;
  });

  document.addEventListener("mouseup", () => {
    clicked = false;
  });
}
