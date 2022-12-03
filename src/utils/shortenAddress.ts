export default function shortenAddress(addr: string) {
    const firstFive = addr.substring(0, 5)
    const len = addr.length
    const lastFour = addr.substring(len - 4)
    return `${firstFive}...${lastFour}`
  }
  