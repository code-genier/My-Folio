uniform float time;
uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec2 uTexturesize;
uniform vec4 uCorners;

varying vec2 vuv;
varying vec2 vsize;
void main(){
    vuv = uv;
    float PI = 3.1415;
    float sine = sin(PI*uProgress);
    float waves = sine*0.1*sin(5.*length(uv) + 10.*uProgress);
    vec3 newposition = position;

    vec4 defaultState = modelMatrix*vec4(newposition, 1.0);
    vec4 fullScreenState = vec4(newposition, 1.0);

    fullScreenState.x *= uResolution.x;
    fullScreenState.y *= uResolution.y;
    // this will hide other imges behind when one is fullscreen
    fullScreenState.z += uCorners.x;
    
    float cornerProgress = mix(
        mix(uCorners.x, uCorners.y, uv.x),
        mix(uCorners.z, uCorners.w, uv.x),
        uv.y
        );

    vec4 finalState = mix(defaultState, fullScreenState,cornerProgress);
    vsize = mix(uQuadSize, uResolution, cornerProgress);

    gl_Position = projectionMatrix * 
    viewMatrix*finalState;
}
