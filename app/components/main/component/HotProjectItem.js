/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 热门项目ITEM
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import {getCommonPixel,getFontPixel} from '../../../utils/PixelUtil';
import * as FontAndColor from '../../../constant/FontAndColor';

const upImg = require('../../../images/up.png');
const downImg = require('../../../images/down.png');
const sameImg = require('../../../images/same.png');

export default class HotProjectItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        let item = this.props.item;
        let change = item.change;
        let changeImg = sameImg;
        let changeColor = FontAndColor.SAME_GREY;
        if(change > 0){
            changeImg = upImg;
            changeColor = FontAndColor.UP_GREEN;
        }else if(change < 0){
            changeImg = downImg;
            changeColor = FontAndColor.DOWN_RED;
        }

        return(
            <View style={styles.container}>
                <Image resizeMode={'stretch'} style={styles.logoWrap} source={{uri:item.logo}} />
                <View style={styles.nameWrap}>
                    <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                    <View style={[styles.changeUpWrap,{backgroundColor:changeColor}]}>
                        <Text style={styles.changeText}>{Math.abs(change) + '%'}</Text>
                        <Image style={styles.changeImg} source={changeImg}/>
                    </View>
                </View>
                <View style={styles.followerWrap}>
                    <Text style={styles.followerText}>{item.followers + '人关注'}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width: getCommonPixel(216),
        height: getCommonPixel(208),
        backgroundColor: FontAndColor.WHITE,
        overflow:'hidden',
        borderRadius:getCommonPixel(8),
        borderColor:'rgba(0,0,0,0.2)',
        marginBottom:getCommonPixel(20),
        elevation:4
    },
    logoWrap:{
        width: getCommonPixel(216),
        height: getCommonPixel(128)
    },
    nameWrap:{
        marginHorizontal: getCommonPixel(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:getCommonPixel(8)
    },
    nameText:{
        fontSize: getFontPixel(26),
        color: FontAndColor.FONT_COLOR5,
        width:getCommonPixel(94)
    },
    changeUpWrap:{
        width: getCommonPixel(90),
        height: getCommonPixel(26),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: FontAndColor.UP_GREEN,
        borderRadius: getCommonPixel(4)
    },
    changeText:{
        fontSize: getFontPixel(22),
        color: FontAndColor.WHITE
    },
    changeImg:{
        width: getCommonPixel(20),
        height: getCommonPixel(20)
    },
    followerWrap:{
        marginHorizontal: getCommonPixel(16),
        marginTop: getCommonPixel(4)
    },
    followerText:{
        fontSize: getFontPixel(18),
        color: FontAndColor.FONT_COLOR1
    }
});