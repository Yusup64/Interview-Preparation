import { nextTick } from "../utils";

let queue = []; //这里存放的是watcher
let has = {}; //用来记录watcher是否已经添加过
let pending = false;
function flushSchedulerQueue() {
    queue.forEach(watcher => watcher.run());
    queue = [];
    has = {};
    pending = false;
}
export function queueWatcher(watcher) {
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);
        if (!pending) {
            nextTick(flushSchedulerQueue);
            pending = true;
        }
    }
}