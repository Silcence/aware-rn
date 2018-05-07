/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 搜索组件
 * Created by CoderR on 2018/4/27.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
}from 'react-native';

import * as FontAndColor from '../../constant/FontAndColor';
import {getCommonPixel,getFontPixel,getTopDistance} from '../../utils/PixelUtil';
import {deviceWidth} from '../../utils/DeviceInfo';
import I18n from '../../language/i18n';

const searchImg = require('../../images/search.png');

export default class SearchView extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.wrapContainer}>
                <TouchableWithoutFeedback onPress={()=>{}}>
                    <View style={styles.touchContainer}>
                        <Image style={styles.searchImg} source={searchImg} />
                        <Text style={styles.hintText}>{I18n.t('main.search_holder')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    wrapContainer:{
        paddingTop:getTopDistance(40),
        width:deviceWidth,
        height:getCommonPixel(88)+getTopDistance(40),
        backgroundColor:FontAndColor.WHITE,
        justifyContent:'center',
        alignItems:'center'
    },
    touchContainer:{
        width:getCommonPixel(542),
        height:getCommonPixel(60),
        borderRadius:getCommonPixel(30),
        backgroundColor:FontAndColor.LIGHT_WHITE,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    searchImg:{
        width:getCommonPixel(44),
        height:getCommonPixel(44),
        marginRight:getCommonPixel(15),
        resizeMode:'contain'
    },
    hintText:{
        color:FontAndColor.FONT_COLOR1,
        fontSize:getFontPixel(24)
    },
});