class TrafficLight {
    constructor() {
        this.task = Promise.resolve();
    }
    setColor(color, time) {
        this.task = this.task.then(() => {
            return new Promise((resolve, reject) => {
                console.log(`${color} light`);
                setTimeout(() => {
                    resolve();
                }, time * 1000)
            })
        })
        return this
    }
}
let light = new TrafficLight();
function start() {
    return light.setColor('red', 2).setColor('yellow', 1).setColor('green', 3);
}
start();

setInterval(() => {
    console.log(light.task);
}, 2000);