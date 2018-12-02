const getFrequency = (changes) => {
  return changes.split('\n').reduce((acc, cur) => (
    acc + parseInt(cur, 10)
  ), 0)
}