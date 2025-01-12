// asg0.js
function main() {
    clearCanvas(); // clears the canvas with a black box

    // Draw a red line
    let v1 = new Vector3([2.25, 2.25, 0]); // define a new vector
    drawVector(v1, "red"); // draw the vector
}

// draws a vector for 2d, scaled for viewing
function drawVector(vector, color) {
    // rendering context setup
    var canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the canvas element ');
        return false;
    }
    var ctx = canvas.getContext('2d');

    // Set the centers
    let xCenter = canvas.width / 2;
    let yCenter = canvas.height / 2;

    // Scale the values by 20
    let scaledLocation1 = vector.elements[0] * 20;
    let scaledLocation2 = vector.elements[1] * 20;

    let xTarget = xCenter + scaledLocation1
    let yTarget = yCenter - scaledLocation2 // y is reversed

    // Draw the line
    ctx.strokeStyle = color; // set the color
    ctx.beginPath(); // Start a new path
    ctx.moveTo(xCenter, yCenter); // Move the pen to the center of the canvas
    ctx.lineTo(xTarget, yTarget); // Draw a line to vec location
    ctx.stroke(); // Render the path
}

// clears the canvas, then draws two given 2d vectors
function HandleDrawEvent() {
    // clears the canvas
    clearCanvas();

    // creates the first vector based on given values from html inputs
    let vector1X = document.getElementById("v1x").value;
    let vector1Y = document.getElementById("v1y").value;
    v1 = new Vector3([vector1X, vector1Y, 0]);
    drawVector(v1, "red"); // draws the vector

    // creates the second vector based on given values from html inputs
    let vector2X = document.getElementById("v2x").value;
    let vector2Y = document.getElementById("v2y").value;
    v2 = new Vector3([vector2X, vector2Y, 0]);
    drawVector(v2, "blue"); // draws the vector
}

// clears the canvas then draws vectors and carries out operations
function HandleDrawOperationEvent() {
    // clears the canvas
    clearCanvas();

    // creates the first vector based on given values from html inputs
    let vector1X = document.getElementById("v1x").value;
    let vector1Y = document.getElementById("v1y").value;
    v1 = new Vector3([vector1X, vector1Y, 0]);
    drawVector(v1, "red"); // draws the vector

    // creates the second vector based on given values from html inputs
    let vector2X = document.getElementById("v2x").value;
    let vector2Y = document.getElementById("v2y").value;
    v2 = new Vector3([vector2X, vector2Y, 0]);
    drawVector(v2, "blue"); // draws the vector

    // creates one or two more vectors with add, sub, mul, div operations
    let operation = document.getElementById("operation-select").value;
    if (operation == "add") {
        v3 = v1.add(v2);
        drawVector(v3, "green");
    }
    else if (operation == "sub") {
        v3 = v1.sub(v2);
        drawVector(v3, "green");
    }
    else if (operation == "mul") {
        scalar = document.getElementById("scalar").value;
        v3 = v1.mul(scalar);
        drawVector(v3, "green");
        v4 = v2.mul(scalar);
        drawVector(v4, "green");
    }
    else if (operation == "div") {
        scalar = document.getElementById("scalar").value;
        v3 = v1.div(scalar);
        drawVector(v3, "green");
        v4 = v2.div(scalar);
        drawVector(v4, "green");
    }
    else if (operation == "mag") {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
    }
    else if (operation == "nor") {
        v3 = v1.normalize();
        drawVector(v3, "green");
        v4 = v2.normalize();
        drawVector(v4, "green");
    }
    else if (operation == "ang") {
        console.log("Angle: " + angleBetween(v1, v2));
    }
    else if (operation == "area") {
        console.log("Area of the triangle: " + areaTriangle(v1, v2));
    }
}

// returns the angle between two vectors
function angleBetween(v1, v2) {
    // derives the angle from dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
    dotProduct = Vector3.dot(v1, v2);
    v1Mag = v1.magnitude();
    v2Mag = v2.magnitude();

    val = dotProduct / (v1Mag * v2Mag); // isolate cos(alpha)
    return Math.acos(val) * 180 / Math.PI; // converted to degrees
}

// returns the area of the triangle formed between two vectors
function areaTriangle(v1, v2) {
    // ||v1 x v2||  equals to the area of the parallelogram that the vectors span.
    let v3 = Vector3.cross(v1, v2); // cross product vector
    return v3.magnitude() / 2;
}

// clears the canvas with a black box
function clearCanvas() {
    // rendering context setup
    var canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the canvas element ');
        return false;
    }
    var ctx = canvas.getContext('2d');

    // Draws a black rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';               // Set a color
    ctx.fillRect(0, 0, canvas.width, canvas.height);    // Fill a rectangle with the color
}