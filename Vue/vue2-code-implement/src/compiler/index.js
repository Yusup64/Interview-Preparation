import { parseHtml } from "./parser";

export function compileToFunction(template) {

    // 1. 将template字符串转换成ast语法树
    let ast = parseHtml(template);
    console.log(ast);
}