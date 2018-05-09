/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 关注
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {getCommonPixel,getFontPixel} from '../../utils/PixelUtil';
import TestScene from './TestScene';
import ProjectTabBar from '../common/ProjectTabBar';

export default class LikeScene extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={()=><ProjectTabBar/>}
                >
                    <TestScene tabLabel='文章'/>
                    <TestScene tabLabel='介绍'/>
                    <TestScene tabLabel='同类'/>
                    <TestScene tabLabel='周报'/>
                    <TestScene tabLabel='持仓'/>
                    <TestScene tabLabel='公告'/>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:getCommonPixel(40),
        backgroundColor:'white'
    }
});