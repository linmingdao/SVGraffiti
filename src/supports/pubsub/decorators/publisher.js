import PubSub from './pubsub';

/**
 * 标记类实例是一个发布者，会自动注入publish能力
 * @param target 类
 */
export default function Publisher(target) {
    target.prototype['publish'] = function (topic, entity) {
        PubSub.publish(topic, entity);
    };
}