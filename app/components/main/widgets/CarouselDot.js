/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 轮播图指示器
 * Created by CoderR on 2018/4/27.
 */
'use strict';

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import * as FontAndColor from '../../../constant/FontAndColor';
import {getCommonPixel} from '../../../utils/PixelUtil';

export default class CarouselDot extends React.Component{

    render(){
        return(
            <View style={[styles.dotWrap,
                {
                    backgroundColor:this.props.active ? FontAndColor.WHITE :FontAndColor.BLACK
                }
                ]} />
        );
    }
}

const styles = StyleSheet.create({
    dotWrap:{
        width:getCommonPixel(12),
        height:getCommonPixel(12),
        borderRadius:getCommonPixel(6),
        marginLeft:getCommonPixel(18)
    }
});