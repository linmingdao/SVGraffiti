/**
 * Created by LinMingDao on 2016/4/26.
 */
(function () {

    /******************************************************** 工具类方法 ********************************************************/

    var Utils = {
        addHandler: function (element, type, handler) { // 添加句柄
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        removeHandler: function (element, type, handler) { // 删除句柄
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        getEvent: function (event) { // 获取event对象
            return event ? event : window.event;
        },
        getType: function (event) {
            return event.type;
        },
        getElement: function (event) {
            return event.target || event.srcElement;
        },
        preventDefault: function (event) { //阻止浏览器默认行为
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) { //阻止事件冒泡
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        forbidUserSelect: function ($region) { // 节点不可被鼠标选中
            $region
                .attr("unselectable", "on")
                .css({
                    "-moz-user-select": "-moz-none",
                    "-moz-user-select": "none",
                    "-o-user-select": "none",
                    "-khtml-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none",
                    "user-select": "none"
                })
                .bind("selectstart", function () {
                    return false;
                });
        },
        forbidScrollBar: function ($region) { // 节点禁用滚动条
            $region.css("overflow", "hidden");
        },
        calDegree: function (x1, y1, x2, y2) { // 计算线段与水平线的夹角
            var dis = Utils.calDistance(x1, y1, x2, y2);
            var cos = Math.abs(x2 - x1) / dis;
            var degree = Math.acos(cos) * 180 / Math.PI;
            if (x1 < x2) {
                if (y1 > y2) { //逆时针旋转
                    degree = -degree;
                }
            } else {
                if (y1 < y2) { //逆时针旋转
                    degree = 180 - degree;
                } else {
                    degree = 180 - degree;
                    degree = -degree;
                }
            }
            return degree;
        },
        calDistance: function (x1, y1, x2, y2) { // 计算两点之间的距离
            var disX = Math.abs(x1 - x2);
            var disY = Math.abs(y1 - y2);
            return Math.pow((disX * disX + disY * disY), 0.5);
        },
        calMidpoint: function (x1, y1, x2, y2) { // 计算两点的中点
            return {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2
            };
        },
        getCurrentTimeMillis: function () { // 返回 1970 年 1 月 1 日至今的毫秒数，可以用来设置某时刻创建对象时的唯一ID
            return new Date().getTime();
        },
        calMatrix: function (x1, y1, x2, y2) { // 已知对称轴的两点，求对称矩阵
            var a = y1 - y2;
            var b = x2 - x1;
            var c = x1 * y2 - x2 * y1;
            return [(b * b - a * a) / (a * a + b * b), -2 * a * b / (a * a + b * b), -2 * a * b / (a * a + b * b),
                (a * a - b * b) / (a * a + b * b), -2 * a * c / (a * a + b * b), -2 * b * c / (a * a + b * b)
            ];
        },
        calBezierCtrlPoint: function (ps, i, a, b) { // 计算三次贝塞尔控制点
            if (!a || !b) {
                a = 0.25;
                b = 0.25;
            }
            var pAx;
            var pAy;
            var pBx;
            var pBy;
            //处理两种极端情形
            if (i < 1) {
                pAx = ps[0].x + (ps[1].x - ps[0].x) * a;
                pAy = ps[0].y + (ps[1].y - ps[0].y) * a;
            } else {
                pAx = ps[i].x + (ps[i + 1].x - ps[i - 1].x) * a;
                pAy = ps[i].y + (ps[i + 1].y - ps[i - 1].y) * a;
            }
            if (i > ps.length - 3) {
                var last = ps.length - 1;
                pBx = ps[last].x - (ps[last].x - ps[last - 1].x) * b;
                pBy = ps[last].y - (ps[last].y - ps[last - 1].y) * b;
            } else {
                pBx = ps[i + 1].x - (ps[i + 2].x - ps[i].x) * b;
                pBy = ps[i + 1].y - (ps[i + 2].y - ps[i].y) * b;
            }
            return {
                pA: {
                    x: pAx,
                    y: pAy
                },
                pB: {
                    x: pBx,
                    y: pBy
                }
            }
        }
    };

    /******************************************************** layout 兼容性处理 ********************************************************/

    var $user_wrap = $('.user_wrap');
    // 兼容user_wrap居中显示
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    //var advisableSize = 4 * (windowWidth > windowHeight ? windowHeight : windowWidth) / 5;
    $user_wrap.width(4 * windowWidth / 5);
    $user_wrap.height(4 * windowHeight / 5);
    $user_wrap.css("margin-top", (windowHeight - $user_wrap.height()) / 2);

    /******************************************************** layout 兼容性处理 ********************************************************/

    var $graffiti_wrap = $('.graffiti_wrap');

    var $panel_wrap = $('.panel_wrap');
    var $settings_panel = $('.settings_panel');
    var $settings = $('.settings');
    var $right_slider_wrap = $('.right_slider_wrap');

    var $toolbar = $('.toolbar');
    var $tools = $('.tools');

    /*************************************************************************************************/

    // 兼容 画板 和 toolbar
    $toolbar.width(70);
    $toolbar.height($panel_wrap.height());
    //console.log($graffiti_wrap.height());
    $panel_wrap.width($graffiti_wrap.width() - 75);

    /*************************************************************************************************/

    // 兼容toolbar中的内容 渲染toolbar
    $tools.slimscroll({
        height: $toolbar.height() + 'px',
        borderRadius: '7px',
        start: $('.square_btn'),
        wheelStep: 10
        //railVisible: true,
        //alwaysVisible: true
    });

    /*************************************************************************************************/

    $settings_panel.width($panel_wrap.width());
    $settings_panel.height($panel_wrap.height());
    $settings.slimscroll({
        height: $settings_panel.height() + 'px',
        borderRadius: '7px',
        wheelStep: 10
    });

    /*************************************************************************************************/

    var svg_line = Snap(".line");
    var $svg_line = $(".line");

    svg_line.paper.line(4, $svg_line.height() / 2, $svg_line.width() - 4, $svg_line.height() / 2).attr({
        fill: "none",
        stroke: "#00CCCC",
        strokeWidth: 6,
        "stroke-opacity": 0.7,
        "stroke-linecap": "round"
    });

    var increment_x = $svg_line.width() / 5;
    var increment_y = $svg_line.height() / 5;

    var bezierPoints = [{
            x: 10,
            y: 4 * $svg_line.height() / 5
        },
        {
            x: 6 + increment_x,
            y: 4 * $svg_line.height() / 5 - increment_y
        },
        {
            x: 6 + 2 * increment_x,
            y: 4 * $svg_line.height() / 5 - 3 * increment_y
        },
        {
            x: 6 + 3 * increment_x,
            y: 4 * $svg_line.height() / 5 - 3 * increment_y
        },
        {
            x: 6 + 3.5 * increment_x,
            y: $svg_line.height() / 2
        },
        {
            x: 6 + 4 * increment_x,
            y: 4 * $svg_line.height() / 5 + increment_y / 3
        },
        {
            x: $svg_line.width() - 10,
            y: 2 * $svg_line.height() / 5
        }
    ];
    var bezierPathStr = "";
    for (var i = 0; i < bezierPoints.length; i++) {
        if (i == 0) {} else {
            var ctrlP = Utils.calBezierCtrlPoint(bezierPoints, i - 1);
            // 记录笔迹数据
            bezierPathStr += "M" + bezierPoints[i - 1].x + " " + bezierPoints[i - 1].y + "C" + ctrlP.pA.x + " " + ctrlP.pA.y + " " + ctrlP.pB.x + " " + ctrlP.pB.y + " " + bezierPoints[i].x + " " + bezierPoints[i].y;
        }
    }

    var setting_line = svg_line.paper.path(bezierPathStr).attr({
        stroke: "red",
        strokeWidth: 6,
        fill: "none",
        "stroke-opacity": 0.7,
        "stroke-linecap": "round" // 处理锯齿
    });

    console.log(bezierPathStr)

    bezierPoints.forEach(function (point) {
        svg_line.paper.circle(point.x, point.y, 5).attr({
            stroke: "red",
            fill: "#fff",
            strokeWidth: 6,
            "stroke-opacity": 0.3,
            "stroke-linecap": "round" // 处理锯齿
        });
    });

    var $sliders = $('.sliders');
    $sliders.slimscroll({
        color: '#fff',
        height: $right_slider_wrap.height() + 'px',
        borderRadius: '7px',
        wheelStep: 10
    });

    var slider_line_stroke_width = $(".line_stroke_width").jRange({
        from: 1.0,
        to: 12.0,
        step: 0.5,
        theme: 'theme-blue',
        scale: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_line.attr({
            strokeWidth: slider_line_stroke_width.val()
        });
    });

    var slider_line_stroke_opacity = $(".line_stroke_opacity").jRange({
        from: 0.1,
        to: 1.0,
        step: 0.1,
        theme: 'theme-blue',
        scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_line.attr({
            "stroke-opacity": slider_line_stroke_opacity.val()
        });
    });

    var slider_line_stroke_dash = $(".line_stroke_dash").jRange({
        from: 0.0,
        to: 30.0,
        step: 5.0,
        theme: 'theme-blue',
        scale: [0.0, 5.0, 10.0, 15.0, 20.0, 25.0, 30.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_line.attr({
            "stroke-dasharray": slider_line_stroke_dash.val() + "," + slider_line_stroke_dash.val()
        });
    });

    /*************************************************************************************************/

    var svg_polygon = Snap(".polygon");
    var $svg_polygon = $(".polygon");

    svg_polygon.paper.polygon([4, $svg_polygon.height() / 2, 2 * $svg_polygon.width() / 5, 4, $svg_polygon.width() / 2, $svg_polygon.height() - 10]).attr({
        fill: "#64a8f9",
        stroke: "#ffff00",
        strokeWidth: 2,
        "stroke-opacity": 1,
        "fill-opacity": 0.3,
        "stroke-linecap": "round"
    });

    var setting_polygon = svg_polygon.paper.polygon([$svg_polygon.width() / 2, 4, $svg_polygon.width(), $svg_polygon.height() / 2, $svg_polygon.width() / 2 + 10, $svg_polygon.height() - 4]).attr({
        fill: "#64a8f9",
        stroke: "#ffff00",
        strokeWidth: 2,
        "stroke-opacity": 1,
        "fill-opacity": 0.3,
        "stroke-linecap": "round"
    });

    var slider_polygon_stroke_width = $(".polygon_stroke_width").jRange({
        from: 0.0,
        to: 12.0,
        step: 0.5,
        theme: 'theme-blue',
        scale: [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_polygon.attr({
            strokeWidth: slider_polygon_stroke_width.val()
        });
    });

    var slider_polygon_stroke_opacity = $(".polygon_stroke_opacity").jRange({
        from: 0.1,
        to: 1.0,
        step: 0.1,
        theme: 'theme-blue',
        scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_polygon.attr({
            "stroke-opacity": slider_polygon_stroke_opacity.val()
        });
    });

    var slider_polygon_stroke_dash = $(".polygon_stroke_dash").jRange({
        from: 0.0,
        to: 30.0,
        theme: 'theme-blue',
        step: 5.0,
        scale: [0.0, 5.0, 10.0, 15.0, 20.0, 25.0, 30.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_polygon.attr({
            "stroke-dasharray": slider_polygon_stroke_dash.val() + "," + slider_polygon_stroke_dash.val()
        });
    });

    var slider_polygon_fill_opacity = $(".polygon_fill_opacity").jRange({
        from: 0.1,
        to: 1.0,
        step: 0.1,
        theme: 'theme-blue',
        scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        format: '%s',
        width: $right_slider_wrap.width() - 30 - 20,
        showLabels: false,
        showScale: false,
        snap: false
    }).change(function () {
        setting_polygon.attr({
            "fill-opacity": slider_polygon_fill_opacity.val()
        });
    });

    /******************************************************** 渲染颜色选择器 ********************************************************/

    $("#color_picker").spectrum({
        color: "#000000",
        showPalette: true,
        showInitial: true,
        replacerClassName: 'awesome',
        chooseText: "choose",
        cancelText: "cancel",
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ],
        hide: function (color) {
            currentDrawColor = color.toHexString();
            console.log("hide");
        },
        move: function (color) {
            currentDrawColor = color.toHexString();
            console.log("move");
        }
    });

    /******************************************************** 视图控件获取 ********************************************************/

    //TODO
    var $colorPickerToggle_btn = $(".color_picker_toggle_btn");
    var $solidLine_btn = $(".solid_line_btn");
    var $dashLine_btn = $(".dash_line_btn");
    var $triangle_btn = $(".triangle_btn");
    var $square_btn = $(".square_btn");
    var $circle_btn = $(".circle_btn");
    var $ellipse_btn = $(".ellipse_btn");
    var $pen_btn = $(".pen_btn");
    var $polygon_btn = $(".polygon_btn");
    var $eraser_btn = $(".eraser_btn");
    var $select_btn = $(".select_btn");
    var $cleanUp_btn = $(".clean_up_btn");
    var $settings_btn = $(".settings_btn");

    // 面板SVG节点
    var svg = Snap(".graffiti_panel");
    var $graffitiPanel = $(".graffiti_panel");

    // 橡皮擦
    var $eraser = $(".eraser");

    /******************************************************** 视图控件的状态设置 ********************************************************/

    $settings_panel.hide();
    $eraser.hide();

    /******************************************************** 工具enum ********************************************************/

    var TOOL = {
        SOLID_LINE: 0,
        DASH_LINE: 1,
        SQUARE: 2,
        CIRCLE: 3,
        ECLIPSE: 4,
        PEN: 5,
        POLYGON: 6,
        ERASER: 7,
        SELECT: 8,
        TRIANGLE: 9
    };

    /******************************************************** 各个工具入口函数 ********************************************************/

    function switchingTool(tool) {
        switch (currentTool) {
            case TOOL.SOLID_LINE:
                $solidLine_btn.removeClass("color_btn_selected");
                break;
            case TOOL.DASH_LINE:
                $dashLine_btn.removeClass("color_btn_selected");
                break;
            case TOOL.SQUARE:
                $square_btn.removeClass("color_btn_selected");
                break;
            case TOOL.CIRCLE:
                $circle_btn.removeClass("color_btn_selected");
                break;
            case TOOL.ECLIPSE:
                $ellipse_btn.removeClass("color_btn_selected");
                break;
            case TOOL.PEN:
                $pen_btn.removeClass("color_btn_selected");
                break;
            case TOOL.POLYGON:
                $polygon_btn.removeClass("color_btn_selected");
                break;
            case TOOL.ERASER:
                $eraser_btn.removeClass("color_btn_selected");
                $eraser.hide();
                break;
            case TOOL.SELECT:
                $select_btn.removeClass("color_btn_selected");
                canSelected = !canSelected;
                break;
            case TOOL.TRIANGLE:
                $triangle_btn.removeClass("color_btn_selected");
                break;
        }
        switch (tool) {
            case TOOL.SOLID_LINE:
                $solidLine_btn.addClass("color_btn_selected");
                currentBusiness = drawLineBusiness;
                drawLineBusiness.isDashed = false;
                break;
            case TOOL.DASH_LINE:
                $dashLine_btn.addClass("color_btn_selected");
                currentBusiness = drawLineBusiness;
                drawLineBusiness.isDashed = true;
                break;
            case TOOL.SQUARE:
                $square_btn.addClass("color_btn_selected");
                currentBusiness = drawRectangleBusiness;
                break;
            case TOOL.CIRCLE:
                $circle_btn.addClass("color_btn_selected");
                currentBusiness = drawCircleBusiness;
                break;
            case TOOL.ECLIPSE:
                $ellipse_btn.addClass("color_btn_selected");
                currentBusiness = drawEllipseBusiness;
                break;
            case TOOL.PEN:
                $pen_btn.addClass("color_btn_selected");
                currentBusiness = graffitiBusiness;
                break;
            case TOOL.POLYGON:
                $polygon_btn.addClass("color_btn_selected");
                currentBusiness = drawPolygonBusiness;
                break;
            case TOOL.ERASER:
                $eraser_btn.addClass("color_btn_selected");
                currentBusiness = eraserBusiness;
                $eraser.show();
                break;
            case TOOL.SELECT:
                $select_btn.addClass("color_btn_selected");
                canSelected = !canSelected;
                currentBusiness = null;
                break;
            case TOOL.TRIANGLE:
                $triangle_btn.addClass("color_btn_selected");
                currentBusiness = drawTriangleBusiness;
                break;
        }
        currentTool = tool;
    }

    /******************************************************** 事件设置 ********************************************************/

    $(".colorPicker").css({
        "top": "-" + $(".colorPicker").height() + "px"
    });
    $colorPickerToggle_btn.on('click', function () {
        $("#color_picker").spectrum("toggle");
        return false;
    });

    $settings_btn.on("click", function () {
        $settings_panel.slideToggle(1000);
    });

    $solidLine_btn.on("click", function () {
        switchingTool(TOOL.SOLID_LINE);
    });
    $dashLine_btn.on("click", function () {
        switchingTool(TOOL.DASH_LINE);
    });
    $triangle_btn.on("click", function () {
        switchingTool(TOOL.TRIANGLE);
    });
    $square_btn.on("click", function () {
        switchingTool(TOOL.SQUARE);
    });
    $circle_btn.on("click", function () {
        switchingTool(TOOL.CIRCLE);
    });
    $ellipse_btn.on("click", function () {
        switchingTool(TOOL.ECLIPSE);
    });
    $pen_btn.on("click", function () {
        switchingTool(TOOL.PEN);
    });
    $polygon_btn.on("click", function () {
        switchingTool(TOOL.POLYGON);
    });
    $eraser_btn.on("click", function () {
        switchingTool(TOOL.ERASER);
    });
    $select_btn.on("click", function () {
        switchingTool(TOOL.SELECT);
    });

    $cleanUp_btn.on("click", function () {
        cleanUpBusiness.doCleanUp();
    });

    /********************************************* 绘制实线 or 虚线业务 颗粒 *********************************************/

    var drawLineBusiness = {
        downX: null,
        downY: null,
        lineCanBeDrag: false,
        line: null,
        isDashed: false,
        onMouseDown: function (downEvent) {
            drawLineBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawLineBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;
            if (drawLineBusiness.line) {
                //                drawLineBusiness.line.attr({"x2": moveX, "y2": moveY, "visibility": ""});
                drawLineBusiness.line.attr({
                    "x2": moveX,
                    "y2": moveY
                });
            } else {
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
        },
        onMouseUp: function (upEvent) {
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
    };

    /********************************************* 绘制直角三角形业务 *********************************************/

    var drawTriangleBusiness = {
        downX: null,
        downY: null,
        currentTriangle: null,
        lastTriangle: null,
        onMouseDown: function (downEvent) {
            drawTriangleBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawTriangleBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            if (drawTriangleBusiness.lastTriangle) {
                drawTriangleBusiness.lastTriangle.remove();
            }

            // 计算直角顶点
            var rightAngleVertex = {};
            if (drawTriangleBusiness.downY > moveY) {
                rightAngleVertex.x = drawTriangleBusiness.downX;
                rightAngleVertex.y = moveY;
            } else if (drawTriangleBusiness.downY < moveY) {
                rightAngleVertex.x = moveX;
                rightAngleVertex.y = drawTriangleBusiness.downY;
            } else if (drawTriangleBusiness.downY == moveY || drawTriangleBusiness.downX > moveX) {
                return;
            }

            // 绘制直角三角形
            drawTriangleBusiness.currentTriangle = svg.paper.polygon([drawTriangleBusiness.downX, drawTriangleBusiness.downY, moveX, moveY, rightAngleVertex.x, rightAngleVertex.y]).attr({
                fill: currentDrawColor,
                stroke: currentDrawColor,
                strokeWidth: 2,
                "stroke-opacity": 1,
                "fill-opacity": 0.3
            }).drag();

            drawTriangleBusiness.lastTriangle = drawTriangleBusiness.currentTriangle;
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;

            drawTriangleBusiness.currentTriangle = null;
            drawTriangleBusiness.lastTriangle = null;
        }
    };

    /********************************************* 绘制矩形业务 颗粒 *********************************************/

    var drawRectangleBusiness = {
        downX: null,
        downY: null,
        lineCanBeDrag: false,
        lastRect: null,
        currentRect: null,
        isDashed: false,
        onMouseDown: function (downEvent) {
            drawRectangleBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawRectangleBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            // 销毁上一次的矩形
            if (drawRectangleBusiness.lastRect) {
                drawRectangleBusiness.lastRect.remove();
            }

            // 计算折点
            var points = [drawRectangleBusiness.downX, drawRectangleBusiness.downY, moveX, drawRectangleBusiness.downY, moveX, moveY, drawRectangleBusiness.downX, moveY, drawRectangleBusiness.downX, drawRectangleBusiness.downY];

            drawRectangleBusiness.currentRect = svg.paper.polygon(points).attr({
                fill: currentDrawColor,
                stroke: currentDrawColor,
                strokeWidth: 2,
                "stroke-opacity": 1,
                "fill-opacity": 0.3
            });

            drawRectangleBusiness.lastRect = drawRectangleBusiness.currentRect;
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;
            drawRectangleBusiness.lastRect = null;
        }
    };

    /********************************************* 绘制圆业务 颗粒 *********************************************/

    var drawCircleBusiness = {
        downX: null,
        downY: null,
        currentCircle: null,
        lastCircle: null,
        onMouseDown: function (downEvent) {
            drawCircleBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawCircleBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            if (drawCircleBusiness.lastCircle) {
                drawCircleBusiness.lastCircle.remove();
            }

            // 计算圆心
            var midPoint = Utils.calMidpoint(drawCircleBusiness.downX, drawCircleBusiness.downY, moveX, moveY);
            // 计算半径r
            var r = Utils.calDistance(drawCircleBusiness.downX, drawCircleBusiness.downY, moveX, moveY) / 2;

            // 绘制圆
            drawCircleBusiness.currentCircle = svg.paper.circle(midPoint.x, midPoint.y, r).attr({
                //fill: currentDrawColor,
                fill: 'none',
                stroke: currentDrawColor,
                strokeWidth: 2,
                "stroke-opacity": 1,
                "fill-opacity": 0.3
            });

            drawCircleBusiness.lastCircle = drawCircleBusiness.currentCircle;
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;

            drawCircleBusiness.lastCircle = null;
            drawCircleBusiness.currentCircle = null;
        }
    };

    /********************************************* 绘制椭圆业务 颗粒 *********************************************/

    var drawEllipseBusiness = {
        downX: null,
        downY: null,
        currentEllipse: null,
        lastEllipse: null,
        onMouseDown: function (downEvent) {
            drawEllipseBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawEllipseBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            if (drawEllipseBusiness.lastEllipse) {
                drawEllipseBusiness.lastEllipse.remove();
            }

            // 计算椭圆的中心
            var midPoint = Utils.calMidpoint(drawEllipseBusiness.downX, drawEllipseBusiness.downY, moveX, moveY);
            // 计算水平方向的半径hr
            var hr = Utils.calDistance(drawEllipseBusiness.downX, drawEllipseBusiness.downY, moveX, drawEllipseBusiness.downY) / 2;
            // 计算垂直方向半径vr
            var vr = Utils.calDistance(drawEllipseBusiness.downX, drawEllipseBusiness.downY, drawEllipseBusiness.downX, moveY) / 2;

            // 绘制椭圆
            drawEllipseBusiness.currentEllipse = svg.paper.ellipse(midPoint.x, midPoint.y, hr, vr).attr({
                //fill: currentDrawColor,
                fill: 'none',
                stroke: currentDrawColor,
                strokeWidth: 2,
                "stroke-opacity": 1,
                "fill-opacity": 0.3
            });
            drawEllipseBusiness.lastEllipse = drawEllipseBusiness.currentEllipse;
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;

            drawEllipseBusiness.currentEllipse = null;
            drawEllipseBusiness.lastEllipse = null;
        }
    };

    /********************************************* 绘制任意多边形业务 *********************************************/

    var drawPolygonBusiness = {
        downX: null,
        downY: null,
        startPoint: null,
        polygon: null, // 记录当前已经绘制的多边形
        line: null, // 记录当前线段信息
        connPoint: null, // 记录当前的连接点
        segments: [], // 记录临时线段信息
        vertex: [], // 记录顶点信息
        canBeDrag: false,
        resetState: function () {
            drawPolygonBusiness.downX = null;
            drawPolygonBusiness.downY = null;
            drawPolygonBusiness.startPoint = null;
            drawPolygonBusiness.polygon = null;
            drawPolygonBusiness.line = null;
            drawPolygonBusiness.connPoint = null;
            drawPolygonBusiness.segments = [];
            drawPolygonBusiness.vertex = [];
            drawPolygonBusiness.canBeDrag = false;
        },
        onMouseDown: function (downEvent) {
            drawPolygonBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            drawPolygonBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;

            if (!drawPolygonBusiness.startPoint) {
                drawPolygonBusiness.startPoint = {
                    x: drawPolygonBusiness.downX,
                    y: drawPolygonBusiness.downY
                }
            }
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            var startX = drawPolygonBusiness.downX,
                startY = drawPolygonBusiness.downY;
            if (drawPolygonBusiness.connPoint) {
                startX = drawPolygonBusiness.connPoint.x;
                startY = drawPolygonBusiness.connPoint.y;
            }

            if (drawPolygonBusiness.line) {
                drawPolygonBusiness.line.attr({
                    x2: moveX,
                    y2: moveY
                });
            } else {
                drawPolygonBusiness.line = svg.paper.line(startX, startY, moveX, moveY).attr({
                    stroke: currentDrawColor,
                    strokeWidth: 2,
                    "stroke-opacity": 1,
                    "stroke-linecap": "round"
                });
                drawPolygonBusiness.segments.push(drawPolygonBusiness.line);
            }
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;

            drawPolygonBusiness.vertex.push(upX);
            drawPolygonBusiness.vertex.push(upY);

            if (drawPolygonBusiness.startPoint) {

                console.log(drawPolygonBusiness.startPoint.x);
                console.log(drawPolygonBusiness.startPoint.y);

                if (Utils.calDistance(upX, upY, drawPolygonBusiness.startPoint.x, drawPolygonBusiness.startPoint.y) < 20) {
                    drawPolygonBusiness.line.attr({
                        x2: drawPolygonBusiness.startPoint.x,
                        y2: drawPolygonBusiness.startPoint.y
                    });

                    // 生成一个多边形
                    svg.paper.polygon(drawPolygonBusiness.vertex).attr({
                        fill: currentDrawColor,
                        stroke: currentDrawColor,
                        strokeWidth: 2,
                        "stroke-opacity": 1,
                        "fill-opacity": 0.3
                    }).drag();

                    // 移除绘制过程的临时线段
                    drawPolygonBusiness.segments.forEach(function (segment) {
                        segment.remove();
                    });

                    drawPolygonBusiness.resetState();

                    return;
                }
            }

            drawPolygonBusiness.connPoint = {
                x: upX,
                y: upY
            };

            drawPolygonBusiness.line = null;
        }
    };

    /********************************************* 涂鸦业务 颗粒 *********************************************/

    var graffitiBusiness = {
        downX: null,
        downY: null,
        graffitiCanBeDrag: false,
        points: [],
        onMouseDown: function (downEvent) {
            graffitiBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            graffitiBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
            lastPX = graffitiBusiness.downX;
            lastPY = graffitiBusiness.downY;

            graffitiBusiness.points.push({
                x: lastPX,
                y: lastPY
            });
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            //            if (Utils.calDistance(lastPX, lastPY, moveX, moveY) > 3) {
            graffitiBusiness.points.push({
                x: (lastPX + moveX) / 2,
                y: (lastPY + moveY) / 2
            });
            //            }

            if (lastPath) {
                lastPath.remove();
            }

            // 计算控制点
            ctrlPX = (lastPX + moveX) / 2;
            ctrlPY = (lastPY + moveY) / 2;

            // 记录笔迹数据
            pathStr += "M" + lastPX + " " + lastPY + "Q" + ctrlPX + " " + ctrlPY + " " + moveX + " " + moveY;
            // 绘制笔迹
            currentPath = svg.paper.path(pathStr).attr({
                stroke: currentDrawColor,
                strokeWidth: 3,
                "stroke-opacity": 0.2,
                "stroke-linecap": "round" // 处理锯齿
            });

            lastPath = currentPath;

            lastPX = moveX;
            lastPY = moveY;
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;

            graffitiBusiness.points.push({
                x: upX,
                y: upY
            });

            currentPath.remove();

            console.log(graffitiBusiness.points[0]);
            console.log(graffitiBusiness.points[1]);

            for (var i = 1; i < graffitiBusiness.points.length; i++) {
                var ctrlP = Utils.calBezierCtrlPoint(graffitiBusiness.points, i - 1);

                // 记录笔迹数据
                pathStr = "M" + graffitiBusiness.points[i - 1].x + " " + graffitiBusiness.points[i - 1].y + "C" + ctrlP.pA.x + " " + ctrlP.pA.y + " " + ctrlP.pB.x + " " + ctrlP.pB.y + " " + graffitiBusiness.points[i].x + " " + graffitiBusiness.points[i].y;
                console.log(pathStr);
                currentPath = svg.paper.path(pathStr).attr({
                    stroke: currentDrawColor,
                    strokeWidth: 3,
                    fill: "none",
                    "stroke-opacity": 1,
                    "stroke-linecap": "round"
                });
            }

            graffitiBusiness.points.length = 0;

            if (graffitiBusiness.downY == upX && graffitiBusiness.downY == upY) {
                svg.paper.circle(graffitiBusiness.downY, graffitiBusiness.downY, 3.5).attr({
                    fill: "#0f0",
                    "stroke-opacity": 1
                });
                return;
            }

            // 笔迹的移动
            if (graffitiBusiness.graffitiCanBeDrag) {
                currentPath.mousedown(function (evt) {
                    Utils.stopPropagation(Utils.getEvent(evt));
                });
                currentPath.drag();
            }

            currentPath.attr({
                "stroke-opacity": 0.5
            });

            lastPath = null;
            pathStr = null;
        }
    };

    /********************************************* 橡皮擦业务 颗粒 *********************************************/

    var isPickupEraser = false;
    var eraserBusiness = {
        downX: null,
        downY: null,
        onMouseDown: function (downEvent) {
            graffitiBusiness.downX = downEvent.clientX - $graffitiPanel.offset().left;
            graffitiBusiness.downY = downEvent.clientY - $graffitiPanel.offset().top;
            lastPX = graffitiBusiness.downX;
            lastPY = graffitiBusiness.downY;
            isPickupEraser = true;
            console.log(isPickupEraser);
        },
        onMouseMove: function (moveEvent) {
            var moveX = moveEvent.clientX - $graffitiPanel.offset().left;
            var moveY = moveEvent.clientY - $graffitiPanel.offset().top;

            console.log(isPickupEraser);

            if (isPickupEraser) {
                $eraser.css({
                    "left": moveX - $eraser.height() / 2 + "px",
                    "top": moveY - $eraser.width() / 2 + "px"
                });

                if (lastPath) {
                    lastPath.remove();
                }

                // 计算控制点
                ctrlPX = (lastPX + moveX) / 2;
                ctrlPY = (lastPY + moveY) / 2;

                // 记录笔迹数据
                pathStr += "M" + lastPX + " " + lastPY + "Q" + ctrlPX + " " + ctrlPY + " " + moveX + " " + moveY;
                // 绘制笔迹
                currentPath = svg.paper.path(pathStr).attr({
                    stroke: "#fff",
                    strokeWidth: 10,
                    "stroke-opacity": 1,
                    "stroke-linecap": "round" // 处理锯齿
                });

                lastPath = currentPath;

                lastPX = moveX;
                lastPY = moveY;
            }
        },
        onMouseUp: function (upEvent) {
            var upX = upEvent.clientX - $graffitiPanel.offset().left;
            var upY = upEvent.clientY - $graffitiPanel.offset().top;
            isPickupEraser = false;
            console.log(isPickupEraser);
        }
    };

    /********************************************* 清空业务 颗粒 *********************************************/

    var cleanUpBusiness = {
        doCleanUp: function () {
            $graffitiPanel.empty();
        }
    };

    /******************************************************** 逻辑控制标志位 ********************************************************/

    var currentTool = TOOL.PEN;

    var currentDrawColor = '#111111';

    var canSelected = false;

    var currentBusiness = graffitiBusiness;

    var isMouseDown = false;

    /******************************************************** 画板事件处理 ********************************************************/

    var currentPX, currentPY;
    var ctrlPX, ctrlPY;
    var lastPX, lastPY;
    var lastPath;
    var currentPath;
    var pathStr;
    $graffitiPanel.mousedown(function (downEvt) {
        var downEvent = Utils.getEvent(downEvt);
        Utils.stopPropagation(downEvent);
        downEvent.preventDefault();

        isMouseDown = true;

        currentBusiness.onMouseDown(downEvt);

        $graffitiPanel.mousemove(function (moveEvt) {
            var moveEvent = Utils.getEvent(moveEvt);
            moveEvent.preventDefault();
            if (!isMouseDown) {
                return;
            }
            currentBusiness.onMouseMove(moveEvent);
        });

        $graffitiPanel.mouseup(function (upEvt) {
            console.log("up up up up up up");
            var upEvent = Utils.getEvent(upEvt);
            upEvent.preventDefault();

            isMouseDown = false;
            currentBusiness.onMouseUp(upEvent);

            // 如果不解绑会执行两次up why????????????????????????
            $graffitiPanel.off("mousemove touchmove");
            $graffitiPanel.off("mouseup touchend");
        });
    });

    /******************************************************** 画板事件处理 ********************************************************/


})();