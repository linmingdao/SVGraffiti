import SubScatterer from '../../supports/pubsub/base/subscatterer';
import Topics from '../../supports/pubsub/base/topics';
import ColorPickerPanel from './panels/ColorPickerPanel';
import GlobalPreferencesPanel from './panels/global/GlobalPreferencesPanel';
import LinePreferencesPanel from './panels/line/LinePreferencesPanel';
import CurvePreferencesPanel from './panels/curve/CurvePreferencesPanel';
import PolylinePreferencesPanel from './panels/polyline/PolylinePreferencesPanel';
import TrianglePreferencesPanel from './panels/triangle/TrianglePreferencesPanel';
import RectPreferencesPanel from './panels/rect/RectPreferencesPanel';
import EllipsePreferencesPanel from './panels/ellipse/EllipsePreferencesPanel';
import PolygonPreferencesPanel from './panels/polygon/PolygonPreferencesPanel';
import EraserPreferencesPanel from './panels/eraser/EraserPreferencesPanel';

@Topics(['local_preference', 'global_preference', 'function', 'resident_function'])
export default class Settings extends SubScatterer {

    constructor(container) {
        super();

        const colorPickerPanel = new ColorPickerPanel(container).hide();
        const globalPreferencesPanel = new GlobalPreferencesPanel(container).hide();
        const linePreferencesPanel = new LinePreferencesPanel(container).hide();
        const curvePreferencesPanel = new CurvePreferencesPanel(container).hide();
        const polylinePreferencesPanel = new PolylinePreferencesPanel(container).hide();
        const trianglePreferencesPanel = new TrianglePreferencesPanel(container).hide();
        const rectPreferencesPanel = new RectPreferencesPanel(container).hide();
        const ellipsePreferencesPanel = new EllipsePreferencesPanel(container).hide();
        const polygonPreferencesPanel = new PolygonPreferencesPanel(container).hide();
        const eraserPreferencesPanel = new EraserPreferencesPanel(container).hide();

        this.preferences = {
            local_preference: {
                line: {
                    show: false,
                    target: linePreferencesPanel
                },
                curve: {
                    show: false,
                    target: curvePreferencesPanel
                },
                polyline: {
                    show: false,
                    target: polylinePreferencesPanel
                },
                triangle: {
                    show: false,
                    target: trianglePreferencesPanel
                },
                rect: {
                    show: false,
                    target: rectPreferencesPanel
                },
                ellipse: {
                    show: false,
                    target: ellipsePreferencesPanel
                },
                polygon: {
                    show: false,
                    target: polygonPreferencesPanel
                },
                eraser: {
                    show: false,
                    target: eraserPreferencesPanel
                }
            },
            global_preference: {
                color_pallet: {
                    show: false,
                    target: colorPickerPanel
                },
                setting: {
                    show: false,
                    target: globalPreferencesPanel
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