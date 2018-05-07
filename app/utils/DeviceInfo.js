/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 获取设备信息
 * Created by CoderR on 2018/4/26.
 */
'use strict';


import {
    Platform,
    Dimensions
} from 'react-native';


//是否是IOS设备
const isIOS = Platform.OS === 'ios';

//设备宽度
const deviceWidth = Dimensions.get('window').width;

//设备高度
const deviceHeight = Dimensions.get('window').height;

//Android系统版本
const androidVersion = Platform.VERSION;


module.exports = {
    isIOS,
    deviceWidth,
    deviceHeight,
    androidVersion
};