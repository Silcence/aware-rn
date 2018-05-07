/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * TAB 主页面
 * Created by CoderR on 2018/4/27.
 */
'use strict';

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import BaseComponent from '../common/BaseComponent';
import TabView from './widgets/TabView';


export default class MainScene extends BaseComponent{

    constructor(props){
        super(props);
    }

    _toLoginPage = ()=>{
        this.toNextPage('LoginScene',{})
    };

    _toNextPage = (mPage, mParam)=>{
        this.toNextPage(mPage, mParam);
    };

    render(){
        return(
            <View style={styles.container}>
                <TabView toLogin={this._toLoginPage} toNextPage={this._toNextPage}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});