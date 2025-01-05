import { createScaleMatrix } from "./matrix";

/**
 * The code in this module is derived from the article [WebGL model view projection](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection)
 * 
 * ### Model Matrix
 * Defines how you take your original data and movee it around in 3D world space
 * 
 * ### Projection Matrix
 * used to convert world space coordinates into clip space coordinates
 * 
 * ### Perspective Projection Matrix
 * used to mimic the effects of a typical camera serving as the stand-in for the viewer in the 3D virtual world
 * 
 * ### Clip Space
 * a 2-unit wide cube, centered at (0,0,0), and with corners that range from (-1,-1,-1) to (1,1,1). This 8 cubic unit coordinate system is known as "normalized device coordinates" (NDC).
 * 
 * ### Homogeneous Coordinates
 * 
 * You can represent a point with vec3
 * ```js
 * position = vec3(x, y, z)
 * ```
 * The variable that actually gets rendered in WebGL has a 4th dimension
 * ```js
 * glPosition = vec4(position, w)
 * ```
 * `w` introduces the notion of perspective into the coordniate system and allows us to map 3D coords into 2D space. The coordniate represented by the variable `glPosition` is a _homogenous coordinate_.
 * 
 * 
 */
const notes = undefined;



class Transforms {

  constructor() {
    this.model = [];
  }

  computeModelMatrix(rect) {
    const scale = createScaleMatrix()
  }
}

