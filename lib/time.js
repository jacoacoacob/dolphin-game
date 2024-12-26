
export function toMilliseconds({ seconds, minutes } = {}) {
  
  if (typeof seconds === "number") {
    
    return Math.round(seconds * 1_000_000) / 1000;
  
  }

  if (typeof minutes === "number") {
    
    return Math.round(minutes * 60 * 1_000_000) / 1000;

  }
}

/**
 * convert seconds to milliseconds
 * 
 * @param {number} value 
 * @returns 
 */
export function seconds(value) {

  return Math.round(value * 1_000_000) / 1000;

}
