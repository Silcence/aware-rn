/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 我的STATE
 * Created by CoderR.
 */
'use strict';

import * as actionTypes from '../actions/types';
const avatar = require('../images/avatar.png');

const initState = {
    name: '登录/注册',
    avatar: avatar,
    projects: 0,
    likes: 0,
    articles: 0,
    balance: 0.00,
    isLogin: false,
};

let mineReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_MY_DONE:
            return Object.assign({},state,{
                name: action.profile.name,
                avatar: {uri:action.profile.avatar},
                projects: action.profile.projects,
                likes: action.profile.likes,
                articles: action.profile.articles,
                balance: action.profile.balance,
                isLogin: true,
            });
        case actionTypes.RESET_MY_PROFILE:
            return Object.assign({},state,initState);
        default:
            return state;
    }
};

export default mineReducer;