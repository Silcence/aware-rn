/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 个人中心
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import BaseComponent from '../common/BaseComponent';
import * as FontAndColor from "../../constant/FontAndColor";
import {getTopDistance,getCommonPixel,getFontPixel} from "../../utils/PixelUtil";
import {getCacheItem,removeCacheItem} from '../../utils/StorageUtil';
import {LOGIN_SUC} from '../../constant/StorageKeyNames';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { initProfile,uploadAvatar } from '../../actions/personal';
import { resetProfile } from '../../actions/mine';

const back = require('../../images/back.png');
const more = require('../../images/more.png');
const avater = require('../../images/avatar.png');

class PersonalScene extends BaseComponent{

    constructor(props){
        super(props);

        this.state={
            phone:'',
        }
    }

    didMountFinish = ()=>{

        let dt = {
            name: this.props.navigation.state.params.name,
            avatar: this.props.navigation.state.params.avatar,
        };

        this.props.initProfile(dt);

        getCacheItem(LOGIN_SUC,(cache)=>{

            if(cache.code === 1 && cache.result !== null){
                this.setState({
                    phone:JSON.parse(cache.result).profile.phone
                });
            }});
    };

    _quitePress = ()=>{
        removeCacheItem(LOGIN_SUC);
        this.props.resetProfile();
        this.backPage();

    };

    _openImagePicker = ()=>{
        ImagePicker.openPicker({
            width:240,
            height:240,
            cropping:true,
            hideBottomControls:true,
        }).then((image)=>{
            this.props.updateAvatar(image.path);
        },(error)=>{

        })
    };

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.NavitatonWrap}>
                    <View style={styles.titleWrap}>
                        <Text style={styles.titleText}>{'个人中心'}</Text>
                        <TouchableOpacity
                            style={styles.backWrap}
                            activeOpacity={0.7}
                            onPress={()=>{this.backPage()}}
                        >
                            <Image style={styles.backImg} source={back}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.avatarWrap}>
                    <View style={styles.contentWrap}>
                        <Text style={styles.leftText}>{'头像'}</Text>
                        <TouchableOpacity
                            onPress={this._openImagePicker}
                            activeOpacity={0.7}
                            style={styles.rightWrap}>
                            <ImageBackground
                                style={styles.avatarImg}
                                source={avater}
                            >
                                <Image
                                    style={styles.avatarImg}
                                    source={this.props.avatar}
                                />
                            </ImageBackground>
                            <Image style={styles.moreImg} source={more}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.nickWrap}>
                    <View style={styles.contentWrap}>
                        <Text style={styles.leftText}>{'昵称'}</Text>
                        <TouchableOpacity
                            onPress={()=>{this.toNextPage('EditNameScene',{name:this.props.name})}}
                            activeOpacity={0.7}
                            style={styles.rightWrap}>
                            <Text style={styles.nickText}>{this.props.name}</Text>
                            <Image style={styles.moreImg} source={more}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.nickWrap}>
                    <View style={styles.contentWrap}>
                        <Text style={styles.leftText}>{'手机号'}</Text>
                        <View style={styles.rightWrap}>
                            <Text style={styles.phoneText}>{this.state.phone}</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    style={styles.quitWrap}
                    onPress={this._quitePress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.quitText}>{'退出当前账号'}</Text>
                </TouchableOpacity>
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
        left:0,
        top:0,
        bottom:0,
        paddingRight:getCommonPixel(32),
        justifyContent:'center',
        paddingLeft:getCommonPixel(32)
    },
    backImg:{
        height:getCommonPixel(44),
        width:getCommonPixel(44)
    },

    avatarWrap:{
        backgroundColor:FontAndColor.WHITE,
        marginTop:getCommonPixel(20),
        paddingLeft:getCommonPixel(32),
    },
    contentWrap:{
        height:getCommonPixel(110),
        flexDirection:'row',
        alignItems:'center',
        paddingRight:getCommonPixel(32),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR,
        justifyContent:'space-between'
    },
    leftText:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2
    },
    rightWrap:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:getCommonPixel(15)
    },
    avatarImg:{
        height: getCommonPixel(44),
        width: getCommonPixel(44),
        marginRight: getCommonPixel(32),
        borderRadius:getCommonPixel(44),
        overflow:'hidden'
    },
    moreImg:{
        height:getCommonPixel(44),
        width:getCommonPixel(44),
    },
    nickWrap:{
        backgroundColor:FontAndColor.WHITE,
        paddingLeft:getCommonPixel(32),
    },
    nickText:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2,
        marginRight:getCommonPixel(22)
    },
    phoneText:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2,
        marginRight:getCommonPixel(66)
    },

    quitWrap:{
        height: getCommonPixel(80),
        backgroundColor: FontAndColor.WHITE,
        justifyContent:'center',
        alignItems:'center',
        marginTop:getCommonPixel(60)
    },
    quitText:{
        fontSize: getFontPixel(32),
        color: FontAndColor.DOWN_RED
    }

});

const mapStateToProps = state => ({
    name: state.personalState.name,
    avatar: state.personalState.avatar,
});

const mapDispatchToProps = dispatch =>({
    initProfile: (dt) => dispatch(initProfile(dt)),
    resetProfile: () => dispatch(resetProfile()),
    updateAvatar: (dt) => dispatch(uploadAvatar(dt)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PersonalScene);


