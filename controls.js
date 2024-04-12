let cameraPosition = vec3.fromValues(0.0, 0.0, -10.0);
let cameraFront = vec3.fromValues(0, 0, 1.0);
const cameraUp = vec3.fromValues(0.0, 1.0, 0.0);

const speed = 0.1;

const handleKeyPress = (event) => {
    switch (event.keyCode) {
        case 37: // Left arrow
            angle -= speed;
            break;
        case 39: // Right arrow
            angle += speed;
            break;
        case 38: // Up arrow
            vec3.add(cameraPosition, cameraPosition, vec3.scale(vec3.create(), cameraFront, speed));
            break;
        case 40: // Down arrow
            vec3.subtract(cameraPosition, cameraPosition, vec3.scale(vec3.create(), cameraFront, speed));
            break;
    }
}