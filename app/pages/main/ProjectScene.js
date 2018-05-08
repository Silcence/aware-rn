/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 项目库
 * Created by CoderR on 2018/4/28.
 */
'use strict';

import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';

import {getCommonPixel} from '../../utils/PixelUtil';
import {deviceWidth} from '../../utils/DeviceInfo';
const loading = require('../../images/loading.gif');

export default class ProjectScene extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            viewData: [],
            refreshing: false,
            firstEntry: true,
        };
        this.flag = 1;

        // let t = new Date();
        // console.log('0000000000000',t.getTime());
    }

    componentDidMount(){

        setTimeout(()=>{
            let vd = [];
            for(let i = 0; i < 12; i++){
                vd.push({
                    name:i+'_BTC_' + this.flag
                })
            }

            this.setState({
                viewData:vd,
                firstEntry:false
            });
        },1000);



    }


    renderItem = ({item}) => {

        return(
            <ListItem item={item} />

        );
    };

    _keyExtractor = (item, index) => index;

    _renderRefresh = () =>{

        this.flag=this.flag+1;
        this.setState({
            refreshing:true
        },()=>{
            let vd = [];
            for(let i = 0; i < 12; i++){
                vd.push({
                    name:i+'_BTC_' + this.flag
                })
            }

            this.setState({
                viewData:vd,
                refreshing:false
            });
        });
    };

    _onEndReached = ()=>{

        this.flag = this.flag+1;
        let vd = [...this.state.viewData];
        for(let i = 0; i < 12; i++){
            vd.push({
                name:i+'_BTC_' + this.flag
            })
        }

        this.setState({
            viewData:vd
        });


    };

    render(){
        let t = new Date();
        console.log('111111111111111',t.getTime());
        return(
            this.state.firstEntry ?
            <View style={styles.container}>
                <Image style={styles.loadingWrap} source={loading}/>
            </View>
                :
                <View style={styles.container1}>
                    <FlatList
                        data={this.state.viewData}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}

                        refreshing={this.state.refreshing}
                        onRefresh={this._renderRefresh}

                        onEndReachedThreshold={0.1}
                        onEndReached={this._onEndReached}

                        initialNumToRender={5}

                        getItemLayout={(data, index)=>({
                                length: getCommonPixel(80),
                                offset: getCommonPixel(80)*index,
                                index
                            }
                        )}
                    />
                </View>
        );
    }
}

class ListItem extends React.Component{

    shouldComponentUpdate(nextProps, nextState){

        if(this.props.item.name === nextProps.item.name){
            return false;
        }

        return true;
    }

    render(){

        let item = this.props.item;

        return(
            <View
                style={{height:getCommonPixel(80),
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:getCommonPixel(8),
                    marginTop:getCommonPixel(10),
                    borderWidth:getCommonPixel(2),
                    marginHorizontal:getCommonPixel(10)
                }}>
                <Text style={{fontSize:20}}>{item.name}</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: getCommonPixel(40),
        alignItems:'center',
        justifyContent:'center'
    },
    container1:{
        flex: 1,
        marginTop: getCommonPixel(40)
    },
    loadingWrap:{
        width:getCommonPixel(60),
        height:getCommonPixel(60)
    }
});