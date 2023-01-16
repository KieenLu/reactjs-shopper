export const currency = (money) => {
    return new Intl.NumberFormat().format(money)
}