
/**
 * @typedef Rect
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * 
 * @param {Rect} r1 
 * @param {Rect} r2
 * @returns {boolean} true if any part of `r1` is instide 
 */
export function overlaps(r1, r2) {
  
  return (
    // the right edge of r1 is to the right of the left edge of r2
    r1.x + r1.width >= r2.x &&
    // the left edge of r1 is to the left of the right edge of r2
    r1.x < r2.x + r2.width &&
    // the bottom edge of r1 is above the top edge of r2 
    r1.y + r1.height >= r2.y &&
    // the top edge of r1 is above the bottom edge of r2
    r1.y < r2.y + r2.height
  );

}
