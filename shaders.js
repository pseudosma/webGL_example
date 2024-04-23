const createShaderProgram = (gl) => {
    // Vertex shader source code
    const vertexShaderSource = `
        //Uniform - a global const variable seen by the fragment
        //Attribute - an input variable of the vertex shader
        //Varying - an output variable of the vertex shader, input variable for the fragment shader


        attribute vec3 aPosition; 
        attribute vec3 aNormal;
        
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        uniform mat4 uNormalMatrix;

        varying vec3 vNormal;
        
        void main() {
            // Transform the position
            gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        
            // Transform the normal and pass it to the fragment shader
            vNormal = mat3(uNormalMatrix) * aNormal;
        }
   `;

   // Fragment shader source code
   const fragmentShaderSource = `
        precision mediump float;

        varying vec3 vNormal;        
        uniform vec3 uLight;
        
        void main() {
            //----Flat color----

            // gl_FragColor = vec4(0.0, 0.7, 0.7, 1.0);   

            //---Cel Shader----

            // float dotProduct = dot(vNormal, uLight);

            // if (dotProduct < 0.2) {
            //     gl_FragColor = vec4(0.0, 0.5, 0.5, 1.0);
            // } else if (dotProduct < 0.6) {
            //     gl_FragColor = vec4(0.0, 0.7, 0.7, 1.0);
            // } else {
            //     gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
            // }

            //----Normal Shading----

            // float dotProduct = dot(vNormal, uLight);

            // vec3 lightColor = vec3(0.0, 0.7, 0.7);
            // lightColor += (dotProduct * lightColor);
            // gl_FragColor = vec4(lightColor, 1.0);


            //---Cel Shader from math funcs----

            float dotProduct = dot(vNormal, uLight);

            float divisions = 3.0;
            vec3 lightColor = vec3(0.0, 1.0, 1.0);
            lightColor += lightColor / 1.3 * (dotProduct * lightColor);
            gl_FragColor = max(vec4(floor(lightColor * divisions) / divisions, 1.0), vec4(0.0, 0.5, 0.5, 1.0));
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