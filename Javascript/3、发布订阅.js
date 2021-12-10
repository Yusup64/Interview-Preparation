// 题目 发布订阅

const { readFile } = require("fs")
const { EventEmitter } = require("stream")
/**
 * 发布订阅模式:    需要两个方法，"发布"和"订阅"
 **/
let event = {
    _arr: [],
    data: {},
    on(fn) {
        this._arr.push(fn)
    },
    emit(key, value) {
        this.data[key] = value
        this._arr.forEach(fn => fn(this.data))
    }
}
readFile('./Javascript/00.txt', (err, data) => {
    event.emit('name', data.toString('utf8'))
})
readFile('./Javascript/01.txt', (err, data) => {
    event.emit('age', data.toString('utf8'))
})
readFile('./Javascript/01.txt', (err, data) => {
    event.emit('age1', data.toString('utf8'))
})

event.on(data => {
    if (Reflect.ownKeys(data).length === 3) {
        console.log(data);
    }
})