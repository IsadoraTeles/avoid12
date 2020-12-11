// // Author @patriciogv - 2015
// // http://patriciogonzalezvivo.com

// #ifdef GL_ES
//     precision mediump float;
// #endif

// uniform vec2 iResolution;
// uniform int iFrame;
// uniform vec2 iMouse;
// uniform vec2 iPosition;
// uniform vec2 ilala;

// uniform float iTime;

// float random (in vec2 _st) {
    //     return fract(sin(dot(_st.xy,
    //     vec2(12.9898,78.233)))*
    //     43758.5453123);
// }

// // Based on Morgan McGuire @morgan3d
// // https://www.shadertoy.com/view/4dS3Wd
// float noise (in vec2 _st) {
    //     vec2 i = floor(_st);
    //     vec2 f = fract(_st);

    //     // Four corners in 2D of a tile
    //     float a = random(i);
    //     float b = random(i + vec2(1.0, 0.0));
    //     float c = random(i + vec2(0.0, 1.0));
    //     float d = random(i + vec2(1.0, 1.0));

    //     vec2 u = f * f * (3.0 - 2.0 * f);

    //     return mix(a, b, u.x) +
    //     (c - a)* u.y * (1.0 - u.x) +
    //     (d - b) * u.x * u.y;
// }

// #define NUM_OCTAVES 10

// float fbm ( in vec2 _st) {
    //     float v = 0.0;
    //     float a = 0.5; // sombre ou clair
    //     vec2 shift = vec2(100.0);
    //     // Rotate to reduce axial bias
    //     mat2 rot = mat2(cos(0.5), sin(0.5),
    //     -sin(0.5), cos(0.50));
    //     for (int i = 0; i < NUM_OCTAVES; ++i) {
        //         v += a * noise(_st);
        //         _st = rot * _st * 2.8 + shift;
        //         a *= 0.5;
    //     }
    //     return v;
// }

// void main() {
    //     vec2 st = gl_FragCoord.xy/iResolution.xy*3.;
    //     //st += st * abs(sin(iTime*0.003)); // ZZZOOOOMM
    //     vec3 color = vec3(0.0);

    //     // vec2 m = iPosition;

    //     vec2 q = vec2(0.);
    //     q.x = fbm( st + 0.1*iTime)*ilala.x*(-0.04);
    //     q.y = fbm( st + vec2(2.0))*ilala.y*(-0.03);

    //     vec2 mm = iPosition;

    //     // vec2 q = vec2(0.);
    //     // q.x = fbm( st + 0.001*iTime);
    //     // q.y = fbm( st + vec2(1.0));
    
    //     //vec2 m = iMouse;

    //     vec2 dm = mm.xy;
    //     if (dot(dm, dm) > 0.0)
    //     dm = normalize(dm);
    //     vec2 d = gl_FragCoord.xy - mm.xy;
    //     float adjust = max(10.0, (500.0 - length(d)) / 9.0);
    //     vec2 lala = adjust * dm ;
    
    //     vec2 r = vec2(0.);
    //     r.x = fbm( st + 1.0*q + lala + 0.155*iTime);
    //     r.y = fbm( st + 1.0*q + lala + 0.226*iTime);

    //     float f = fbm(st+r);
    
    //     color = mix(vec3(0.101961,0.619608,0.666667),
    //     vec3(0.666667,0.666667,0.498039),
    //     clamp((f*f)*4.0,0.0,1.0));

    //     color = mix(color,
    //     vec3(0,0,0.164706),
    //     clamp(length(q),0.0,1.0));

    //     color = mix(color,
    //     vec3(0.666667,1,1),
    //     clamp(length(r.x),length(r.y),0.8));

    //     gl_FragColor = vec4((f*f*f+.7*f*f+.5*f)*color,1.);
// }

///--------------------------------------------------//


// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

// #ifdef GL_ES
//     precision mediump float;
// #endif

// uniform vec2 iResolution;
// uniform int iFrame;
// uniform vec2 iMouse;
// uniform vec2 iPosition;
// uniform float iTime;


// float random (in vec2 _st) {
    //     return fract(sin(dot(_st.xy,
    //     vec2(12.9898,78.233)))*
    //     43758.5453123);
// }

// // Based on Morgan McGuire @morgan3d
// // https://www.shadertoy.com/view/4dS3Wd
// float noise (in vec2 _st) {
    //     vec2 i = floor(_st);
    //     vec2 f = fract(_st);

    //     // Four corners in 2D of a tile
    //     float a = random(i);
    //     float b = random(i + vec2(1.0, 0.0));
    //     float c = random(i + vec2(0.0, 1.0));
    //     float d = random(i + vec2(1.0, 1.0));

    //     vec2 u = f * f * (3.0 - 2.0 * f);

    //     return mix(a, b, u.x) +
    //     (c - a)* u.y * (1.0 - u.x) +
    //     (d - b) * u.x * u.y;
// }

// #define NUM_OCTAVES 15

// float fbm ( in vec2 _st) {
    //     float v = 0.0;
    //     float a = 0.5;
    //     vec2 shift = vec2(100.0);
    //     // Rotate to reduce axial bias
    //     mat2 rot = mat2(cos(0.5), sin(0.5),
    //     -sin(0.5), cos(0.50));
    //     for (int i = 0; i < NUM_OCTAVES; ++i) {
        //         v += a * noise(_st);
        //         _st = rot * _st * 2.5 + shift;
        //         a *= 0.5;
    //     }
    //     return v;
// }

// void main() {
    //     vec2 st = gl_FragCoord.xy/iResolution.xy*3.;
    //     // st += st * abs(sin(iTime*0.1)*3.0);
    //     vec3 color = vec3(0.0);

    //     vec2 q = vec2(0.);
    //     q.x = fbm( st + 0.00*iTime)*iPosition.x*(-0.004);
    //     q.y = fbm( st + vec2(1.0))*iPosition.y*(-0.009);


    //     // Normalized pixel coordinates (from 0 to 1)
    //     //vec2 uv = gl_FragCoord.xy/iResolution.xy;
    //     //uv=uv/4.0+.5;
    //     //uv-=iMouse.xy/iResolution.xy/4.0;

    //     vec2 m = iPosition;
    //     //float mm = n.x*0.5;
    //     //vec2 m = vec2(mm, n.y);
    
    //     vec2 dm = m.xy;
    //     if (dot(dm, dm) > 0.0)
    //     dm = normalize(dm);
    //     vec2 d = gl_FragCoord.xy - m.xy;
    //     float adjust = max(0.0, (200.0 - length(d)) / 80.0);
    //     vec2 lala = adjust * dm;
    
    //     vec2 r = vec2(0.);
    //     r.x = fbm( st + 1.0*q + lala + 0.015*iTime );
    //     r.y = fbm( st + 1.0*q + lala+ 0.126*iTime);

    //     float f = fbm(st+r);
    
    //     color = mix(vec3(0.101961,0.619608,0.666667),
    //     vec3(0.666667,0.666667,0.498039),
    //     clamp((f*f)*4.0,0.0,1.0));

    //     color = mix(color,
    //     vec3(0,0,0.164706),
    //     clamp(length(q),0.0,1.0));

    //     color = mix(color,
    //     vec3(0.666667,1,1),
    //     clamp(length(r.x),0.0,1.0));

    //     gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
// }

// ------------------------------------------------//

// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
    precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform vec2 iPosition;

uniform float iTime;
uniform float iShaderOppacity;
uniform float iWindDirectionX;
uniform float iWindDirectionY;


float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
    vec2(12.9898,78.233)))*
    43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
    (c - a)* u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 15

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.5 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy*3.;
    // st += st * abs(sin(iTime*0.1)*3.0); // ZOOM
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*iTime)*iWindDirectionX;
    q.y = fbm( st + vec2(1.0))*iWindDirectionY;

    vec2 m1 = iPosition;
    // vec2 m2 = iPosition2;

    vec2 dm1 = m1.xy;
    if (dot(dm1, dm1) > 0.0)
    dm1 = normalize(dm1);
    vec2 d1 = gl_FragCoord.xy - m1.xy;
    float adjust1 = max(0.0, (100.0 - length(d1)) / 100.0);
    vec2 lala1 = adjust1 * dm1;

    // vec2 dm2 = m2.xy;
    // if (dot(dm2, dm2) > 0.0)
    // dm2 = normalize(dm2);
    // vec2 d2 = gl_FragCoord.xy - m2.xy;
    // float adjust2 = max(0.0, (100.0 - length(d2)) / 100.0);
    // vec2 lala2 = adjust2 * dm2;
    
    vec2 r = vec2(0.);
    // r.x = fbm( st + 1.0*q + lala1 + lala2 + 0.015 * iTime);
    // r.y = fbm( st + 1.0*q + lala1 + lala2 + 0.126 * iTime);

    r.x = fbm( st + 1.0*q + lala1 + 0.015 * iTime);


    float f = fbm(st+r);
    
    color = mix(vec3(0.101961,0.619608,0.666667),
    vec3(0.666667,0.666667,0.498039),
    clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
    vec3(0,0,0.164706),
    clamp(length(q),0.0,1.0));

    color = mix(color,
    vec3(0.666667,1,1),
    clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,iShaderOppacity);
}
