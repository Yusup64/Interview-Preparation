class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
class LinkedList {
    length: number | undefined;
    head: ListNode | null
    constructor() {
        this.head = null
        this.length = 0;
    }
    append(val: number): void {
        let head = this.head;
        let node = new ListNode(val)
        if (!head) this.head = node
        while (head?.next) {
            head = head.next
        }
        head.next = node
    }
}
export default LinkedList