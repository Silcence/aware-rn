/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 项目、文章、点赞列表
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
}from 'react-native';

import BaseComponent from '../common/BaseComponent';
import {getCommonPixel, getFontPixel, getTopDistance} from "../../utils/PixelUtil";
import * as FontAndColor from "../../constant/FontAndColor";
import request from '../../utils/RequestUtil';
import * as urls from '../../constant/urls';
import ArticleItem from './component/ArticleItem';

const back = require('../../images/back.png');


export default class ListMineItemScene extends BaseComponent{

    constructor(props){
        super(props);

        this.state = {
            viewData: [],
            refreshing: false,
            firstEntry: true,
        };

        this.current_page = 1;
        this.last_page = 1;
    }

    didMountFinish = ()=>{
        request(urls.USER_ARTICLES,'get',{page:this.current_page})
            .then(
                (response)=>{

                    this.current_page = response.data.meta.current_page;
                    this.last_page = response.data.meta.last_page;
                    console.log('rrrrr1111',response);
                    this.setState({
                        viewData:response.data.list,
                        refreshing:false
                    });

                },
                (error)=>{

                }
        );
    };

    renderItem = ({item}) => {

        return(
            <ArticleItem item={item} />

        );
    };

    _keyExtractor = (item, index) => index;

    _renderRefresh = () =>{

        request(urls.USER_ARTICLES,'get',{page:1}).then(
            (response)=>{
                console.log('rrrrr1111',response);
            },
            (error)=>{

            }
        );

        this.setState({
            refreshing:true
        },()=>{
            let vd = [];
            for(let i = 0; i < 12; i++){
                vd.push({
                    name:i+'_BTC_' + this.flag
                })
            }

            this.setState({
                viewData:vd,
                refreshing:false
            });
        });
    };

    _onEndReached = ()=>{

        if(this.current_page === this.last_page){

        }else{

        }


    };

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

                <FlatList
                    data={this.state.viewData}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}

                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}

                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}

                    initialNumToRender={5}

                    ListFooterComponent
                />
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
});