/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 文章ITEM
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

export default class ArticleItem extends React.Component{

    shouldComponentUpdate(nextProps,nextState,nextContext){
        if(this.props.item.id === nextProps.id){
            return false;
        }

        return true;
    }

    render(){
        let item = this.props.item;
        let title = '【' + item.type +'】'+ item.title;
        let read = item.reads > 999 ? '999+' : item.reads+'';
        let like = item.likes > 999 ? '999+' : item.likes+'';

        return(
            <View style={styles.container}>
                <View style={styles.statusWrap}>
                    <Text style={styles.statusText}>{'审核中'}</Text>
                    <Text style={styles.statusText}>{'2018-04-16'}</Text>
                </View>
                <View style={styles.middleWrap}>
                    <Text style={styles.titleWrap}>{title}</Text>
                    <View style={styles.infoWrap}>
                        <View style={styles.projectWrap}>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                style={styles.projectText}>{item.project}</Text>
                        </View>
                        {
                            item.author &&
                            <View style={styles.repostWrap}>
                                <Image style={styles.repostImg} source={repost}/>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.repostText}>{item.author}</Text>
                            </View>
                        }
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
                <Text style={styles.refuseText}>{'拒绝理由：内容与板块不符'}</Text>
                <View style={styles.borderWrap} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: FontAndColor.WHITE,
    },
    statusWrap:{
        margin:getCommonPixel(32),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    statusText:{
        fontSize: getFontPixel(24),
        color:FontAndColor.FONT_COLOR1,
    },
    middleWrap:{
        backgroundColor:FontAndColor.SHADOW_WHITE,
        padding:getCommonPixel(32),
        marginBottom:getCommonPixel(32)
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
    refuseText:{
        marginHorizontal:getCommonPixel(32),
        marginBottom:getCommonPixel(24),
        color:FontAndColor.DARK_YELLOW,
        fontSize:getFontPixel(24)
    },

    borderWrap:{
        marginLeft:getCommonPixel(32),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR
    },

});