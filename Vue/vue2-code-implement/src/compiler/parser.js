/*
{
    tag: "div",
    type: 1,
    attrs: [{name: "yusup", value: "app"}],
    children: null
}
*/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名的  aa-xxx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  aa:aa-xxx  
const startTagOpen = new RegExp(`^<${qnameCapture}`); //  此正则可以匹配到标签名 匹配到结果的第一个(索引第一个) [1]
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>  [1]
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

// [1]属性的key   [3] || [4] ||[5] 属性的值  a=1  a='1'  a=""
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  />    > 
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{   xxx  }}  
export function parseHtml(html) {
    let stack = [];
    let root = null;
    // 不停的截取字符串，直到没有内容
    function createAstElement(tagName, parent, attrs) {
        return {
            tag: tagName,
            type: 1,
            attrs: attrs,
            children: [],
            parent: parent
        }
    }
    function start(tagName, attrs) {
        // 遇到开始标签 就取栈中的最后一个元素
        let parent = stack[stack.length - 1];
        let element = createAstElement(tagName, parent, attrs);
        if (!root) {
            root = element;
        }
        if (parent) {
            element.parent = parent; //更新p的parent指向
            parent.children.push(element);
        }
        stack.push(element);
    }
    function end(tagName) {
        let endTag = stack.pop();
        if (endTag.tag != tagName) {
            console.log('标签不匹配');
        }
    }
    function text(chars) {
        let parent = stack[stack.length - 1];
        chars = chars.replace(/\s/g, "");
        if (chars) {
            parent.children.push({
                type: 2,
                text: chars,
                parent: parent
            })
        }
    }
    function advance(len) {
        html = html.substring(len);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);

            let end;
            let attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) { //有属性，不能为开始的结束标签
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
                advance(attr[0].length);
            }
            if (end) {
                advance(end[0].length);
            }
            return match
        }
        else return null
    }
    while (html) {
        // 解析标签和文本
        let index = html.indexOf('<');
        if (index === 0) {
            // 解析开始标签
            const startTagMatch = parseStartTag();
            if (startTagMatch) { //开始标签
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue
            }
            let endTagMatch;
            if (endTagMatch = html.match(endTag)) { //结束标签
                end(endTagMatch[1])
                advance(endTagMatch[0].length);
                continue
            }
        }
        // 文本
        if (index > 0) {
            let chars = html.substring(0, index);
            text(chars)
            advance(chars.length);
        }
    }
    return root
}