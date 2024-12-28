const CHARS = "abcdefghijklmnopqrstuvwxyz09123456789";

export function randId(len = 6) {

  let result = "";

  for (let i = 0; i < len; i++) {

    result += CHARS[Math.floor(Math.random() * CHARS.length)];

  }

  return result;
  
}
