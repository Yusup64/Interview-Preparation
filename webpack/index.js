// console.log('QNMD')
// class Animal {
//     constructor() {
//         this.name = 'animal';
//     }
// }
// let animal = new Animal();
// console.log(animal);

function throttle(...args) {
    console.log(args);
    /* // 记录第一次的调用时间
    var prev = null;
    console.log(prev);
    // 返回闭包函数
    return function () {
        // 保存事件参数
        var args = arguments;
        // 记录现在调用的时间
        var now = Date.now();
        // console.log(now);
        // 如果间隔时间大于等于设置的节流时间
        if (now - prev >= delay) {
            // 执行函数
            fn.apply(this, args);
            // 将现在的时间设置为上一次执行时间
            prev = now;
        }
    } */
}

@throttle(300)
function mouseMove(e) {
    // console.log(e);
}

document.onmousemove = mouseMove