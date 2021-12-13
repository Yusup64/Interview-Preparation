// 题目 发布订阅

const { readFile } = require("fs")
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
/**
 * 发布订阅模式
 * */
class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [callback]
        } else {
            this.events[eventName].push(callback)
        }
    }
    emit(eventName, ...args) {
        this.events[eventName].forEach(callback => {
            callback(...args)
        })
    }
    remove(eventName, callback) {
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }
    once(eventName, callback) {
        let fn = (...args) => {
            callback(...args)
            this.remove(eventName, fn)
        }
        this.on(eventName, fn)
    }
}
let events = new EventEmitter()
events.on('name', data => {
    console.log(1111, data);
})
events.on('age', data => {
    console.log(222, data);
})
events.emit('name', '张三')
events.emit('name', '李四')
events.once('age', data => {
    console.log(data);
})

