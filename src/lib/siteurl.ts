export const siteurl = (param: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL + param}`
}