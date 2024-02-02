    const canvas = document.querySelector(`canvas`);
    const webgl = canvas.getContext(`webgl`);
    if(!webgl){ throw new Error("WebGL not available/supported");}
    webgl.clearColor(1.0,1.0,0,1); //know why 2 methods are used
    webgl.clear(webgl.COLOR_BUFFER_BIT); //these 2
    const vertices = new Float32Array([0,0,  -1,-1]);
    const buffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);
    const vsSource =`     
    attribute vec2 pos;
    void main() { gl_Position = vec4(pos,0,1); }`
    const fsSource = `
    void main() { gl_FragColor = vec4(1.0,0,0,1.0); }`;
    const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
    webgl.shaderSource(vertexShader, vsSource ); 
    webgl.compileShader(vertexShader);
   
    const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
    webgl.shaderSource(fragmentShader, fsSource);
    webgl.compileShader(fragmentShader);
   
    const program = webgl.createProgram();
    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);
    
    const positionLocation = webgl.getAttribLocation(program, `pos`);
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
    //webgl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    webgl.useProgram(program);
    webgl.drawArrays(webgl.LINES, 0, 2);
