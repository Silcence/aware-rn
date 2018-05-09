/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 文章TAB
 * Created by CoderR.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';

import {getCommonPixel,getFontPixel} from '../../../utils/PixelUtil';

export default class ArticleTabBar extends React.Component{

    renderTab(name, page, isTabActive, onPressHandler) {
        const activeTextColor = '#F1A853';
        const inactiveTextColor = '#333333';
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;

        return <TouchableOpacity
            style={{flex: 1, }}
            key={name}
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab ]}>
                <Text style={[{color: textColor ,fontSize: getFontPixel(32)}]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>;
    }

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            left:containerWidth / numberOfTabs/2.5,
            width: containerWidth / numberOfTabs/5,
            height: getCommonPixel(6),
            backgroundColor: '#F1A853',
            bottom: 0,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
        });
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                <Animated.View style={[
                    tabUnderlineStyle,
                    { transform:[
                            {translateX}
                        ]
                    }, this.props.underlineStyle,
                ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: getCommonPixel(0)
    },
    tabs: {
        height: getCommonPixel(80),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'

    },
});