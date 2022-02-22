function sum() {
    let total = 0;
    for (let i = 0; i < 1000000; i++) {
        total += i;
    }
    return total;
}
let res = sum();
postMessage({
    event: 'sum',
    data: res
});