/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 登录页
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    TextInput
} from 'react-native';

import {getCommonPixel,getTopDistance,getFontPixel} from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/FontAndColor';
import BaseComponent from '../common/BaseComponent';
import I18n from '../../language/i18n';
import * as urls from '../../constant/urls';
import request from '../../utils/RequestUtil';
import * as StorageKeyNames from '../../constant/StorageKeyNames';
import {setCacheItem} from '../../utils/StorageUtil';

import { connect } from 'react-redux';
import {login} from '../../actions/login';
import {getProfile} from '../../actions/mine';
import Toast from './../common/Toast';

const logoImg = require('../../images/logo.png');
const closeImg = require('../../images/close.png');
const hintImg = require('../../images/hint.png');

class LoginScene extends BaseComponent {

    constructor(props){
        super(props);
        this.phone = '';
        this.code = '';
        this.counter = 60;

        this.state={
            codeHint:I18n.t('login.get_code'),
            codeEnable:false
        };

    }

    _close = ()=> {
        this.backPage();
    };

    _onPhoneChange = (text)=> {
        this.phone = text;
    };

    _onCodeChange = (text) => {
        this.code = text;
    };

    _onLoginPress = ()=>{

        if(this.phone === '' || !this.phone.startsWith('1') || this.phone.trim().length !== 11){
            this.toast.show(I18n.t('login.error_phone'));
            return;
        }

        if(this.code === '' || this.code.trim().length !== 6){
            this.toast.show(I18n.t('login.error_code'));
            return;
        }

        let map = {
            phone: this.phone,
            verifycode: this.code
        };

        // this.props.login(map);

        request(urls.ACCOUNT_SIGN_IN,'post',map).then(
            (response)=>{
                if(response.code === 0){
                    setCacheItem(StorageKeyNames.LOGIN_SUC,JSON.stringify(response.data));
                    this.props.getProfile();//通知我的页面刷新
                    this.toast.show('登录成功',400,()=>{this.backPage()});

                }else{
                    this.toast.show(response.message);
                }

            },
            (error)=>{
                this.toast.show(error.message);
            }
        );

    };

    _onSendCode = ()=>{
        if(this.phone === '' || !this.phone.startsWith('1') || this.phone.trim().length !== 11){
            this.toast.show(I18n.t('login.error_phone'));
            return;
        }

        request(urls.ACCOUNT_PHONE_SEND,'post',{phone:this.phone}).then(
            (response)=>{
                if(response.code === 0){
                    this.code = response.verifycode+'';
                    this.ref_code.setNativeProps({
                        text:response.verifycode+''
                    });
                }else{
                    this.toast.show(response.message);
                }

            },
            (error)=>{
            }
        );

        this.setState({
            codeHint:this.counter+I18n.t('login.code_resend'),
            codeEnable:true
        },()=>{
            this.counter--;
            this.timer = setInterval(()=>{
                this.setState({
                    codeHint:this.counter+I18n.t('login.code_resend'),
                    codeEnable:true
                },()=>{
                    this.counter--;
                    if(this.counter === -1){
                        this.setState({
                            codeHint:I18n.t('login.get_code'),
                            codeEnable:false
                        });
                        this.counter = 60;
                        clearInterval(this.timer);
                    }
                });
            },1000)
        });


    };


    // componentWillReceiveProps(nextProps){
    //     if(nextProps.status === 'login_in_done'){
    //         this.toast.show('登录成功');
    //     }
    // }


    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.contentWrap}>
                    <View style={styles.logoWrap}>
                        <Image style={styles.logoImg} source={logoImg} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this._close}
                        >
                            <Image style={styles.closeImg} source={closeImg} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.welText}>{I18n.t('login.welcome')}</Text>
                    <View style={styles.phoneWrap}>
                        <TextInput
                            onChangeText={this._onPhoneChange}
                            style={styles.phoneText}
                            underlineColorAndroid='transparent'
                            placeholder={I18n.t('login.phone_hint')}
                            placeholderTextColor={FontAndColor.FONT_COLOR3}
                            keyboardType={'numeric'}
                        />
                        <TouchableOpacity
                            style={this.state.codeEnable ? styles.codeDisable : styles.codeBtn}
                            onPress={this._onSendCode}
                            activeOpacity={0.6}
                            disabled={this.state.codeEnable}
                        >
                            <Text style={this.state.codeEnable ? styles.codeDisableText : styles.codeText}>
                                {this.state.codeHint}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.codeWrap}>
                        <TextInput
                            ref={(ref)=>{this.ref_code = ref}}
                            onChangeText={this._onCodeChange}
                            style={styles.phoneText}
                            underlineColorAndroid='transparent'
                            placeholder={I18n.t('login.code_hint')}
                            placeholderTextColor={FontAndColor.FONT_COLOR3}
                            keyboardType={'numeric'}
                            maxLength={6}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this._onLoginPress}
                        style={styles.loginBtn}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.loginText}>{I18n.t('login.login_btn')}</Text>
                    </TouchableOpacity>
                    <View style={styles.hintWrap}>
                        <Image style={styles.hintImg} source={hintImg} />
                        <Text style={styles.hintText}>{I18n.t('login.hint_text')}</Text>
                    </View>
                </View>
                <Toast ref={(ref)=>{this.toast = ref;}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:FontAndColor.WHITE,
    },
    contentWrap:{
        marginTop: getTopDistance(144),
        marginHorizontal: getCommonPixel(32),
    },
    logoWrap:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    logoImg:{
        height: getCommonPixel(140),
        width: getCommonPixel(140)
    },
    closeImg:{
        height: getCommonPixel(54),
        width: getCommonPixel(54)
    },
    welText:{
        marginTop: getCommonPixel(50),
        color: FontAndColor.FONT_COLOR2,
        fontSize: getFontPixel(48),
        fontWeight:'500',
        fontFamily:'PingFangSC-Medium'
    },
    phoneWrap:{
        marginTop: getCommonPixel(60),
        height: getCommonPixel(108),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: FontAndColor.BORDER_COLOR,
        borderBottomWidth: getCommonPixel(2),
    },
    phoneText:{
        color: FontAndColor.FONT_COLOR2,
        fontSize: getFontPixel(32),
        flex: 1,
    },
    codeBtn:{
        height: getCommonPixel(60),
        width: getCommonPixel(192),
        borderRadius: getCommonPixel(40),
        backgroundColor: 'rgba(241,168,83,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeDisable:{
        height: getCommonPixel(60),
        width: getCommonPixel(192),
        borderRadius: getCommonPixel(40),
        borderWidth: getCommonPixel(2),
        borderColor: FontAndColor.FONT_COLOR3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeDisableText:{
        color: FontAndColor.FONT_COLOR3,
        fontSize: getFontPixel(28)
    },
    codeText:{
        color: FontAndColor.DARK_YELLOW,
        fontSize: getFontPixel(28)
    },
    codeWrap:{
        marginTop: getCommonPixel(36),
        height: getCommonPixel(108),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: FontAndColor.BORDER_COLOR,
        borderBottomWidth: getCommonPixel(2),
    },
    loginBtn:{
        marginTop:getCommonPixel(38),
        height:getCommonPixel(86),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:FontAndColor.DARK_YELLOW,
        borderRadius:getCommonPixel(100)
    },
    loginText:{
        color:FontAndColor.WHITE,
        fontSize:getCommonPixel(32),
        fontWeight:'400',
        fontFamily:'PingFangSC-Medium'
    },
    hintWrap:{
        marginTop: getCommonPixel(59),
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    hintImg:{
        height:getCommonPixel(32),
        width:getCommonPixel(32),
    },
    hintText:{
        color: FontAndColor.FONT_COLOR4,
        fontSize: getFontPixel(22),
        marginLeft: getCommonPixel(12)
    }

});

const mapStateToProps = state => ({
    status: state.loginState.status,
    user: state.loginState.user,
    hint: state.loginState.hint
});

const mapDispatchToProps = dispatch => ({
    login: (dt)=> dispatch(login(dt)),
    getProfile: ()=> dispatch(getProfile()),
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginScene);
