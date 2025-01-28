export function formatAddress(address?: string): string {
  if (!address) {
    return ''
  }

  if (address.length <= 9) {
    return address
  }

  const firstPart = address.slice(0, 5)
  const lastPart = address.slice(-4)
  return `${firstPart}...${lastPart}`
}
