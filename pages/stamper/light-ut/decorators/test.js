/**
 * 
 * @param target 始终是这个类的实例句柄
 * @param name 属性名字（方法名字）
 * @param descriptor 属性描述符
 */
export default function Test(target, name, descriptor) {
    target[name]['test'] = true;
    descriptor.enumerable = true;
    return descriptor;
}