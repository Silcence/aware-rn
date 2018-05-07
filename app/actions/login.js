/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 登录动作
 * Created by CoderR.
 */
'use strict';

import request from '../utils/RequestUtil';
import * as urls from '../constant/urls';
import * as actionTypes from './types';


export function login(dt) {

    return dispatch => {
        dispatch(loginDoing());

        request(urls.ACCOUNT_SIGN_IN,'post',dt).then(
            (response)=>{
                if(response.code === 0){
                    dispatch(loginDone(response.data));
                }else{
                    dispatch(loginError({msg: response.message}));
                }
            },
            (error)=>{
                dispatch(loginError({msg: '网络请求错误'}));
            }
        );
    };

}

function loginDoing() {
    return {
        type: actionTypes.LOGIN_IN_DOING
    }
}

function loginDone(user){
    return {
        type: actionTypes.LOGIN_IN_DONE,
        user: user,
    }
}

function loginError(hint){
    return {
        type: actionTypes.LOGIN_IN_ERROR,
        hint: hint
    }
}