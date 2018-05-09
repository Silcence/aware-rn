/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 热门文章ITEM
 * Created by CoderR.
 */

'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
}from 'react-native';
import {getCommonPixel,getFontPixel} from "../../../utils/PixelUtil";
import * as FontAndColor from "../../../constant/FontAndColor";

const repost = require('../../../images/repost.png');
const find = require('../../../images/find.png');
const heart = require('../../../images/heart.png');

export default class HotArticleItem extends React.Component{
    render(){
        let item = this.props.item;
        let title = '【' + item.type +'】'+ item.title;
        let read = item.reads > 999 ? '999+' : item.reads+'';
        let like = item.likes > 999 ? '999+' : item.likes+'';

        return(
            <View style={styles.container}>
                <Text style={styles.titleWrap}>{title}</Text>
                <View style={styles.infoWrap}>
                    <View style={styles.projectWrap}>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.projectText}>{item.project}</Text>
                    </View>
                    <View style={styles.repostWrap}>
                        <Image style={styles.repostImg} source={repost}/>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.repostText}>{item.author}</Text>
                    </View>
                    <View style={styles.readWrap}>
                        <Image style={styles.readImg} source={find}/>
                        <Text style={styles.repostText}>{read}</Text>
                    </View>
                    <View style={styles.readWrap}>
                        <Image style={styles.readImg} source={heart}/>
                        <Text style={styles.repostText}>{like}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: FontAndColor.WHITE,
        borderTopWidth: getCommonPixel(2),
        borderTopColor: FontAndColor.BORDER_COLOR,
        height:getCommonPixel(166),
        justifyContent:'center'
    },
    titleWrap:{
        color: FontAndColor.FONT_COLOR6,
        fontSize: getFontPixel(32)
    },
    infoWrap:{
        marginTop: getCommonPixel(29),
        flexDirection: 'row',
        alignItems:'center',
    },
    projectWrap:{
        flexDirection:'row',
        alignItems:'center',
        width:getCommonPixel(135),
    },
    projectText:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: FontAndColor.DARK_YELLOW,
        borderRadius: getCommonPixel(8),
        fontSize: getFontPixel(18),
        color: FontAndColor.FONT_COLOR7,
        paddingHorizontal: getCommonPixel(8),
        textAlignVertical:'center',
        paddingVertical:0,
        height: getCommonPixel(24),
    },
    repostWrap:{
        flexDirection:'row',
        alignItems:'center',
        width:getCommonPixel(270)
    },
    repostImg:{
        height: getCommonPixel(30),
        width: getCommonPixel(30),
        marginRight:getCommonPixel(2)
    },
    repostText:{
        color: FontAndColor.FONT_COLOR3,
        fontSize: getFontPixel(20),
    },
    readWrap:{
        flexDirection:'row',
        alignItems:'center',
        width:getCommonPixel(121)
    },
    readImg:{
        height: getCommonPixel(30),
        width: getCommonPixel(30),
        marginRight:getCommonPixel(8)
    },

});
