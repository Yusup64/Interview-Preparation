/**
 * @description 类型大全
    boolean（布尔类型）
    number（数字类型）
    string（字符串类型）
    array（数组类型）
    tuple（元组类型）
    enum（枚举类型）
    any（任意类型）
    null 和 undefined 类型
    void 类型
    never 类型
    object 对象类型
 *  */

let a: string = 'Yusup';
let b: number = 123;
let c: boolean = true;
let d: string[] = ['1', '2', '3'];
let e: [number, string] = [1, '2'];
let f: any = 'any';
enum G {
    CAT,
    DOG,
    MOUSE
}

interface Task {
    title: string
    description: string
    expires: Date
}
/* interface TaskView {
    title: string
    description: string
} */

// type TaskView = Partial<Task>
type TaskView = {
    [key in keyof Task]?: Task[key]
};

const task: TaskView = {
    title: 'Task 1'
}