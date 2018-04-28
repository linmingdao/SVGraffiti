import Publisher from '../../src/supports/pubsub/publisher';
import Topic from '../../src/supports/pubsub/decorators/topic';

@Topic('iphone')
export default class PubIphone extends Publisher {

}