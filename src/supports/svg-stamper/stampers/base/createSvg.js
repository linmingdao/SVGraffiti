const NS = 'http://www.w3.org/2000/svg';
const ATTR_NS = 'http://www.w3.org/1999/xlink';

const createSvg = (tag, attrs) => {
    if (!document.createElementNS) {
        return {
            msg: 'your client does not support svg.'
        };
    }
    const svgObj = document.createElementNS(NS, tag);
    for (let key in attrs) {
        switch (key) {
            case 'xlink:href':
                // 文本路径添加属性特有
                svgObj.setAttributeNS(ATTR_NS, key, attrs[key]);
                break
            default:
                svgObj.setAttribute(key, attrs[key]);
        }
    }
    return svgObj;
};

export default createSvg;