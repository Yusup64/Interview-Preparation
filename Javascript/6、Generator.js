
function* read() {
    const a = yield 1;
    const b = yield 2;
    const c = yield 3;
}

let it = read();
console.log(...it);

let obj = {
    
}