
const FAR = 1000;
const NEAR = 0;

/**
 * 
 * @param {number} left 
 * @param {number} right 
 * @param {number} bottom 
 * @param {number} top 
 * @param {number} scale 
 * @returns 
 */
export function createOrthographicProjectionMatrix(left, right, bottom, top) {

  const matrix = new Float32Array(16);

  matrix[0] = 2 / (right - left);
  matrix[5] = 2 / (top - bottom);
  matrix[10] = -2 / (FAR - NEAR);
  matrix[12] = -(right + left) / (right - left);
  matrix[13] = -(top + bottom) / (top - bottom);
  matrix[14] = -(FAR + NEAR) / (FAR - NEAR);
  matrix[15] = 1;

  return matrix;

}

export function multiplyMatrixAndPoint(matrix, point) {

  let c0r0 = matrix[0],
    c1r0 = matrix[1],
    c2r0 = matrix[2],
    c3r0 = matrix[3];

  let c0r1 = matrix[4],
    c1r1 = matrix[5],
    c2r1 = matrix[6],
    c3r1 = matrix[7];

  let c0r2 = matrix[8],
    c1r2 = matrix[9],
    c2r2 = matrix[10],
    c3r2 = matrix[11];

  let c0r3 = matrix[12],
    c1r3 = matrix[13],
    c2r3 = matrix[14],
    c3r3 = matrix[15];

  // Now set some simple names for the point
  const x = point[0];
  const y = point[1];
  const z = point[2];
  const w = point[3];

  // Multiply the point against each part of the 1st column, then add together
  const resultX = x * c0r0 + y * c0r1 + z * c0r2 + w * c0r3;

  // Multiply the point against each part of the 2nd column, then add together
  const resultY = x * c1r0 + y * c1r1 + z * c1r2 + w * c1r3;

  // Multiply the point against each part of the 3rd column, then add together
  const resultZ = x * c2r0 + y * c2r1 + z * c2r2 + w * c2r3;

  // Multiply the point against each part of the 4th column, then add together
  const resultW = x * c3r0 + y * c3r1 + z * c3r2 + w * c3r3;

  return vec4(resultX, resultY, resultZ, resultW);
}

export function createScaleMatrix(scale = 1) {
  const matrix = new Float32Array(16);
  
  matrix[0] = scale;
  matrix[5] = scale;
  matrix[10] = 1;
  matrix[15] = 1;
  
  return matrix;
}

export function createTranslationMatrix(x, y) {
  const matrix = new Float32Array(16);

  matrix[0] = 1;
  matrix[5] = 1;
  matrix[10] = 1;
  matrix[12] = x;
  matrix[13] = y;
  matrix[14] = 1; // z
  matrix[15] = 1;

  return matrix;
}

export function multiplyMatrices(matrixA, matrixB) {
  // Slice the second matrix up into rows
  const row0 = vec4(matrixB[0], matrixB[1], matrixB[2], matrixB[3]);
  const row1 = vec4(matrixB[4], matrixB[5], matrixB[6], matrixB[7]);
  const row2 = vec4(matrixB[8], matrixB[9], matrixB[10], matrixB[11]);
  const row3 = vec4(matrixB[12], matrixB[13], matrixB[14], matrixB[15]);

  // Multiply each row by matrixA
  const result0 = multiplyMatrixAndPoint(matrixA, row0);
  const result1 = multiplyMatrixAndPoint(matrixA, row1);
  const result2 = multiplyMatrixAndPoint(matrixA, row2);
  const result3 = multiplyMatrixAndPoint(matrixA, row3);

  // Turn the result rows back into a single matrix
  return [
    result0[0],
    result0[1],
    result0[2],
    result0[3],
    result1[0],
    result1[1],
    result1[2],
    result1[3],
    result2[0],
    result2[1],
    result2[2],
    result2[3],
    result3[0],
    result3[1],
    result3[2],
    result3[3],
  ];
}

export function multiplyArrayOfMatrices(matrices) {
  let matrix = matrices[0];

  for (let i = 1; i < matrices.length; i++) {
    matrix = multiplyMatrices(matrix, matrices[i]);
  }

  return matrix;
}

/**
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @param {number} val3 
 * @param {number} val4 
 */
export function vec4(val1, val2, val3, val4) {
  const vec = new Float32Array(4);
  
  vec[0] = val1;
  vec[1] = val2;
  vec[2] = val3;
  vec[3] = val4;

  return vec;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
export function createPoint(x, y) {
  return vec4(x, y, 1, 1);
}

/**
 * This function accepts a point transformed into clip space and returns true if it is within the viewing frustum
 * @param {number[]} point 
 */
export function isPointVisible(point) {
  return (
    // check x
    point[0] >= -1 &&
    point[0] <= 1 &&
    // check y
    point[1] >= -1 &&
    point[1] <= 1
  );
}

export function isClipSpacePointVisible(point) {
  return (
    // check x
    point[0] >= -1 &&
    point[0] <= 1 &&
    // check y
    point[1] >= -1 &&
    point[1] <= 1
  );
}