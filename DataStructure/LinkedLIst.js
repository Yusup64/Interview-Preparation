// 线性结构  栈（先进后出）  队列 （先进先出）
// 链表关联每一个节点数据来使用，删除头部和尾部，向前追加，向后追尾有优势

// 单项链表（只有next） 双项链表（有pre）  循环 tail.next -> head   head.next -> tail

class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    _getNode(index) {
        let head = this.head;
        for (let i = 0; i < index; i++) {
            head = head.next;
        }
        return head;
    }
    append(index, element) { //添加节点
        if (arguments.length == 1) {
            element = index;
            index = this.size
        }
        if (index == 0) {
            let oldHead = this.head;
            let node = new Node(element, oldHead)
            this.head = node;
        } else {
            let prevNode = this._getNode(index - 1);
            let node = new Node(element, prevNode.next);
            prevNode.next = node;
        }

        this.size++
    }
    remove(index) {
        let removeNode;
        if (index == 0) {
            removeNode = this.head;
            this.head = this.head.next;
        } else {
            let prevNode = this._getNode(index - 1);
            removeNode = prevNode.next;
            prevNode.next = prevNode.next.next;
        }
        this.size--
        return removeNode
    }
    update(index, element) {
        let node = this._getNode(index);
        node.element = element;
    }
    getNode(index) {
        return this._getNode(index)
    }
}

let l1 = new LinkedList();
// l1.append(3);
// l1.append(2);
// l1.append(6);
// l1.append(1, 100);
// l1.append(4);
// l1.append(5);
// l1.remove(2)
l1.append(1);
l1.append(2);
l1.append(3);
l1.append(4);
l1.append(5);


/**
 * //题目 反转单向链表
 * */

function reverseLinkedList(linkedList) {
    let head = linkedList.head;
    if (!head || head.next == null) return head;
    let newHead;
    while (head) {
        let n = head.next;//通过n来引用链表，否则heac.next = null后面的就收回了
        head.next = newHead //把head的next指向newHead
        newHead = head //
        head = n
    }
    return newHead;

}
console.log(reverseLinkedList(l1));