/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 修改昵称
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';

import BaseComponent from '../common/BaseComponent';
import * as FontAndColor from "../../constant/FontAndColor";
import {getTopDistance,getCommonPixel,getFontPixel} from "../../utils/PixelUtil";
import * as urls from '../../constant/urls';
import request from '../../utils/RequestUtil';
import Toast from './../common/Toast';
const dismissKeyboard = require('dismissKeyboard');

import { connect } from 'react-redux';
import {getProfile} from '../../actions/mine';
import {updateName} from '../../actions/personal';

const back = require('../../images/back.png');

class EditNameScene extends BaseComponent{

    constructor(props){
        super(props);
        this.name = this.props.navigation.state.params.name;
    }

    _onNameChange = (text)=>{
        this.name = text;
    };

    _onFinishPress = () =>{
        dismissKeyboard();
        let maps = {
            name: this.name,
        };
        request(urls.USER_PROFILE,'post',maps).then(
            (response)=>{
                if(response.code === 0){
                    this.props.updateName({name:this.name}); //通知个人中心刷新
                    this.props.getProfile();//通知我的页面刷新
                    this.toast.show('修改成功',400,()=>{this.backPage()});

                }else{
                    this.toast.show(response.message);
                }
            },
            (error)=>{

            }
        );
    };


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.NavitatonWrap}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.titleText}>{'修改昵称'}</Text>
                        <TouchableOpacity
                            style={styles.backWrap}
                            activeOpacity={0.7}
                            onPress={()=>{this.backPage()}}
                        >
                            <Image style={styles.backImg} source={back}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.finishWrap}
                            activeOpacity={0.7}
                            onPress={this._onFinishPress}
                        >
                            <Text style={styles.finishText}>完成</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.editWrap}>
                    <TextInput
                        onChangeText={this._onNameChange}
                        style={styles.editText}
                        underlineColorAndroid='transparent'
                        defaultValue={this.name}
                        maxLength={25}
                    />
                </View>
                <Toast ref={(ref)=>{this.toast = ref;}} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:FontAndColor.BG_COLOR,
    },
    NavitatonWrap:{
        backgroundColor:FontAndColor.WHITE,
        paddingTop: getTopDistance(40),
    },
    titleWrap:{
        height: getCommonPixel(88),
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2
    },
    backWrap:{
        position:'absolute',
        left:getCommonPixel(32),
        top:getCommonPixel(22)
    },
    backImg:{
        height:getCommonPixel(44),
        width:getCommonPixel(44)
    },
    finishWrap:{
        position:'absolute',
        right:getCommonPixel(32),
        top:getCommonPixel(28),
    },
    finishText:{
        fontSize:getFontPixel(30),
        color:FontAndColor.FONT_COLOR7
    },
    editWrap:{
        height:getCommonPixel(110),
        backgroundColor:FontAndColor.WHITE,
        paddingHorizontal:getCommonPixel(32),
        marginTop:getCommonPixel(24),
        justifyContent:'center'
    },
    editText:{
        color: FontAndColor.FONT_COLOR2,
        fontSize: getFontPixel(32),
        flex: 1,
        padding:0,
    },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>({
    updateName: (dt)=>dispatch(updateName(dt)),
    getProfile: ()=>dispatch(getProfile()),
});

export default connect(mapStateToProps,mapDispatchToProps)(EditNameScene);