const render = () => {
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    if (!gl) {
        alert('WebGL not supported, please use a browser that supports WebGL.');
        return;
    }



    // Create a sphere and return the verticies, normals, and indicies
    const [vertices, normals, indices] = createSphere();

    // Create buffers for vertices, normals, and indices
    const vertexBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Bind normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // Bind index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);



    // Set up the shader program
    const shaderProgram = createShaderProgram(gl);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const normalAttributeLocation = gl.getAttribLocation(shaderProgram, 'aNormal');
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalAttributeLocation);

    // Set up matricies...

    // Projection
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 6, canvas.width / canvas.height, 0.1, 100.0);
    const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    // Model View
    const modelViewMatrix = mat4.create();
    const modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

    // Normal
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    const uNormalMatrixLocation = gl.getUniformLocation(shaderProgram, 'uNormalMatrix');
    gl.uniformMatrix4fv(uNormalMatrixLocation, false, normalMatrix);

    console.log()

    // View
    let viewMatrix = mat4.create(); // this one is used for camera control



    // Set the light vector
    const uLightLocation = gl.getUniformLocation(shaderProgram, 'uLight');
    const light = vec3.fromValues(1.0, 5.0, 2.0);
    gl.uniform3fv(uLightLocation, light);

    // Set the background color
    gl.clearColor(0.1, 0.1, 0.1, 1.0);


    
    // Set up our render loop
    const render_internal = () => {
        // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // Update view matrix
        mat4.lookAt(
            viewMatrix, 
            cameraPosition, 
            vec3.add(vec3.create(), 
            cameraPosition, //cameraPosition, cameraFront, and cameraUp are global vars declared in control.js
            cameraFront
            ), 
            cameraUp);

        // Set model-view matrix
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, viewMatrix);

        // Draw cube
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render_internal);
    }

    render_internal();
};