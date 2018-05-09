import SubScatterer from '../../supports/pubsub/base/subscatterer';
import Topics from '../../supports/pubsub/base/topics';
import ColorPicker from './settings/ColorPicker';
import Line from './settings/line/Line';
import Triangle from './settings/triangle/Triangle';

@Topics(['local_preference', 'global_preference', 'function'])
export default class Settings extends SubScatterer {

    constructor(container) {
        super();

        const colorPicker = new ColorPicker(container);
        const line = new Line(container);
        const triangle = new Triangle(container);
        colorPicker.hide();
        line.hide();
        triangle.hide();

        this.preferences = {
            local_preference: {
                line: {
                    show: false,
                    target: line
                },
                triangle: {
                    show: false,
                    target: triangle
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

        if (topic === 'local_preference' || topic === 'global_preference') {
            const item = this.preferences[topic][entity];
            if (item) {
                item.show = true;
                item['target'].show();
                this.activedSetting = {
                    topic,
                    entity,
                    item
                };
            }
        }
    }
}