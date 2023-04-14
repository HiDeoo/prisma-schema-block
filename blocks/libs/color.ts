const nodeColors = [
  'hsl(230 94% 82%)',
  'hsl(156 72% 67%)',
  'hsl(31 97% 72%)',
  'hsl(353 96% 82%)',
  'hsl(50 98% 64%)',
  'hsl(269 97% 85%)',
  'hsl(82 85% 67%)',
  'hsl(199 95% 74%)',
  'hsl(0 94% 82%)',
  'hsl(171 77% 64%)',
]

let pickedNodeColorIndex = 0

export function getNodeColor() {
  const color = nodeColors[pickedNodeColorIndex]

  pickedNodeColorIndex++

  return color ?? `hsl(${Math.trunc(360 * Math.random())}, 90%,  80%)`
}
