function offset(elem) {
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
        return {
            top: 0,
            left: 0
        };
    }

    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    rect = elem.getBoundingClientRect();
    win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}

export default class Line {

    constructor(config) {
        this.$graffitiPanel = config.$graffitiPanel;
        this.svg = config.svg;

        this.downX = null;
        this.downY = null;
        this.lineCanBeDrag = false;
        this.line = null;
        this.isDashed = false;
    }
    onMouseDown(event) {
        this.downX = event.clientX - $graffitiPanel.offset().left;
        this.downY = event.clientY - $graffitiPanel.offset().top;
    }
    onMouseMove() {
        var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
        var moveY = moveEvent.clientY - $graffitiPanel.offset().top;
        if (drawLineBusiness.line) {
            drawLineBusiness.line.attr({
                "x2": moveX,
                "y2": moveY
            });
        } else {
            // svg = Snap(".graffiti_panel");
            // var $graffitiPanel = $(".graffiti_panel");
            drawLineBusiness.line = svg.paper.line(drawLineBusiness.downX, drawLineBusiness.downY, moveX, moveY).attr({
                stroke: currentDrawColor,
                strokeWidth: 3,
                "stroke-opacity": 0.2,
                "stroke-linecap": "round"
            }).drag();

            if (drawLineBusiness.isDashed) {
                drawLineBusiness.line.attr({
                    "stroke-dasharray": "14,14"
                });
            }
        }
    }
    onMouseUp() {
        var upX = upEvent.clientX - $graffitiPanel.offset().left;
        var upY = upEvent.clientY - $graffitiPanel.offset().top;

        drawLineBusiness.line.attr({
            "x2": upX,
            "y2": upY,
            "visibility": ""
        });
        drawLineBusiness.line.attr({
            "stroke-opacity": 0.7
        });

        if (drawLineBusiness.lineCanBeDrag) {
            drawLineBusiness.line.mousedown(function (evt) {
                Utils.stopPropagation(Utils.getEvent(evt))
            });
            drawLineBusiness.line.drag();
        }
        drawLineBusiness.line = null;
    }
}