/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 主页
 * Created by CoderR on 2018/4/28.
 */

'use strict';

import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';

import * as FontAndColor from '../../constant/FontAndColor';
import {getCommonPixel,getTopDistance,getFontPixel} from '../../utils/PixelUtil';
import {deviceWidth} from '../../utils/DeviceInfo';
import SearchView from '../common/SearchView';
import Swiper from 'react-native-swiper';
import Toast from '../common/Toast';
import I18N from '../../language/i18n';

import CarouselDot from './component/CarouselDot';
import HotProjectItem from './component/HotProjectItem';
import HotArticleItem from './component/HotArticleItem';
import * as urls from "../../constant/urls";
import request from "../../utils/RequestUtil";
const moreImg = require('../../images/more.png');

export default class HomeScene extends React.Component{

    constructor(props){
        super(props);
        this.state={
            banners:[],
            projects:[],
            articles:[],
            isRefreshing:false,
        }
    }

    _onMorePress = ()=>{
        // this.props.toNextPage();
    };

    componentDidMount(){

        request(urls.INDEX,'get',{}).then(
            (response)=>{
                if(response.code === 0){
                    this.setState({
                        banners: response.data.banners,
                        projects:response.data.projects,
                        articles:response.data.articles
                    });

                }else{
                    this.toast.show(response.message);
                }

            },
            (error)=>{
                console.log('3333333dddd34',error);
            }
        );

    }

    onRefresh = ()=>{
        this.setState({
            isRefreshing:true,
        });

        request(urls.INDEX,'get',{}).then(
            (response)=>{
                if(response.code === 0){
                    this.setState({
                        banners:response.data.banners,
                        projects:response.data.projects,
                        articles:response.data.articles,
                        isRefreshing:false
                    });

                }else{
                    this.setState({
                        isRefreshing:false,
                    });
                    this.toast.show(response.message);
                }

            },
            (error)=>{
                this.setState({
                    isRefreshing:false,
                });
            }
        );
    };

    render(){

        return(
            <View style={styles.container}>
                <SearchView />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            tintColor={[FontAndColor.DARK_YELLOW]}
                            colors={[FontAndColor.DARK_YELLOW]}
                        />
                    }
                >
                    <View style={styles.carouselWrap}>

                        {this.state.banners.length > 0
                            ?
                            <Swiper
                                paginationStyle={styles.carouselBottom}
                                autoplay={true}
                                dot={<CarouselDot active={false}/>}
                                activeDot={<CarouselDot active={true}/>}
                            >

                                {this.state.banners.map((item,index)=>{
                                    return(
                                        <Image key={index} style={styles.carouselWrap} source={{uri:item.image}} resizeMode='stretch'/>
                                    )
                                })}

                            </Swiper>
                            : null
                        }

                    </View>

                    <View style={styles.projectWrap}>
                        <View style={styles.projectTitleWrap}>
                            <Text style={styles.projectText}>{I18N.t('home.hot_project')}</Text>
                            <TouchableOpacity
                                style={styles.moreWrap}
                                activeOpacity={0.7}
                                onPress={this._onMorePress}
                            >
                                <Text style={styles.moreText}>{I18N.t('home.hot_more')}</Text>
                                <Image style={styles.moreImg} source={moreImg}/>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.projectItem}>
                            {this.state.projects.map((item,index)=>{
                                return(
                                    <HotProjectItem key={index} item={item}/>
                                )
                            })}
                        </View>

                    </View>
                    <View style={styles.articleWrap}>
                        <View style={styles.projectTitleWrap}>
                            <Text style={styles.projectText}>{I18N.t('home.hot_article')}</Text>
                        </View>
                        {this.state.articles.map((item,index)=>{
                            return(
                                <HotArticleItem key={index} item={item}/>
                            )
                        })}
                    </View>
                </ScrollView>
                <Toast />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:FontAndColor.BG_COLOR,
        alignItems:'center',
    },
    statusBarWrap:{
        backgroundColor:FontAndColor.WHITE,
        height:getTopDistance(40)
    },
    carouselWrap:{
        width:deviceWidth,
        height:getCommonPixel(320),
    },
    carouselBottom:{
        bottom:getCommonPixel(20)
    },

    projectWrap:{
        width: deviceWidth,
        paddingHorizontal: getCommonPixel(32),
        backgroundColor: FontAndColor.WHITE
    },
    projectTitleWrap:{
        marginTop: getCommonPixel(48),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: getCommonPixel(32)
    },
    projectText:{
        fontSize: getFontPixel(40),
        color: FontAndColor.FONT_COLOR2,
        fontWeight:'500',
        fontFamily:'PingFangSC-Semibold'
    },
    moreWrap:{
        flexDirection:'row',
    },
    moreText:{
        fontSize: getFontPixel(32),
        color: FontAndColor.FONT_COLOR3,
        fontFamily:'PingFangSC-Regular',
    },
    moreImg:{
        height: getCommonPixel(44),
        width: getCommonPixel(44),
    },
    projectItem:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        paddingBottom:getCommonPixel(28)
    },


    articleWrap:{
        width: deviceWidth,
        paddingHorizontal: getCommonPixel(32),
        backgroundColor: FontAndColor.WHITE,
        marginTop: getCommonPixel(30),
        marginBottom:getCommonPixel(30)

    }
});