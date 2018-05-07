/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 网络请求
 * Created by CoderR.
 */
'use strict';
import {getCacheItem} from '../utils/StorageUtil';
import * as StorageKeyNames from '../constant/StorageKeyNames';


export default function request(url, method, params) {

    return new Promise((resolve, reject)=>{

        let isOK = false;
        let body = '';
        for(let key of Object.keys(params)){
            body += key;
            body += '=';
            body += params[key];
            body += '&';
        }
        if(body.length > 0){
            body = body.substring(0, body.length - 1);
        }

        let reqBody = null;
        if(method.toLocaleUpperCase() === 'POST'){
            reqBody = {
                method,
                body
            };
        }else if(method.toLocaleUpperCase() === 'GET'){
            reqBody = {
                method
            };
        }

        getCacheItem(StorageKeyNames.LOGIN_SUC,(cache)=>{

            let token = '';
            if(cache.code === 1 && cache.result !== null){
                token = JSON.parse(cache.result).access_token;
            }

            reqBody['headers'] = {
                Authorization:'Bearer ' + token
            };

            fetch(url + '?' + body,reqBody).then((response) => {
                isOK = response.ok;
                console.log('3444',response);
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