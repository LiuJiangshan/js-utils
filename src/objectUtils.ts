export function toArray(object: any = {}) {
    return Object.keys(object).map(it => {
        return object[it]
    })
}
