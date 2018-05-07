/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 登录STATE
 * Created by CoderR.
 */
'use strict';
import * as actionTypes from '../actions/types';

const initState = {
    status:'',
    hint:null,
    user:null
};

let loginReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_IN_DOING:
            return Object.assign({},state,{status:'login_in_doing'});
        case actionTypes.LOGIN_IN_DONE:
            return Object.assign({},state,{status:'login_in_done',user:action.user});
        case actionTypes.LOGIN_IN_ERROR:
            return Object.assign({},state,{status:'login_in_error',hint:action.hint});
        default:
            return state;
    }
};

export default loginReducer;