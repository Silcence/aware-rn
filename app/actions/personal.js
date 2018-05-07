/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 个人中心
 * Created by CoderR.
 */
'use strict';

import * as actionTypes from './types';
import {getProfile} from './mine';
import UpLoadRequest from '../utils/UpLoadFileUtil';

export function initProfile(dt) {
    return {
        type: actionTypes.INIT_PERSONAL,
        info: dt
    }
}

export function uploadAvatar(path) {
    return dispatch => {
        UpLoadRequest(path).then(
            (response)=>{
                if(response.code === 0){
                    dispatch(updateAvatar({avatar:{uri:path}}));
                    dispatch(getProfile());
                }
            },
            (error)=>{

            }
        );
    }
}

export function updateName(dt) {
    return {
        type: actionTypes.UPDATE_NAME,
        info: dt
    }
}

function updateAvatar(dt) {
    return {
        type: actionTypes.UPDATE_AVATAR,
        info: dt
    }
}