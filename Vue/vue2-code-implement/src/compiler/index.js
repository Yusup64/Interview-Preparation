import { parseHtml } from "./parser";
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{   xxx  }}  

function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name == 'style') {
            let styles = {}
            attr.value.replace(/([^;:]+):([^;:]+)/g, function (match, key, value) {
                styles[key] = value
            })
            attr.value = styles
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`;
}
function gen(el) {
    if (el.type == 1) { //如果是元素
        return generate(el) //元素地柜生成代码
    }
    else {
        let text = el.text; //{{}}
        if (!defaultTagRE.test(text)) return `_v(${text})`; //说明就是普通文本

        let lastIndex = defaultTagRE.lastIndex = 0
        // 说明有表达式、需要做一个表达式和普通值的拼接 _v('aaaa' + _s(name) + 'bbb')
        let tokens = [];
        let match;
        while (match = defaultTagRE.exec(text)) { //如果正则  + g配合exec就会有一个问题lastIndex
            let index = match.index;
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }
        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`
    }
}

function genChilden(el) {
    let children = el.children;
    if (children) {
        return children.map(item => gen(item)).join(',')
    }
    return false
}
function generate(ast) {
    let children = genChilden(ast);
    let code = `_c('${ast.tag}', ${ast.attrs.length ? genProps(ast.attrs) : 'undefined'}, ${children ? children : 'undefined'})`;
    return code
}
export function compileToFunction(template) {

    // 1. 将template字符串转换成ast语法树
    let ast = parseHtml(template);

    // 2. 代码生成
    let code = generate(ast);

    let render = new Function(`with(this){return ${code}}`);
    return render
}