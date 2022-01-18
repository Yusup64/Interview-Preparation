import { isSameVnode } from ".";
import { callHooks } from "../lifeCycle";

export function patch(oldVnode, vnode) {
    // 删除老节点，根据新节点替换老节点
    // console.log(el, vnode);
    const isRealElement = oldVnode.nodeType == 1;
    if (isRealElement) {
        let ele = createEle(vnode); //根据虚拟节点创建真实节点
        let parentNode = oldVnode.parentNode;
        parentNode.insertBefore(ele, oldVnode.nextSibling);
        parentNode.removeChild(oldVnode);
        return ele; //返回新的真实节点
    } else {
        // diff算法
        //只比较同级节点
        if (!isSameVnode(oldVnode, vnode)) {
            return oldVnode.parentNode.replaceChild(createEle(vnode), oldVnode.el);
        }
        // 2、父级节点没变
        let el = vnode.el = oldVnode.el;
        if (!oldVnode.tag) { //文本节点
            if (oldVnode.text !== vnode.text) {
                return el.nodeValue = vnode.text;
            }
        }
        // 3、元素
        updateProperties(vnode, oldVnode.data)

        // 比较儿子
        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || [];

        if (oldVnode.length && !newChildren.length) {// 1、老的有儿子，新的没儿子
            el.innerHTML = '';
        } else if (!oldChildren.length && newChildren.length) { // 2、老的没儿子，新的有儿子
            newChildren.forEach(child => {
                el.appendChild(createEle(child));
            })
        } else { // 3、老的有儿子，新的有儿子
            updaChildren(oldChildren, newChildren);
        }
    }
}

function createEle(vnode) {
    let { tag, data, children, text, vm } = vnode;
    if (typeof tag === 'string') {
        let el = document.createElement(tag);
        // 如果有data，则添加属性
        vnode.el = el;
        updateProperties(vnode, data);
        children.forEach(child => {
            el.appendChild(createEle(child))
        })
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}
function updateProperties(vnode, oldProps = {}) { //后续diff算法的时候再 进行对比
    /* for (let key in oldProps) {
        el.setAttribute(key, oldProps[key]);
    } */
    //初次渲染直接用oldProps给vnode赋值
    let el = vnode.el; //真实的dom节点
    let newProps = vnode.data || {};
    let newStyles = newProps.style || {};
    let oldStyles = oldProps.style || {};

    for (let key in oldStyles) {
        if (!newStyles[key]) {
            el.style[key] = '';
        }
    }
    // 新旧比对
    for (let key in newProps) { //直接用新的改掉老的
        if (key === 'style') {
            for (let syleProp in newStyles) {
                el.style[syleProp] = newStyles[syleProp];
            }
        } else {
            el.setAttribute(key, newProps[key]);
        }
    }
    for (let key in oldProps) { //老的没有的改掉
        if (!newProps[key]) {
            el.removeAttribute(key);
        }
    }
}
// 题目 vue2.0中的diff算法
function updaChildren(newChildren, oldChildren) {
    // vue内部优化（尽量提升性能，）
    let oldStartIndex = 0; //老的起始索引
    let oldStartVnode = oldChildren[0]; //老的起始节点
    let oldEndIndex = oldChildren.length - 1; //老的结束索引
    let oldEndVnode = oldChildren[oldEndIndex]; //老的结束节点

    let newStartIndex = 0; //新的起始索引
    let newStartVnode = newChildren[0]; //新的起始节点
    let newEndIndex = newChildren.length - 1; //新的结束索引
    let newEndVnode = newChildren[newEndIndex]; //新的结束节点

    function makeKeyByIndex(children) {
        let map = {};
        for (let i = 0; i < children.length; i++) {
            map[children[i].key] = i;
        }
        return map
    }
    let mapping = makeKeyByIndex(oldChildren)

    // diff算法复杂度：O(n)  比对的时候，指针交叉的时候结束
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) { //在指针移动的时候元素可能已经被移动走了
            oldStartVnode = oldChildren[++oldEndIndex];
        }
        else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldStartIndex];
        }

        if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode); //会递归比较子节点
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode); //会递归比较子节点
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) { //老的头节点和新的尾节点一样
            patch(oldStartVnode, newEndVnode); //会递归比较子节点
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) { //老的尾节点和新的头节点一样
            patch(oldEndVnode, newStartVnode); //会递归比较子节点
            el.insertBefore(oldEndVnode.el, oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[--newStartIndex];
        } else {
            // 之气的逻辑都是考虑，用户一般特殊逻辑，乱序排序
            let moveIndex = mapping[oldStartVnode.key];
            if (moveIndex == undefined) { //插入新的
                el.insertBefore(createEle(newStartVnode), oldStartVnode.el);
            } else { //移动老的
                let moveNode = oldChildren[moveIndex];
                el.insertBefore(moveNode.el, oldStartVnode.el);
                patch(moveNode, newStartVnode)
                oldChildren[moveIndex] = undefined; //把老的节点标记为空
            }
            newStartVnode = newChildren[++newStartIndex];
        }
    }
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 看一下 当前节点的下一个元素是否存在，如果存在则是插入到下一个元素的前面
            let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
            el.insertBefore(createEle(newChildren[i]), anchor);
            // el.appendChild(createEle(newChildren[i]));
        }
    }
    if (oldStartIndex <= oldEndIndex) { //老的还有剩余,直接删除
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i]
            child && el.removeChild(oldChildren[i].el);
        }
    }
}