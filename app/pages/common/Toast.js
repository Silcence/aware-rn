/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 提示框
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native';

import PropsTypes from 'prop-types';
const ViewPropTypes = RNViewPropTypes || View.propTypes;

export const DURATON = {
  LENGTH_SHORT : 500,
  FOREVER : 0
};

const {height} = Dimensions.get('window');

export default class Toast extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isShow : false,
            text : '',
            opacityValue : new Animated.Value(this.props.opacity)
        }
    }

    show = (text, duration, callback) => {
        this.duration = typeof duration === 'number' ? duration : DURATON.LENGTH_SHORT;
        this.callback = callback;

        this.setState({
            isShow: true,
            text: text,
        });

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(()=>{
                this.isShow = true;
                if(duration !== DURATON.FOREVER) this.close();
        });
    };

    close = (duration) => {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if(delay === DURATON.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if(!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration
                }
            ).start(()=>{
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
                if(typeof this.callback === 'function'){
                    this.callback();
                }
            });
        },delay);
    };

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    };

    render(){
        let pos;
        switch (this.props.position){
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }

        const view = this.state .isShow ?
            <View
                style={[styles.container, {top: pos}]}
                pointerEvents='none'
            >
                <Animated.View
                    style={[styles.content, {opacity: this.state.opacityValue}, this.props.style]}
                >
                    {
                        React.isValidElement(this.state.text)
                            ?
                            this.state.text
                            :
                            <Text style={this.props.textStyle}>
                                {this.state.text}
                            </Text>
                    }
                </Animated.View>

            </View>
            : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex:10000,
    },
    content:{
        backgroundColor:'black',
        borderRadius:5,
        padding:10,
    },
    text:{
        color:'white'
    }
});

Toast.propTypes = {
    style: ViewPropTypes.style,
    position: PropsTypes.oneOf([
        'top',
        'center',
        'bottom'
    ]),
    textStyle: Text.propTypes.style,
    positionValue: PropsTypes.number,
    fadeInDuration: PropsTypes.number,
    fadeOutDuration: PropsTypes.number,
    opacity: PropsTypes.number
};

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
};