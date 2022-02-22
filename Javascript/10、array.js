{
    Array.prototype.flat = function (depth) {
        return this.reduce(function (result, curr) {
            return result.concat((Array.isArray(curr) && (depth > 1)) ? curr.flat(depth - 1) : curr);
        }, []);
    }

    let res = [1, 2, [3, 4, [5, 6]], 7, 8].flat(1);
    console.log(res);
};

const isString = isType('String');
const isArray = isType('Array');
function isType(type) {
    return function(value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    }
}
// console.log(isString('123'));