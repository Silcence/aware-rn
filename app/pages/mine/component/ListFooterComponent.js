/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 列表 FOOTER
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import {getCommonPixel,getFontPixel} from '../../../utils/PixelUtil';
import * as FontAndColor from '../../../constant/FontAndColor';

export default class ListFooterComponent extends React.PureComponent{
    render(){
        const {info} = this.props;
        return(
            <View style={styles.listFootWrap}>
                <View style={styles.borderWrap} />
                <Text style={styles.listFootText}>{info}</Text>
                <View style={styles.borderWrap} />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    listFootWrap:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:getCommonPixel(120),
        paddingHorizontal:getCommonPixel(152),
    },
    borderWrap:{
        flex:1,
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderColor:FontAndColor.FONT_COLOR3,
    },

    listFootText:{
        paddingHorizontal:getCommonPixel(10),
        fontSize:getFontPixel(28),
        color:FontAndColor.FONT_COLOR3,
        marginHorizontal:getCommonPixel(8)
    },
});