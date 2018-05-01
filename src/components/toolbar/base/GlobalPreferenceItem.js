export default class PreferenceItem {
    constructor(config) {
        this.config = config;
        this.type = config.type;
        this.tag = config.tag;
        this.active = config.active;
        this.init();
    }

    init() {
        this.$item = document.createElement('div');
        this.$item.className = 'item enabled';

        this.$content = document.createElement('a');
        this.$content.setAttribute('global_preference', this.tag);
        this.$content.className = 'content';
        this.$content.style.backgroundImage = `url(${this.config.icon_active})`;
        this.$item.appendChild(this.$content);
    }

    getView() {
        return this.$item;
    }
}