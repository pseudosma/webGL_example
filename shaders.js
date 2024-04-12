const createShaderProgram = (gl) => {
    // Vertex shader source code
    const vertexShaderSource = `
       attribute vec4 aPosition;
       uniform mat4 uModelViewMatrix;
       uniform mat4 uProjectionMatrix;
       void main() {
           gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
       }
   `;

   // Fragment shader source code
   const fragmentShaderSource = `
       precision mediump float;
       void main() {
           gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
       }
   `;

   // Compile shaders, create shader program
   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, vertexShaderSource);
   gl.compileShader(vertexShader);

   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentShader, fragmentShaderSource);
   gl.compileShader(fragmentShader);

   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);
   gl.useProgram(shaderProgram);

   return shaderProgram;
};