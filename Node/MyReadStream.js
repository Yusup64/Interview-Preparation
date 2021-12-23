const EventEmitter = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.end = options.end || null;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.flowing = false; // 是否流动
        this.open();
        //每次调用on方法，如果不是newListener事件就会触发newListener的回调函数
        this.on('newListener', (eventName) => {
            if (eventName == 'data') {
                this.read();
            }
        })

        this.offset = this.start
    };
    read() {
        if (typeof this.fd != 'number') {
            return this.once('open', () => this.read());
        }
        // 需要根据用户提供的start和end来计算读取的字节数
        let howMuchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.offset + 1) : this.highWaterMark
        let buffer = Buffer.alloc(howMuchToRead);
        fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
            if (bytesRead) {
                this.offset += bytesRead;
                this.emit('data', buffer);
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit('end');
                this.destroy()
            }
        })

    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.destroy(err)
            }
            this.fd = fd;
            this.emit('open', fd)
        })
    }
    destroy(err) {
        if (err) {
            this.emit('error', err)
        }
        if (this.autoClose) {
            fs.close(this.fd, (err) => {
                if (this.emitClose) {
                    this.emit('close')
                }
            })
        }
    }
    resume() {
        if (!this.flowing) {
            this.flowing = true
            this.read()
        }
    }
    pause() {
        if (this.flowing) {
            this.flowing = false;
        }
    }
}
module.exports = ReadStream;