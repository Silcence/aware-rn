/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 页面导航注册页
 * Created by CoderR on 2018/4/26.
 */
'use strict';

import { StackNavigator } from 'react-navigation';

import LoginScene from '../login/LoginScene';
import MainScene from '../main/MainScene';
import PersonalScene from '../mine/PersonalScene';
import EditNameScene from '../mine/EditNameScene';

const AwrNavigator = StackNavigator({
    LoginScene: {screen: LoginScene},
    MainScene: {screen: MainScene},
    PersonalScene: {screen: PersonalScene},
    EditNameScene: {screen: EditNameScene}
},{
    initialRouteName:'MainScene',
    mode:'modal',
    headerMode:'none',

});

export default AwrNavigator;