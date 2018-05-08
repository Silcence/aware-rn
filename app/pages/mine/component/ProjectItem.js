/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 项目ITEM
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
}
from 'react-native';
import {getCommonPixel,getFontPixel} from "../../../utils/PixelUtil";
import * as FontAndColor from "../../../constant/FontAndColor";

const upImg = require('../../../images/up.png');
const downImg = require('../../../images/down.png');
const sameImg = require('../../../images/same.png');

export default class ProjectItem extends React.Component{

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
                <View style={styles.wrap}>

                    <View style={styles.leftWrap}>
                        <View style={styles.leftTitle}>
                            <Image resizeMode={'stretch'} style={styles.logoWrap} source={{uri:item.logo}}/>
                            <Text style={styles.nameWrap}>{item.name}</Text>
                        </View>
                        <Text style={styles.introWrap}>{item.intro}</Text>
                    </View>

                    <View style={[styles.rightWrap,{backgroundColor:changeColor}]}>
                        <Text style={styles.changeText}>{Math.abs(change) + '%'}</Text>
                        <Image style={styles.changeImg} source={changeImg}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: FontAndColor.WHITE,
        paddingHorizontal:getCommonPixel(32)
    },
    wrap:{
        flex:1,
        borderBottomWidth: getCommonPixel(2),
        borderBottomColor: FontAndColor.BORDER_COLOR,
        flexDirection:'row',
        alignItems:'center',
    },
    leftWrap:{
        flex:1,
        justifyContent:'center',
        marginVertical:getCommonPixel(32),
    },
    leftTitle:{
        flexDirection:'row',
        alignItems:'center',
    },
    logoWrap:{
        width: getCommonPixel(160),
        height: getCommonPixel(100)
    },
    nameWrap:{
        fontSize: getFontPixel(36),
        color: FontAndColor.FONT_COLOR2,
        marginLeft: getCommonPixel(18)
    },
    introWrap:{
        fontSize: getFontPixel(28),
        color: FontAndColor.FONT_COLOR1,
        marginTop: getCommonPixel(20)
    },
    rightWrap:{
        height: getCommonPixel(36),
        width: getCommonPixel(120),
        borderRadius:getCommonPixel(8),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    changeText:{
        color:FontAndColor.WHITE,
        fontSize:getFontPixel(26),
    },
    changeImg:{
        width: getCommonPixel(20),
        height: getCommonPixel(20)
    }

});