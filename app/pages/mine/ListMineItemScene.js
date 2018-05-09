/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 文章、点赞列表
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
    FlatList,
    RefreshControl
}from 'react-native';

import BaseComponent from '../common/BaseComponent';
import {getCommonPixel, getFontPixel, getTopDistance} from "../../utils/PixelUtil";
import * as FontAndColor from "../../constant/FontAndColor";
import request from '../../utils/RequestUtil';
import * as urls from '../../constant/urls';
import ArticleItem from './component/ArticleItem';
import ProjectItem from './component/ProjectItem';
import LikeItem from './component/LikeItem';
import ListFooterComponent from './component/ListFooterComponent';

const back = require('../../images/back.png');


export default class ListMineItemScene extends BaseComponent{

    constructor(props){
        super(props);

        this.type = this.props.navigation.state.params.type;
        this.title = '';
        if(this.type === 'article'){
            this.title = '我的文章';
        }else if(this.type === 'like'){
            this.title = '我的点赞';
        }else if(this.type === 'project'){
            this.title = '我的项目';
        }
        this.current_page = 1;
        this.last_page = 1;

        this.state = {
            viewData: [],
            refreshing: false,
            loadMoreState:'1',
        };

    }

    _getListData = ()=>{

        let url = '';
        if(this.type === 'article'){
            url = urls.USER_ARTICLES
        }else if(this.type === 'like'){
            url = urls.USER_LIKES
        }else if(this.type === 'project'){
            url = urls.USER_Following
        }

        request(url,'get',{page:this.current_page})
            .then(
                (response)=>{

                    this.current_page = response.data.meta.current_page;
                    this.last_page = response.data.meta.last_page;
                    this.setState({
                        viewData:response.data.list,
                        refreshing:false,
                        loadMoreState:this.current_page === this.last_page ? '1' :'0',
                    });

                },
                (error)=>{

                }
            );
    };

    _getEndData = ()=>{

        let url = '';
        if(this.type === 'article'){
            url = urls.USER_ARTICLES
        }else if(this.type === 'like'){
            url = urls.USER_LIKES
        }else if(this.type === 'project'){
            url = urls.USER_Following
        }

        request(url,'get',{page:this.current_page})
            .then(
                (response)=>{

                    this.current_page = response.data.meta.current_page;
                    this.last_page = response.data.meta.last_page;
                    this.setState({
                        viewData:this.state.viewData.concat(response.data.list),
                        refreshing:false,
                        loadMoreState:this.current_page === this.last_page ? '1' :'0',
                    });

                },
                (error)=>{

                }
            );
    };

    didMountFinish = ()=>{
        this._getListData();
    };

    renderItem = ({item}) => {

        if(this.type === 'article'){
            return(
                <ArticleItem item={item} />
            );
        }else if(this.type === 'like'){
            return(
                <LikeItem item={item} />
            );
        }else if(this.type === 'project'){
            return(
                <ProjectItem item={item} />
            );
        }

    };

    _keyExtractor = (item, index) => index;

    _renderRefresh = () =>{

        this.setState({
            refreshing:true
        },()=>{
            this.current_page = 1;
            this.last_page = 1;
            this._getListData();
        });

    };

    _onEndReached = ()=>{

        if(this.current_page === this.last_page){

        }else{
            this.current_page++;
            this._getEndData();
        }
    };

    _renderFootComponent = ()=>{
        if(this.state.loadMoreState === '0'){
            return(<ListFooterComponent info={'加载更多.....'}/>)
        }
        return(<ListFooterComponent info={'我是有底线的'}/>)
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.NavitatonWrap}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.titleText}>{this.title}</Text>
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
                    style={styles.flexWrap}
                    data={this.state.viewData}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}

                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}

                    initialNumToRender={5}

                    ListFooterComponent={this._renderFootComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._renderRefresh}
                            tintColor={[FontAndColor.DARK_YELLOW]}
                            colors={[FontAndColor.DARK_YELLOW]}
                        />
                    }
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
    flexWrap:{
        flex:1,
    }
});