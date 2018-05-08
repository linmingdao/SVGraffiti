import SubScatterer from '../../supports/pubsub/base/subscatterer';
import Topics from '../../supports/pubsub/base/topics';
import ColorPicker from './settings/ColorPicker';
import Line from './settings/line/Line';

@Topics(['local_preference', 'global_preference'])
export default class Settings extends SubScatterer {

    constructor(container) {
        super();

        const colorPicker = new ColorPicker(container);
        const line = new Line(container);
        colorPicker.hide();
        line.hide();

        this.preferences = {
            local_preference: {
                line: {
                    show: false,
                    target: line
                }
            },
            global_preference: {
                color_pallet: {
                    show: false,
                    target: colorPicker
                }
            }
        };
    }

    notify(topic, entity) {
        console.log(topic, entity);

        if (this.activedSetting) {
            this.activedSetting.show = false;
            this.activedSetting['item']['target'].hide();
            const _topic = this.activedSetting.topic,
                _entity = this.activedSetting.entity;
            this.activedSetting = null;

            if (_topic === topic && _entity === entity) {
                return;
            }
        }

        const item = this.preferences[topic][entity];
        item.show = true;
        item['target'].show();
        this.activedSetting = {
            topic,
            entity,
            item
        };
    }
}