import Subscriber from '../../supports/pubsub/base/subscriber';
import Topics from '../../supports/pubsub/base/topics';
import {
    LineBusiness,
    CurveBusiness,
    RightTriangleBusiness,
    RectangleBusiness,
    EllipseBusiness,
    PolygonBusiness
} from '../functions/functions-mixin';
import preferences from './preferences.json';

const FUNCTIONS_CREATOR = {
    line: LineBusiness,
    curve: CurveBusiness,
    eraser: CurveBusiness,
    triangle: RightTriangleBusiness,
    rect: RectangleBusiness,
    ellipse: EllipseBusiness,
    polygon: PolygonBusiness
};

@Topics(['function', 'resident_function', 'set_preference'])
export default class Sketchpad extends Subscriber {

    constructor(sketchpad) {
        super();
        this.sketchpad = sketchpad;
        this.functionsPool = {};
        this.bindEvent();
        this.preferences = preferences;
        this.notify('function', 'curve');
    }

    empty() {
        this.sketchpad.innerHTML = '';
    }

    getPreferenceValue(name, namespace = '') {
        const preferences = this.preferences[namespace] || this.preferences;
        return preferences[name];
    }

    setPreferenceValue(value, name, namespace) {
        if (namespace) {
            !this.preferences[namespace] && (this.preferences[namespace] = {});
            this.preferences[namespace][name] = value;
        } else {
            this.preferences[name] = value;
        }
    }

    /**
     * 该接口由【PubSub消息管理中心】负责调用，画板组件在此接口处理接收到的消息类型
     * 1、处理Toolbar组件发送的 “切换画板绘制状态” ，对应的消息类型为：“function”
     * 2、处理Toolbar组件发送的 “清空绘制内容” ，对应的消息类型为：“resident_function”
     * 3、处理Settings组件发送的 “设置画板绘制参数” ，对应的消息类型为：“set_preference”
     * @param {String} topic 消息主题标识
     * @param {Object} entity 消息实体对象
     */
    notify(topic, entity) {
        if (topic === 'resident_function') {
            if (entity === 'empty') {
                this.empty();
            }
            return;
        }
        if (topic === 'function') {
            if (entity === 'curve' || entity === 'eraser') {
                if (!this.functionsPool['curve'] && !this.functionsPool['eraser']) {
                    this.functionsPool['curve'] = this.functionsPool['eraser'] = new CurveBusiness(this.sketchpad, this);
                }
                this.functionsPool['curve'].setBusinessMode(entity === 'eraser' ? CurveBusiness.MODE.ERASER : CurveBusiness.MODE.CURVE);
            } else {
                if (!this.functionsPool[entity]) {
                    this.functionsPool[entity] = new FUNCTIONS_CREATOR[entity](this.sketchpad, this);
                }
            }
            this.currentBusiness = this.functionsPool[entity];
            return;
        }
        if (topic === 'set_preference') {
            console.log('set_preference')
            console.log(entity)
            switch (entity.from) {
                case 'ColorPickerPanel':
                    this.setPreferenceValue(entity.color, 'strokeColor');
                    this.setPreferenceValue(entity.color, 'fillColor');
                    this.setPreferenceValue(entity.applyGloabal, 'applyGloabal');
                    break;
                case 'LinePreferencesPanel':
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'line');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'line');
                    this.setPreferenceValue([entity.strokeDash, entity.strokeDash], 'strokeDash', 'line');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'line');
                    break;
                case 'CurvePreferencesPanel':
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'curve');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'curve');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'curve');
                    break;
                case 'TrianglePreferencesPanel':
                    this.setPreferenceValue(entity.fillColor, 'fillColor', 'triangle');
                    this.setPreferenceValue(entity.fillOpacity, 'fillOpacity', 'triangle');
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'triangle');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'triangle');
                    this.setPreferenceValue([entity.strokeDash, entity.strokeDash], 'strokeDash', 'triangle');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'triangle');
                    break;
                case 'PolygonPreferencesPanel':
                    this.setPreferenceValue(entity.fillColor, 'fillColor', 'polygon');
                    this.setPreferenceValue(entity.fillOpacity, 'fillOpacity', 'polygon');
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'polygon');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'polygon');
                    this.setPreferenceValue([entity.strokeDash, entity.strokeDash], 'strokeDash', 'polygon');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'polygon');
                    break;
                case 'EllipsePreferencesPanel':
                    this.setPreferenceValue(entity.fillColor, 'fillColor', 'ellipse');
                    this.setPreferenceValue(entity.fillOpacity, 'fillOpacity', 'ellipse');
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'ellipse');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'ellipse');
                    this.setPreferenceValue([entity.strokeDash, entity.strokeDash], 'strokeDash', 'ellipse');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'ellipse');
                    break;
                case 'RectPreferencesPanel':
                    this.setPreferenceValue(entity.fillColor, 'fillColor', 'rect');
                    this.setPreferenceValue(entity.fillOpacity, 'fillOpacity', 'rect');
                    this.setPreferenceValue(entity.strokeColor, 'strokeColor', 'rect');
                    this.setPreferenceValue(entity.strokeWidth, 'strokeWidth', 'rect');
                    this.setPreferenceValue([entity.strokeDash, entity.strokeDash], 'strokeDash', 'rect');
                    this.setPreferenceValue(entity.strokeOpacity, 'strokeOpacity', 'rect');
                    this.setPreferenceValue(entity.strokeRadius, 'strokeRadius', 'rect');
                    break;
                case 'EraserPreferencesPanel':
                    this.setPreferenceValue(entity.size, 'size', 'eraser');
                    this.setPreferenceValue(entity.depth, 'depth', 'eraser');
                    break;
                default:
                    ;
            }
        }
    }

    bindEvent() {
        const __self = this;
        this.sketchpad.onmousedown = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmousedown && __self.currentBusiness.onmousedown(event);
        }
        this.sketchpad.onmousemove = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmousemove && __self.currentBusiness.onmousemove(event);
        }
        this.sketchpad.onmouseup = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmouseup && __self.currentBusiness.onmouseup(event);
        }
        this.sketchpad.onclick = function (event) {
            __self.currentBusiness && __self.currentBusiness.onclick && __self.currentBusiness.onclick(event);
        }
        this.sketchpad.onmouseleave = function (event) {
            __self.currentBusiness && __self.currentBusiness.onmouseleave && __self.currentBusiness.onmouseleave(event);
        }
    }
}