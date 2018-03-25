const uniqueArray = args => args.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

export {
  uniqueArray
}
