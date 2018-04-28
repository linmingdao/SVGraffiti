import Publisher from '../../src/supports/pubsub/publisher';
import Topic from '../../src/supports/pubsub/decorators/topic';

@Topic('sonybankrupt')
export default class PubSonyBankrupt extends Publisher {

}