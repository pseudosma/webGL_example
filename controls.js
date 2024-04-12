let angle = 0;
let position = 0;

const speed = 0.05;

const handleKeyPress = (event) => {
    switch (event.keyCode) {
        case 37: // Left arrow
            angle -= speed;
            break;
        case 39: // Right arrow
            angle += speed;
            break;
        case 38: // Up arrow
            position += speed;
            break;
        case 40: // Down arrow
            position -= speed;
            break;
    }
}