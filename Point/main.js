    const canvas = document.querySelector(`canvas`);
    const webgl = canvas.getContext(`webgl`); // canvas is 2d while webgls is 3d
    const vsSource =`   // Specify location w is always 1 
        void main() { gl_Position = vec4(0.5,0.5,0,1); //x,y,z,w
        gl_PointSize=50.0;
    }`
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
    webgl.useProgram(program);
    webgl.drawArrays(webgl.POINTS, 0, 1);
