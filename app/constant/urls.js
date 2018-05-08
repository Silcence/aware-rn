/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 后台地址
 * Created by CoderR.
 */
'use strict';

/**
 * 开发地址
 */
export const BASEURL = 'http://10.10.30.16:8081/v1/';



/**
 * 发送验证码接口
 */
export const ACCOUNT_PHONE_SEND = BASEURL + "account/phone-send";

/**
 * 登录接口
 */
export const ACCOUNT_SIGN_IN = BASEURL + "account/signin";

/**
 * 退出登录
 */
export const ACCOUNT_SIGN_OUT = BASEURL + "account/signout";

/**
 * 首页接口
 */
export const INDEX = BASEURL + "index";

/**
 * 个人资料
 */
export const USER_PROFILE = BASEURL + "user/profile";

/**
 * 我的文章
 */
export const USER_ARTICLES = BASEURL + "user/articles";

/**
 * 我的点赞
 */
export const USER_LIKES = BASEURL + "user/likes";

/**
 * 我的项目
 */
export const USER_Following = BASEURL + "user/following";