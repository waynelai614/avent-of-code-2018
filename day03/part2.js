const getIsolatedId = (input) => {
  const records = input
    .split('\n')
    .map((str, index) => {
      const record = str
        .replace(/@|:/gi, ';')
        .split(';')
      const inches = record[1].split(',')
      const box = record[2].split('x')

      return {
        id: index + 1,
        left: parseInt(inches[0], 10),
        top: parseInt(inches[1], 10),
        width: parseInt(box[0], 10),
        height: parseInt(box[1], 10)
      }
    })

  const fabric = []
  const isolatedIds = {}

  records.forEach((record) => {
    const {
      id,
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
          fabric[top][left + i] = id

          if (isolatedIds[id] !== false) isolatedIds[id] = true
        } else {
          isolatedIds[fabric[top][left + i]] = false
          isolatedIds[id] = false

          fabric[top][left + i] = id
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

  return Object.keys(isolatedIds).filter((key) => isolatedIds[key])
}