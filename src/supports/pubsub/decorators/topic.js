import PubSub from '../pubsub';

/**
 * 
 * @param {Object} topic { topic: 'xxx' }
 * @return {Function} decorator func
 */
export default function Topic(topic) {
    return function (target) {
        target.topic = topic;
        PubSub.registerTopic(topic);
    }
}