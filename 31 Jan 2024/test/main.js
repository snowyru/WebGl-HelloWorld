    const canvas = document.querySelector(`canvas`); //also use getelementbyID
    const webgl = canvas.getContext(`webgl`); // canvas is 2d while webgls is 3d
    const vsSource =`   // Specify location w is always 1 | advise to use backtick
        void main() { gl_Position = vec4(0.1,0.1,0,1); //x,y,z,w  //x is actually x/w (becuase it transforms the object)
        gl_PointSize=50.0; // changes the size
    }`
    const fsSource = `
    void main() { gl_FragColor = vec4(1.0,0,0,1.0); }`;
    const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
    webgl.shaderSource(vertexShader, vsSource ); 
    webgl.compileShader(vertexShader); //compuil
   
    const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
    webgl.shaderSource(fragmentShader, fsSource);
    webgl.compileShader(fragmentShader);
    
    const program = webgl.createProgram();
    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader); //attaching each compiled program
    webgl.linkProgram(program); // linking the 2 attached compiled program into one 
    webgl.useProgram(program); //opening the program
    webgl.drawArrays(webgl.POINTS, 0, 1); // specify number of verticies to know location
