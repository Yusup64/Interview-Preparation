export function isFunction(val) {
    return typeof val === 'function';
}
export function isObject(val) {
    return val !== null && typeof val === 'object';
}
export const isArray = Array.isArray
let callbacks = [];
let waiting = false;
function flushCallbacks() {
    callbacks.forEach(cb => cb());
    waiting = false;
    callbacks = [];
}
export function nextTick(fn) {
    callbacks.push(fn);
    if (!waiting) {
        Promise.resolve().then(flushCallbacks)
        waiting = true
    }
}
let strats = {}; //存放所有策略
let lifeCycle = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
lifeCycle.forEach(hook => {
    strats[hook] = function (parentVal, childVal) {
        if (childVal) {
            if (parentVal) {
                return parentVal.concat(childVal)
            } else {
                if(isArray(childVal)){
                    return childVal;
                }
                return [childVal]
            }
        } else {
            return parentVal
        }
    }
})
export function mergeOptions(parenetVal, childValue) {
    const options = {};
    for (let key in parenetVal) {
        mergeFiled(key)
    }
    for (let key in childValue) {
        if (!parenetVal.hasOwnProperty(key)) {
            mergeFiled(key)
        }
    }
    function mergeFiled(key) {
        // 设计模式   策略模式
        if (strats[key]) {
            options[key] = strats[key](parenetVal[key], childValue[key])
        } else {
            options[key] = parenetVal[key] || childValue[key]
        }
    }
    return options;
}