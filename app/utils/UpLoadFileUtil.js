/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 图片、文件上传
 * Created by CoderR.
 */
'use strict';

import {getCacheItem} from '../utils/StorageUtil';
import * as StorageKeyNames from '../constant/StorageKeyNames';
import {USER_PROFILE} from '../constant/urls';


export default function request(fileUri) {

    return new Promise((resolve, reject)=>{


        getCacheItem(StorageKeyNames.LOGIN_SUC,(cache)=>{

            let token = '';
            if(cache.code === 1 && cache.result !== null){
                token = JSON.parse(cache.result).access_token;
            }

            let fileName = (new Date()).getTime() + '';
            let formData = new FormData();
            let file = {
                uri: fileUri,
                type: 'multipart/form-data',
                name: `${fileName}.jpg`,
            };
            formData.append('avatar',file);

            let isOK;
            fetch(USER_PROFILE,{
                method:'POST',
                headers: {
                    'Content-Disposition': 'multipart/form-data',
                    'name': 'another',
                    'filename': `${fileName}.jpg`,
                    'Authorization':'Bearer ' + token
                },
                body: formData
            }).then((response) => {
                isOK = response.ok;
                return response.json();
            }).then((responseData) => {
                if(isOK){
                    resolve(responseData);
                }else{
                    reject({code:-300, message:'网络请求错误'});
                }
            }).catch((error) => {
                reject({code:-500, message:'网络请求错误'});
            });


        });


    });
}