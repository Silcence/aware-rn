/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * Alert提示框
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';

import PropsTypes from 'prop-types';

import { getCommonPixel,getFontPixel } from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/FontAndColor';
const close = require('../../images/close.png');

export default class AwrAlert extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isShow : false,
            opacityValue: new Animated.Value(this.props.opacity),
        };

        this._close = this._close.bind(this);
    };

    show(){
        this.setState({
            isShow: true,
        });
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: 300,
            }
        ).start();
    };

    _close(){
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0.0,
                duration: 300,
            }
        ).start(()=>{
            this.setState({
                isShow: false,
            });
        });
    };

    render(){
        const view =
            this.state.isShow
            ?
            <Animated.View style={[styles.container,{
                opacity: this.state.opacityValue
            }]}>
                <View style={styles.hintWrap}>
                    <View style={styles.headWrap}>
                        <Text style={styles.headText}>{this.props.alertTitle}</Text>
                    </View>
                    <View style={styles.contentWrap}>
                        <Text style={styles.contentText}>{this.props.alertContent}</Text>
                    </View>
                </View>
                <View style={styles.closeWrap}>
                    <TouchableWithoutFeedback
                        onPress={this._close}>
                        <Image style={styles.closeImg} source={close} />
                    </TouchableWithoutFeedback>
                </View>

            </Animated.View>
            : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        justifyContent:'center',
        alignItems:'center',
        zIndex:10000,
    },
    hintWrap:{
        height: getCommonPixel(252),
        width: getCommonPixel(482),

    },
    headWrap:{
        height:getCommonPixel(88),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:FontAndColor.DARK_YELLOW,
        borderTopLeftRadius:getCommonPixel(10),
        borderTopRightRadius:getCommonPixel(10)
    },
    headText:{
        fontSize: getFontPixel(40),
        color: FontAndColor.WHITE
    },
    contentWrap:{
        height: getCommonPixel(164),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:FontAndColor.WHITE,
        borderBottomLeftRadius:getCommonPixel(10),
        borderBottomRightRadius:getCommonPixel(10),
        paddingHorizontal:getCommonPixel(80)
    },
    contentText:{
        fontSize: getFontPixel(24),
        color: FontAndColor.FONT_COLOR2,
        textAlign: 'center'
    },
    closeWrap:{
        marginTop:getCommonPixel(55)
    },
    closeImg:{
        height:getCommonPixel(54),
        width:getCommonPixel(54)
    }
});

AwrAlert.propTypes = {
    alertTitle: PropsTypes.string,
    alertContent: PropsTypes.string,
    opacity: PropsTypes.number
};

AwrAlert.defaultProps = {
    alertTitle: '提示',
    alertContent: '内容',
    opacity: 1,
};
