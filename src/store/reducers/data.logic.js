export const sorter = (a, b) => {
  const bStr = b.deck.updateDt
  const bb = new Date(
    +bStr.slice(0, 4),
    +bStr.slice(5, 7),
    +bStr.slice(8, 10),
    +bStr.slice(11, 13),
    +bStr.slice(14, 16),
    +bStr.slice(17, 19),
  )

  const aStr = a.deck.updateDt
  const aa = new Date(
    +aStr.slice(0, 4),
    +aStr.slice(5, 7),
    +aStr.slice(8, 10),
    +aStr.slice(11, 13),
    +aStr.slice(14, 16),
    +aStr.slice(17, 19),
  )

  // console.log(bb, aa, bb - aa);

  return bb - aa
}
