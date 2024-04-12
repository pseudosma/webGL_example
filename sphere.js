const createSphere = () => {

    const radius = 1.0; // Radius of the sphere
    const latitudeBands = 30; // Number of divisions along the latitude
    const longitudeBands = 30; // Number of divisions along the longitude
    
    const vertices = [];
    const normals = [];
    
    for (let lat = 0; lat <= latitudeBands; lat++) {
        const theta = lat * Math.PI / latitudeBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
    
        for (let lon = 0; lon <= longitudeBands; lon++) {
            const phi = lon * 2 * Math.PI / longitudeBands;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
    
            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;
            const u = 1 - (lon / longitudeBands);
            const v = 1 - (lat / latitudeBands);
    
            vertices.push(radius * x, radius * y, radius * z);
            normals.push(x, y, z);
        }
    }
    
    const indices = [];
    
    for (let lat = 0; lat < latitudeBands; lat++) {
        for (let lon = 0; lon < longitudeBands; lon++) {
            const first = (lat * (longitudeBands + 1)) + lon;
            const second = first + longitudeBands + 1;
            indices.push(first, second, first + 1, second, second + 1, first + 1);
        }
    }

    return [vertices, normals, indices];
}
