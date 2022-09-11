export const shortenAddress = (addr) => {
    const firstPart = addr.substring(0, 5)
    const len = addr.length
    const lastPart = addr.substring(len - 4)
    return `${firstPart}...${lastPart}`
}

export default shortenAddress;