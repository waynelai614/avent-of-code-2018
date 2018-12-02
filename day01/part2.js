const firstDuplicateFrequency = (changes) => {
  let result

  const changesArr = changes.split('\n')
  const frequencyHistory = { 0: true }
  let lastFrequency = 0

  while (result === undefined) {
    for (let change of changesArr) {
      lastFrequency += parseInt(change, 10)

      if (frequencyHistory[lastFrequency]) {
        result = lastFrequency
        break
      }

      frequencyHistory[lastFrequency] = true
    }
  }

  return result
}