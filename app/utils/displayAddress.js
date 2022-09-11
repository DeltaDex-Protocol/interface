const displayAddress = (addr) => {
    if (addr === '') return 'Not connected'

    const firstPart = addr.substring(0, 5)
    const len = addr.length
    const lastPart = addr.substring(len - 4)

    return `${firstPart}...${lastPart}`
}

export default displayAddress;