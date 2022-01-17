class Node {
    constructor(element, parent) {
        this.element = element
        this.left = null //左子树
        this.right = null
        // this.parent = parent
    }
}
// 算法 二叉树 （先中后序遍历）（递归，非递归）
/**
 * 排序： ------>  先序，后序，中序
 * */
class BinarySearchNode {
    constructor() {
        this.root = null;
    }
    append(element) {
        if (this.root == null) {
            this.root = new Node(element)
        } else {
            let current = this.root;
            let temp = null
            while (current) { //找到最后一个节点
                if (current.element > element) {
                    temp = current
                    current = current.left
                } else {
                    temp = current
                    current = current.right
                }
            }
            if (temp.element > element) {
                temp.left = new Node(element)
            } else {
                temp.right = new Node(element)
            }
        }
    }
    // 前序遍历
    prevOrderTraversal() {
        function traversal(node) {
            if (!node) return
            console.log('node', node.element);
            traversal(node.left)
            traversal(node.right)

        }
        traversal(this.root)
    }
    // 非递归前序遍历
    prevOrderTraversal2() {
        let stack = [this.root]
        let currentNode
        while (currentNode = stack.pop()) {
            console.log(currentNode.element);
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
        }
    }
    // 中序遍历
    inOrderTraversal() {
        function traversal(node) {
            if (!node) return
            traversal(node.left)
            console.log('node', node.element);
            traversal(node.right)

        }
        traversal(this.root)
    }
    // 非递归中序遍历
    inOrderTraversal2() {
        let stack = []
        let currentNode = this.root
        while (currentNode || stack.length) {
            while (currentNode) {
                stack.push(currentNode)
                currentNode = currentNode.left
            }
            currentNode = stack.pop()
            console.log(currentNode.element);
            currentNode = currentNode.right
        }
    }
    // 后序遍历
    postOrderTraversal() {
        function traversal(node) {
            if (!node) return
            traversal(node.left)
            console.log('node', node.element);
            traversal(node.right)

        }
        traversal(this.root)
    }
    // 非递归后序遍历
    postOrderTraversal2() {
        let stack = []
        let currentNode = this.root
        while (currentNode || stack.length) {
            while (currentNode) {
                stack.push(currentNode)
                currentNode = currentNode.right
            }
            currentNode = stack.pop()
            console.log(currentNode.element);
            currentNode = currentNode.left
        }
    }
    // 层序遍历
    levelOrderTraversal() {
        let stack = [this.root]
        let i = 0;
        let currentNode
        while (currentNode = stack[i++]) {
            console.log(currentNode.element);
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
    // 反转二叉树
    invertTree() {
        function traversal(node) {
            if (!node) return
            let l = node.left;
            let r = node.right;
            node.left = r;
            node.right = l
            traversal(node.left)
            traversal(node.right)

        }
        traversal(this.root)
    }
    // 非遍历 反转二叉树
    invertTree2() {
        let stack = [this.root]
        let currentNode
        while (currentNode = stack.pop()) {
            let l = currentNode.left
            let r = currentNode.right
            currentNode.left = r
            currentNode.right = l
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
};
let bst = new BinarySearchNode();
bst.append(10);
bst.append(8);
bst.append(19);
bst.append(6);
bst.append(15);
bst.append(22);
bst.append(20);
// bst.invertTree();
// console.log(bst);
bst.prevOrderTraversal2()
// bst.prevOrderTraversal()
// bst.prevOrderTraversal()
// bst.levelOrderTraversal()
