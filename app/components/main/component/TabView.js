/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 主页TAB标签
 * Created by CoderR on 2018/4/28.
 */

'use strict';

import React from 'react';
import {
    Image,
    StyleSheet
}from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import {getCommonPixel,getFontPixel} from '../../../utils/PixelUtil';
import * as FontAndColor from '../../../constant/FontAndColor';
import I18n from '../../../language/i18n';

import HomeScene from '../HomeScene';
import LikeScene from '../LikeScene';
import PostScene from '../PostScene';
import ProjectScene from '../ProjectScene';
import MineScene from '../MineScene';

const post = require('../../../images/add.png');
const home = require('../../../images/home.png');
const home_inactive = require('../../../images/home_inactive.png');
const like = require('../../../images/like.png');
const like_inactive = require('../../../images/like_inactive.png');
const mine = require('../../../images/mine.png');
const mine_inactive = require('../../../images/mine_inactive.png');
const project = require('../../../images/project.png');
const project_inactive = require('../../../images/project_inactive.png');

export default class TabView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentTab : 'MineScene'
        };
        this.tabNames = [
            [I18n.t('main.tab_home'), home, home_inactive, 'HomeScene', <HomeScene {...this.props}/>],
            [I18n.t('main.tab_like'), like, like_inactive, 'LikeScene', <LikeScene {...this.props}/>],
            ['', post, 'PostScene', <PostScene {...this.props}/>],
            [I18n.t('main.tab_project'), project, project_inactive, 'ProjectScene', <ProjectScene {...this.props}/>],
            [I18n.t('main.tab_mine'), mine, mine_inactive, 'MineScene', <MineScene {...this.props}/>],
        ];
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.barWrap}
                sceneStyle={styles.sceneStyle}
            >
                {
                    this.tabNames.map((item, i)=>{
                        if(i === 2){
                            return(
                                <TabNavigator.Item
                                    key={i}
                                    tabStyle={styles.untitleStyle}
                                    renderIcon={()=><Image style={styles.postImg} resizeMode={'contain'} source={item[1]}/>}
                                    renderSelectedIcon={()=><Image style={styles.postImg} resizeMode={'contain'} source={item[1]}/>}
                                    onPress={()=>{this.props.toLogin();}}
                                >
                                    {item[3]}
                                </TabNavigator.Item>
                            );
                        }else{
                            return(
                                <TabNavigator.Item
                                    key={i}
                                    tabStyle={styles.tabStyle}
                                    titleStyle={styles.titleStyle}
                                    title={item[0]}
                                    selected={this.state.currentTab === item[3]}
                                    selectedTitleStyle={styles.selectedTitle}
                                    renderIcon={()=><Image style={styles.commonImg} resizeMode={'contain'} source={item[2]}/>}
                                    renderSelectedIcon={()=><Image style={styles.commonImg} resizeMode={'contain'} source={item[1]}/>}
                                    onPress={()=>this.setState({ currentTab: item[3]})}
                                >
                                    {item[4]}
                                </TabNavigator.Item>
                            );
                        }
                    })
                }

            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    barWrap:{
        height:getCommonPixel(98),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:FontAndColor.WHITE,
    },
    sceneStyle:{
        paddingBottom:getCommonPixel(98),
    },
    tabStyle:{
        padding:getCommonPixel(3),
    },
    untitleStyle:{
        height:getCommonPixel(98),
        paddingBottom:getCommonPixel(7)
    },
    selectedTitle:{
        color:FontAndColor.LIGHT_YELLOW,
        fontSize:getFontPixel(18)
    },
    titleStyle:{
        color:FontAndColor.FONT_COLOR1,
        fontSize:getFontPixel(18)
    },
    commonImg:{
        width: getCommonPixel(54),
        height: getCommonPixel(54)
    },
    postImg:{
        width: getCommonPixel(83),
        height: getCommonPixel(83),

    }
});