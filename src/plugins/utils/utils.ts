export function snakeObjectToCamelObject<T, U>(obj: T): U {
    const camelObj: any = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (key[0] !== '_') {
                const camelKey = key.replace(/_([a-z])/g, (_match, p1) => p1.toUpperCase())
                camelObj[camelKey] = obj[key]
            }
        }
    }
    return camelObj
}