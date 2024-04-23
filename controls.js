let cameraPosition = vec3.fromValues(0.0, 0.0, -10.0);
let cameraFront = vec3.fromValues(0, 0, 1.0);
const cameraUp = vec3.fromValues(0.0, 1.0, 0.0);

const speed = 0.1;
const rotationSpeed = 0.01;

let rotation = quat.create();

const handleKeyPress = (event) => {
    switch (event.keyCode) {
        case 37: // Left arrow
            let l_inv = vec3.create();
            vec3.negate(l_inv, cameraFront);
            vec3.rotateY(
                cameraFront,
                cameraFront,
                l_inv,
                rotationSpeed
            );
            break;
        case 39: // Right arrow
            let r_inv = vec3.create();
            vec3.negate(r_inv, cameraFront);
            vec3.rotateY(
                cameraFront,
                cameraFront,
                r_inv,
                -rotationSpeed
            );
            break;
        case 38: // Up arrow
            vec3.add(cameraPosition, cameraPosition, vec3.scale(vec3.create(), cameraFront, speed));
            break;
        case 40: // Down arrow
            vec3.subtract(cameraPosition, cameraPosition, vec3.scale(vec3.create(), cameraFront, speed));
            break;
    }
}