/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 获取我的资料
 * Created by CoderR.
 */
'use strict';

import request from '../utils/RequestUtil';
import * as urls from '../constant/urls';
import * as actionTypes from './types';

export function getProfile() {

    return dispatch => {
        request(urls.USER_PROFILE,'get',{}).then(
            (response)=>{
                if(response.code === 0){
                    dispatch(profileDone(response.data));
                }
            },
            (error)=>{
            }
        );
    };

}

function profileDone(profile){
    return {
        type: actionTypes.GET_MY_DONE,
        profile: profile,
    }
}

export function resetProfile() {
    request(urls.ACCOUNT_SIGN_OUT,'post',{}).then(
        (response)=>{
        },
        (error)=>{
        }
    );
    return {
        type: actionTypes.RESET_MY_PROFILE
    }
}