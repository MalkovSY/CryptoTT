export default function maskStrLength10(str) {
  if(str.length > 10) {
    return str.slice(0, 6)
  } else {
    return str
  }
}