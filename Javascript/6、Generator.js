
function* read() {
    const a = yield 1;
    const b = yield 2;
    const c = yield 3;
}

let it = read();
console.log(...it);

let obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    [Symbol.iterator]: function () {
        let counter = 0;
        let self = this;
        let keys = Object.keys(self);
        return {
            next: () => {
                return {
                    value: {
                        key: keys[counter],
                        value: self[keys[counter++]]
                    },
                    done: Object.keys(this).length === counter
                }
            }
        }
    },
    [Symbol.toStringTag]: 'Hello', //[object Hello]
}