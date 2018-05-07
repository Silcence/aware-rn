/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 个人中心STATE
 * Created by CoderR.
 */
'use strict';

import * as actionTypes from '../actions/types';
const avatar = require('../images/avatar.png');

const initState = {
    name: '',
    avatar: avatar,
};

let personalReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PERSONAL:
            return Object.assign({},state,{
                name: action.info.name,
                avatar: action.info.avatar,
            });
        case actionTypes.UPDATE_NAME:
            return Object.assign({},state,{
                name: action.info.name,
            });
        case actionTypes.UPDATE_AVATAR:
            return Object.assign({},state,{
                avatar: action.info.avatar,
            });
        default:
            return state;
    }
};

export default personalReducer;