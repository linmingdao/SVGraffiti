import PubSub from '../pubsub';

/**
 * 订阅者主题装饰器
 * @param {Array} topics
 */
export default function Topics(topics) {
    return target => {
        target.topics = topics;
        PubSub.registerTopics(topics);
    }
}