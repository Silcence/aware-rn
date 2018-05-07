/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * UI标注转换到设备尺寸
 * Created by CoderR on 2018/4/26.
 */
'use strict';

import {isIOS,deviceWidth} from './DeviceInfo'

const uiWidthPx = 750;

//UI标注按比例转换到设备尺寸
function getCommonPixel(uiElementPx) {
    return Math.round(uiElementPx * deviceWidth / uiWidthPx);
}

//字体标注按比例转换到设备尺寸
function getFontPixel(uiFontPx) {
    return Math.round(uiFontPx * deviceWidth / uiWidthPx);
}

//沉浸式布局时不同平台的距离上边框的处理
function getTopDistance(topPx) {
    topPx = isIOS ? topPx : (topPx + 10);
    return Math.round(topPx * deviceWidth / uiWidthPx);
}

module.exports = {
    getCommonPixel,
    getFontPixel,
    getTopDistance
};

