const render = () => {
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('WebGL not supported, please use a browser that supports WebGL.');
        return;
    }

    //create a sphere and return the verticies, normals, and indicies
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

    const shaderProgram = createShaderProgram(gl);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Set up matricies

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);

    const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    const modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

    // const projectionMatrix = mat4.create();
    // mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
    // mat4.translate(projectionMatrix, projectionMatrix, [0.0, 0.0, -10.0]);

    // const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    // gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    // Set the background color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Set up our render loop.
    const render_internal = () => {

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, angle);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, angle);

        const modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);


        // const projectionMatrix = mat4.create();
        // mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
        // mat4.translate(projectionMatrix, projectionMatrix, [0, -2.0, position]);
        // mat4.rotateY(projectionMatrix, projectionMatrix, angle);
    
        // const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
        // gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

        // Clear canvas and draw
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render_internal);
    }

    render_internal();
};