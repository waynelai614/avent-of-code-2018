const checksum = (input) => {
  const multipleTimes = {
    2: 0,
    3: 0
  }

  for(let id of input.split('\n')) {
    const countTimes = id.split('').reduce((acc, cur) => {
      acc[cur] ? acc[cur]++ : acc[cur] = 1
      return acc
    }, {})

    const timesPerId = Object.keys(countTimes).reduce((acc, cur) => {
      if ([2, 3].includes(countTimes[cur])) acc[countTimes[cur]].push(cur)
      return acc
    }, { 2: [], 3: [] })

    Object.keys(multipleTimes).forEach(times => {
       (timesPerId[times].length > 0) && multipleTimes[times]++
    })
  }

  return multipleTimes[2] * multipleTimes[3]
}