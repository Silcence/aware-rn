/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 图片来源选择框--相机、相册
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity
}from 'react-native';

import {getCommonPixel,getFontPixel} from '../../../utils/PixelUtil';
import {deviceWidth,deviceHeight} from '../../../utils/DeviceInfo';
import * as FontAndColor from '../../../constant/FontAndColor';

export default class SelectImagePop extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isShow: false,
        }
    }

    show = ()=>{
        this.setState({
            isShow:true
        })
    };

    _typePress = (type)=>{

        this.setState({
            isShow:false,
        },()=>{
            this.props.onTypeClick(type);
        });
    };

    _close = ()=>{
        this.setState({
            isShow:false,
        });
    };

    render(){

        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                onRequestClose={()=>{}}
                visible={this.state.isShow}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this._close}
                    style={styles.container}>
                    <View style={styles.selectWrap}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.titleText}>{'选取图片'}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>{this._typePress(1)}}
                            activeOpacity={0.8}
                            style={styles.cameraWrap}>
                            <Text style={styles.btnText}>{'拍照'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{this._typePress(2)}}
                            activeOpacity={0.8}
                            style={styles.galleryWrap}>
                            <Text style={styles.btnText}>{'从相册选择'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this._close}
                        activeOpacity={0.8}
                        style={styles.cancleWrap}>
                        <Text style={styles.btnText}>{'取消'}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );

    }


}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    selectWrap:{
        height: getCommonPixel(320),
        marginHorizontal: getCommonPixel(32),
        width:deviceWidth - getCommonPixel(64)
    },
    titleWrap:{
        backgroundColor: FontAndColor.WHITE,
        height:getCommonPixel(100),
        borderTopLeftRadius:getCommonPixel(20),
        borderTopRightRadius:getCommonPixel(20),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    cameraWrap:{
        backgroundColor: FontAndColor.WHITE,
        height:getCommonPixel(110),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    galleryWrap:{
        backgroundColor: FontAndColor.WHITE,
        height:getCommonPixel(110),
        borderBottomLeftRadius:getCommonPixel(20),
        borderBottomRightRadius:getCommonPixel(20),
        justifyContent:'center',
        alignItems:'center'
    },
    cancleWrap:{
        backgroundColor: FontAndColor.WHITE,
        height:getCommonPixel(100),
        borderRadius:getCommonPixel(20),
        justifyContent:'center',
        alignItems:'center',
        marginTop:getCommonPixel(20),
        marginBottom:getCommonPixel(30),
        width:deviceWidth - getCommonPixel(64)
    },
    titleText:{
        fontSize:getFontPixel(30),
        color:FontAndColor.FONT_COLOR3
    },
    btnText:{
        fontSize:getFontPixel(34),
        color:FontAndColor.LIGHT_YELLOW,
        fontWeight:'400',
    }
});