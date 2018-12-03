const countOverlap = (input) => {
  const records = input
    .split('\n')
    .map((str) => {
      const record = str
        .replace(/@|:/gi, ';')
        .split(';')
      const inches = record[1].split(',')
      const box = record[2].split('x')

      return {
        left: parseInt(inches[0], 10),
        top: parseInt(inches[1], 10),
        width: parseInt(box[0], 10),
        height: parseInt(box[1], 10)
      }
    })

  const fabric = []

  records.forEach((record) => {
    const {
      left,
      top,
      width,
      height
    } = record

    // creat new row if not exist
    if (!fabric[top]) {
      fabric[top] = []
    }

    function horizonInsert(top) {
      for (i = 0; i <= width - 1; i++) {
        if (!fabric[top][left + i]) {
          fabric[top][left + i] = 1
        } else {
          fabric[top][left + i] += 1
        }
      }
    }

    function verticalInsert(top) {
      for (y = 1; y <= height - 1; y++) {
        if (!fabric[top + y]) {
          fabric[top + y] = []
        }
        horizonInsert(top + y)
      }
    }

    horizonInsert(top)
    verticalInsert(top)
  })

  return fabric.reduce((acc, cur) => {
    const countsOverTwo = cur.filter((c) => c >= 2).length
    return acc + countsOverTwo
  }, 0)
}