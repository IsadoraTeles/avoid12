
// #ifdef GL_ES

//     precision mediump float;

// #endif

// attribute vec3 aPosition;

// // Always include this to get the position of the pixel and map the shader correctly onto the shape

// void main() {

    //     // Copy the position data into a vec4, adding 1.0 as the w parameter
    //     vec4 positionVec4 = vec4(aPosition, 1.0);

    //     // Scale to make the output fit the canvas
    //     positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 

    //     // Send the vertex information on to the fragment shader
    //     gl_Position = positionVec4;
// }

// // Variable qualifiers :
// //      Const
// //      #define 
// //      attribute (per vertex parameters)
// //      uniform (constant per frame, can be accessed by all the parallel threads)
// //          the information being received by each thread is the same
// //          It is how we pass information from CPU to GPU
// //          the same for all pixels
// //      varyig (per-pixel parameters, vary from pixel to pixel)
// //          tipically used to pass texture coordinates that we get from WEBGL/P5 through our vertex shader to our fragment shader
// //          prefixed with v or _v


// // attribute vec3 aPosition;



// // void main() {

    //     //   vec4 positionVec4 = vec4(aPosition, 1.0); // Copy the position data into a vec4, adding 1.0 as the w parameter

    //     //   positionVec4.xy = positionVec4.xy * 2.0 - 1.0; // Scale to make the output fit the canvas. 

    //     //   gl_Position = positionVec4;

// // }

// // our vertex data from WEBGL/p5
// // attribute vec3 aPosition;

// // void main() {
    //     //     // copy the position data into a vec4
    //     //     // we're using 1.0 as the w component (which controls scaling/normalization of the coordinates)
    //     //     vec4 positionVec4 = vec4(aPosition, 1.0);
    //     //     positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    //     //     // send the vertex information on to the fragment shader
    //     //     gl_Position = positionVec4;
// // }


// // // our texcoordinates from the cpu
// // attribute vec2 aTexCoord;

// // // this is a variable that will be shared with the fragment shader
// // // we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
// // // it can be called whatever you want but often people prefix it with 'v' to indicate that it is a varying
// // varying vec2 vTexCoord;

// // void main() {

    //     //     // copy the texture coordinates
    //     //     vTexCoord = aTexCoord;

// // }

// our vertex data
attribute vec3 aPosition;

// our texcoordinates
attribute vec2 aTexCoord;

void main() {

    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}