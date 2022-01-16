export function createElement(vm, tag, data = {}, ...children) { //返回一个虚拟dom
    return vnode(vm, tag, data, children, data.key, undefined)
}
export function createText(vm, text) { //返回一个文本节点
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}
// 看两个是不是相同的节点
export function isSameVnode(oldVnode, newVnode) {
    return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}
function vnode(vm, tag, data, children, key, text) {
    return {
        vm,
        tag,
        data,
        children,
        key,
        text
    }
}