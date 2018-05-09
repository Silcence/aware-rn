/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * Component基类，封装一些常用方法
 * Created by CoderR on 2018/4/27.
 */
'use strict';

import React from 'react';
import {
    BackHandler
} from 'react-native';

import { NavigationActions } from 'react-navigation';

export default class BaseComponent extends React.Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        this.didMountFinish();
    }

    didMountFinish = ()=> {};


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
        this.unMountFinish();
    }

    unMountFinish = ()=> {};


    //Android返回键处理
    handleBack = () =>{
        this.backPage();
        return true;
    };

    //跳转到下一页
    toNextPage = (mPage, mParam) => {
        const { navigate } = this.props.navigation;
        navigate(mPage,mParam);
    };


    //返回上一页
    backPage = () => {
        // const { dispatch } = this.props.navigation;
        // const backAction = NavigationActions.back({
        //     key: null
        // });
        // dispatch(backAction);
        this.props.navigation.goBack();
    };


    //返回指定页
    backPageByName = (routeName) => {
        let routes = this.props.screenProps.getRoutes();
        let iRoute = null;
        routes.map((r,index)=>{
            if(r.routeName === routeName){
                iRoute = index
            }
        });

        if(iRoute !== null){
            let key = routes[iRoute + 1].key;
            const { dispatch } = this.props.navigation;
            const backAction = NavigationActions.back({
                key: key
            });
            dispatch(backAction);
        }
    };


    //获取当前页的名称
    getCurrentPageName = ()=>{
        let routes = this.props.screenProps.getRoutes();
        return routes[routes.length - 1].routeName
    };


    //返回制定页面并清空导航栈
    placePage = (routeName) => {
        const { dispatch } = this.props.navigation;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName})
            ]
        });
        dispatch(resetAction)
    };

}