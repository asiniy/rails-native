type MenuItem = {
  active: boolean,
  title: string,
  icon: string,
  url: string,
}

const menuReducer = (_state: null|MenuItem[], action: { type: string, data: MenuItem[] }) => {
  const { type, data } = action

  switch (type) {
    case 'setMenu':
      return data
    default:
      throw new Error(`Undefined action: ${type}`)
  }
}

export default menuReducer
export { MenuItem }
