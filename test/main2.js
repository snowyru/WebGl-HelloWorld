    const canvas = document.querySelector(`canvas`);
    const webgl = canvas.getContext(`webgl`);
    if(!webgl){ throw new Error("WebGL not available/supported");}
    webgl.clearColor(1.0,1.0,0,1); 
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    const vertices = new Float32Array([0,0]); //specifying the co-ordinates also changin it to a 32bit float from 64bit float for compatiblity
    const buffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);
    const vsSource =`      //compiled by gpu
    attribute vec2 pos;     //creating a 2 dimension vector
    void main() { gl_Position = vec4(pos,0,1); //pass in missing dimensions (z=0 and w=1)
        gl_PointSize=50.0;
    }`
    const fsSource = `      //compile java by cpu
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
    
    const positionLocation = webgl.getAttribLocation(program, `pos`); //pos is the attribute description of the data
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
    webgl.useProgram(program);
    webgl.drawArrays(webgl.POINTS, 0, 1);

console.log(positionLocation);
