/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 页面导航注册页
 * Created by CoderR on 2018/4/26.
 */
'use strict';
import {
    Animated,
    Easing
}from 'react-native';

import { StackNavigator } from 'react-navigation';

import LoginScene from '../login/LoginScene';
import MainScene from '../main/MainScene';
import PersonalScene from '../mine/PersonalScene';
import EditNameScene from '../mine/EditNameScene';
import ListMineItemScene from '../mine/ListMineItemScene';
import FollowingListScene from "../mine/FollowingListScene";

const AwrNavigator = StackNavigator({
    LoginScene: {screen: LoginScene},
    MainScene: {screen: MainScene},
    PersonalScene: {screen: PersonalScene},
    EditNameScene: {screen: EditNameScene},
    ListMineItemScene: {screen: ListMineItemScene},
    FollowingListScene: {screen: FollowingListScene}

},{
    initialRouteName:'MainScene',
    mode:'modal',
    headerMode:'none',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 400,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateX }] };
        },
    }),

});

export default AwrNavigator;
