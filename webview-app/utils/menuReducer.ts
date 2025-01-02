type BottomMenuItem = {
  active: boolean,
  title: string,
  icon: string,
  url: string,
}

const bottomMenuReducer = (_state: null|BottomMenuItem[], action: { type: string, data: BottomMenuItem[] }) => {
  const { type, data } = action

  switch (type) {
    case 'setMenu':
      return data
    default:
      throw new Error(`Undefined action: ${type}`)
  }
}

export {
  BottomMenuItem,
  bottomMenuReducer,
}
