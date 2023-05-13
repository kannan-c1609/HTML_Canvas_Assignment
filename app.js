const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const circleX = 100; // X-coordinate of the circle
    const circle1Y = 100;
    const circleRadius = 30; // Radius of the circle

    let arrowX = canvas.width-300; // Initial X-coordinate for the arrow
    const arrowY = 100; // Y-coordinate for the arrow
    const speed = 20; // Speed of the arrow's movement
    let isMoving1 = false; // Flag to indicate if the arrow is moving

    function drawCircle(circleY,color) {
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }

    function drawArrow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      drawCircle(circle1Y,'red');// Draw the circle

      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + 50, arrowY - 20);
      ctx.lineTo(arrowX + 50, arrowY + 20);
      ctx.closePath();
      ctx.fillStyle = 'black';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(arrowX + 50, arrowY);
      ctx.lineTo(arrowX + 100, arrowY);
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      if (isMoving1) {
        if (arrowX > circleX + circleRadius) {
          arrowX -= speed; // Move the arrow to the left
        } else {
          isMoving1 = false; // Stop the arrow when it reaches the circle
        }
      }

      requestAnimationFrame(drawArrow); // Call the function recursively for smooth animation
    }

    function resetArrow() {
      isMoving1 = false; // Stop the arrow movement
      arrowX = canvas.width - 100; // Reset the arrow's X-coordinate to the initial position
    }

    canvas.addEventListener('click', function(event) {
      const clickX = event.clientX - canvas.offsetLeft; // X-coordinate of the click relative to the canvas

      if (
        clickX >= circle1Y - circleRadius &&
        clickX <= circle1Y + circleRadius &&
        !isMoving1
      ) {
        isMoving1 = true; // Start the arrow movement if clicked inside the circle
      }
    });

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetArrow);

    drawArrow(); // Start the animation
