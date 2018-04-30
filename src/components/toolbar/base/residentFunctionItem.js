export default class ResidentFunctionItem {
    constructor(config) {
        this.config = config;

        this.type = config.type;
        this.tag = config.tag;
        this.active = config.active;

        this.$item = document.createElement('div');

        this.init();
    }

    init() {
        this.$item.setAttribute('memoryfunctional', this.tag);
        this.$item.className = `function active`;
        this.$item.style = `background-image: url(${this.config.icon_active});`;
    }

    getView() {
        return this.$item;
    }
}