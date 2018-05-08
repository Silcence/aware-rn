/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * UI入口
 * Created by CoderR on 2018/5/2.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    StatusBar,
} from 'react-native';
import { isIOS } from '../utils/DeviceInfo';
import AwrNavigator from './/common/AwrNavigator';

export default class app extends React.Component {

    constructor(props){
        super(props);
        //修改一些组件的默认属性
        Text.defaultProps.allowFontScaling = false;

    }

    render(){

        return isIOS
            ?
            (<View style={{flex:1}} >
                <AwrNavigator
                    ref={(ref)=>{this.awrNav = ref;}}
                    screenProps={{
                        getRoutes:this._getRoutes
                    }}
                />
            </View>)
            :
            (<View style={{flex:1}} >
                <StatusBar
                    barStyle="dark-content"
                    translucent={true} backgroundColor={'#FFFFFF'}
                />
                <AwrNavigator
                    ref={(ref)=>{this.awrNav = ref;}}
                    screenProps={{
                        getRoutes:this._getRoutes
                    }}
                />
            </View>)

    }


    //获取全局路由
    _getRoutes = () => {
        return this.awrNav.state.nav.routes;
    }

}