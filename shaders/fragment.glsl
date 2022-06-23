uniform float time;
uniform float uProgress;
uniform vec2 uTexturesize;
uniform sampler2D uTexture;

varying vec2 vuv;
varying vec2 vsize;

vec2 getuv(vec2 uv, vec2 texturesize, vec2 quadsize){
    vec2 temp = uv - vec2(0.5);
 
    float quadAspect = quadsize.x / quadsize.y;
    float textureAspect = texturesize.x/texturesize.y;
    
    if(quadAspect < textureAspect){
        temp = temp *vec2(quadAspect/textureAspect,1.);
    }
    else{
        temp = temp *vec2(1.,textureAspect/quadAspect);
    }

    temp += vec2(0.5);
    return temp;
}

void main(){
    vec2 cuv = getuv(vuv,uTexturesize,vsize);
    vec4 img = texture(uTexture, vuv);
    
    gl_FragColor = vec4(img);
}