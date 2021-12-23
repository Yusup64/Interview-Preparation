const EventEmitter = require("events");
const fs = require("fs");
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.mode = options.mode || 0o666;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.open()

        this.len = 0;
        this.offset = this.start;
        this.cache = [];
        this.needDrain = false;
    }
    write(chunk, encoding, cb = () => { }) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        this.needDrain = this.len >= this.highWaterMark;

        return !this.needDrain
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
    write(buffer, encoding, callback) {

    }
    destroy(err) { }
}
module.exports = WriteStream;