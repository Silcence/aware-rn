/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 文章列表
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
}from 'react-native';
import BaseComponent from '../common/BaseComponent';
import * as FontAndColor from "../../constant/FontAndColor";
import {getCommonPixel, getFontPixel, getTopDistance} from "../../utils/PixelUtil";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ArticleTabBar from './component/ArticleTabBar';

import TestScene from '../main/TestScene';

const back = require('../../images/back.png');


export default class FollowingListScene extends BaseComponent{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.NavitatonWrap}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.titleText}>{'我的文章'}</Text>
                        <TouchableOpacity
                            style={styles.backWrap}
                            activeOpacity={0.7}
                            onPress={()=>{this.backPage()}}
                        >
                            <Image style={styles.backImg} source={back}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollableTabView
                    renderTabBar={()=><ArticleTabBar backgroundColor={FontAndColor.WHITE}/>}
                >
                    <TestScene tabLabel='全部'/>
                    <TestScene tabLabel='已发布'/>
                    <TestScene tabLabel='审核中'/>
                    <TestScene tabLabel='已拒绝'/>
                </ScrollableTabView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:FontAndColor.BG_COLOR,
    },
    NavitatonWrap:{
        backgroundColor:FontAndColor.WHITE,
        paddingTop: getTopDistance(40),
    },
    titleWrap:{
        height: getCommonPixel(88),
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2
    },
    backWrap:{
        position:'absolute',
        left:0,
        top:0,
        bottom:0,
        paddingRight:getCommonPixel(32),
        justifyContent:'center',
        paddingLeft:getCommonPixel(32)
    },
    backImg:{
        height:getCommonPixel(44),
        width:getCommonPixel(44)
    },
    flexWrap:{
        flex:1,
    }
});