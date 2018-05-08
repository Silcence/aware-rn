/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 测试页----滚动TAB
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class TestScene extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.tabLabel}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});