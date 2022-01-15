export function isFunction(val) {
    return typeof val === 'function';
}
export function isObject(val) {
    return val !== null && typeof val === 'object';
}
export function isArray(val) {
    return Array.isArray(val);
}