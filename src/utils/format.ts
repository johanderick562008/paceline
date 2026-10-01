const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 })

export const formatPrice = (value: number) => gbp.format(value)

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')
