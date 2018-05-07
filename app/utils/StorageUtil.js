/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 本地缓存（key-value形式）
 * Created by CoderR on 2018/4/26.
 */
'use strict';

import {
    AsyncStorage
} from 'react-native';


//根据key设置值
function setCacheItem(keyName, keyValue) {
    AsyncStorage.setItem(keyName, keyValue, function (errs) {
        if(!errs){}
    })
}

//根据key取值
function getCacheItem(keyName, callBack) {
    AsyncStorage.getItem(keyName, function (errs, result) {
        if(!errs){
            callBack({code:1, result:result});
        }else{
            callBack({code:-1, result:errs});
        }
    })
}

//根据key删除值
function removeCacheItem(keyName) {
    AsyncStorage.removeItem(keyName, function (errs) {
        if(!errs){}
    })
}

module.exports = {
    setCacheItem,
    getCacheItem,
    removeCacheItem
};