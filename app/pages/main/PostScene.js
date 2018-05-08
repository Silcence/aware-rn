/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 发布页
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class PostScene extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text>发布</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});