export default class SketchpadBaseClass {

    constructor(sketchpad) {
        this.sketchpad = sketchpad;
    }

    getSketchpad() {
        return this.sketchpad;
    }

    getPosition(event) {
        const boundingClientRect = this.sketchpad.getBoundingClientRect();
        return {
            x: event.clientX - boundingClientRect.left,
            y: event.clientY - boundingClientRect.top
        }
    }

    fireEvent(elem, eventName) {
        if (typeof (elem) == 'object') {
            eventName = eventName.replace(/^on/i, '');
            if (document.all) {
                eventName = "on" + eventName;
                elem.fireEvent(eventName);
            } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(eventName, true, true);
                elem.dispatchEvent(evt);
            }
        }
    }

    onmouseleave() {
        this.fireEvent(this.sketchpad, 'mouseup');
    }
}