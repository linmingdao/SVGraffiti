import './layout.scss';
import './family-roboto.scss';
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
     */
    sketchpad() {
        return this.$el.querySelector('#sketchpad');
    }

    /**
     * 获取侧边栏工具条容器节点
     */
    sidebar() {
        return this.$el.querySelector('.sidebar');
    }

    /**
     * 获取设置面板容器节点
     */
    settings() {
        return this.$el.querySelector('.settings_box');
    }


}