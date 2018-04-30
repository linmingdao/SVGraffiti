import './layout.scss';
import template from './layout.html';

export default class Layout {

    constructor(config) {
        this.layout(config);
    }

    /**
     * 布局
     * @param {Object} config 
     */
    layout(config) {
        this.$el = document.querySelector(config.el);
        this.$el.innerHTML = template;
    }

    /**
     * 获取画板svg节点
     * @returns {svgElement} 画板svg节点
     */
    sketchpad() {
        return this.$el.querySelector('#sketchpad');
    }

    sidebar() {
        return this.$el.querySelector('.sidebar');
    }

}