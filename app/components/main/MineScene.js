/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 我的
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

import {getCommonPixel,getFontPixel,getTopDistance} from '../../utils/PixelUtil';
import * as FontAndColor from '../../constant/FontAndColor';

import { connect } from 'react-redux';
import {getProfile} from "../../actions/mine";

const avatar = require('../../images/avatar.png');
const reward = require('../../images/reward.png');
const about = require('../../images/about.png');
const contract = require('../../images/contract.png');
const more = require('../../images/more.png');

class MineScene extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
       this.props.getProfile();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleWrap}>
                    <View style={styles.nameWrap}>
                        <ImageBackground style={styles.avatarImg} source={avatar}>
                            <Image style={styles.avatarImg} source={this.props.avatar}/>
                        </ImageBackground>
                        <TouchableOpacity
                            onPress={()=>{this.props.toLogin();}}
                            style={styles.loginWrap}>
                            <Text style={styles.loginText}>{this.props.name}</Text>
                        </TouchableOpacity>
                        <View style={{flex:1}} />
                        {
                            this.props.isLogin &&
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>{this.props.toNextPage('PersonalScene',{
                                    avatar:this.props.avatar,
                                    name:this.props.name
                                });}}
                            >
                                <Image style={styles.editImg} source={more}/>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.countWrap}>
                        <View style={styles.infoWrap}>
                            <Text style={styles.infoNum}>{this.props.projects}</Text>
                            <Text style={styles.infoTitle}>{'项目'}</Text>
                        </View>
                        <TouchableOpacity

                            style={styles.infoWrap}>
                            <Text style={styles.infoNum}>{this.props.articles}</Text>
                            <Text style={styles.infoTitle}>{'文章'}</Text>
                        </TouchableOpacity>
                        <View style={styles.infoWrap}>
                            <Text style={styles.infoNum}>{this.props.likes}</Text>
                            <Text style={styles.infoTitle}>{'点赞'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.moneyWrap}>
                    <View style={styles.balanceWrap}>
                        <Text style={styles.balanceTitle}>{'余额'}</Text>
                        <View style={styles.walletWrap}>
                            <Text style={styles.balanceTitle}>{this.props.balance}</Text>
                            {
                                this.props.isLogin &&
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={()=>{}}
                                >
                                    <Image style={styles.walletImg} source={more}/>
                                </TouchableOpacity>
                            }
                        </View>

                    </View>
                    <View style={styles.inviteWrap}>
                        <View style={styles.leftWrap}>
                            <Text style={styles.leftTitleText}>{'邀请送币'}</Text>
                            <Text style={styles.leftContentText}>{'邀请好友一起可获awr奖励'}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.inviteBtn}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.btnText}>{'立即邀请'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rewardWrap}>
                    <Image style={styles.imgWrap} source={reward} />
                    <View style={styles.rewardRightWrap}>
                        <Text>{'激励机制'}</Text>
                        <Image source={more} style={styles.moreImg}/>
                    </View>
                </View>
                <View style={styles.aboutWrap}>
                    <Image style={styles.imgWrap} source={about} />
                    <View style={styles.rewardRightWrap}>
                        <Text>{'关于我们'}</Text>
                        <Image source={more} style={styles.moreImg}/>
                    </View>
                </View>
                <View style={styles.aboutWrap}>
                    <Image style={styles.imgWrap} source={contract} />
                    <View style={styles.rewardRightWrap}>
                        <Text>{'联系我们'}</Text>
                        <Image source={more} style={styles.moreImg}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:FontAndColor.BG_COLOR,
    },
    titleWrap:{
        backgroundColor:FontAndColor.WHITE,
        paddingTop: getTopDistance(40),
    },
    nameWrap:{
        flexDirection:'row',
        alignItems:'center',
        height:getCommonPixel(140),
        marginTop:getCommonPixel(53),
        paddingHorizontal: getCommonPixel(32),
    },
    avatarImg:{
        height:getCommonPixel(140),
        width:getCommonPixel(140),
        borderRadius:getCommonPixel(140),
        overflow:'hidden'
    },
    editImg:{
        height:getCommonPixel(54),
        width:getCommonPixel(54),
    },
    loginWrap:{
        marginLeft: getCommonPixel(40),
    },
    loginText:{
        fontSize: getFontPixel(40),
        color: FontAndColor.FONT_COLOR2
    },

    countWrap:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal: getCommonPixel(88),
        justifyContent:'space-between',
        marginTop: getCommonPixel(50),
        marginBottom: getCommonPixel(30)
    },
    infoWrap:{
        alignItems:'center'
    },
    infoNum:{
        fontSize:getFontPixel(32),
        color:FontAndColor.FONT_COLOR2
    },
    infoTitle:{
        marginTop:getCommonPixel(10),
        fontSize:getFontPixel(24),
        color:FontAndColor.FONT_COLOR3
    },

    moneyWrap:{
        marginTop: getCommonPixel(30),
        backgroundColor: FontAndColor.WHITE,
        paddingHorizontal: getCommonPixel(32)
    },
    balanceWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height:getCommonPixel(142),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR
    },
    walletWrap:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    balanceTitle:{
        fontSize:getFontPixel(48),
        color:FontAndColor.FONT_COLOR2
    },
    walletImg:{
        height: getCommonPixel(44),
        width: getCommonPixel(44),
        marginLeft: getCommonPixel(16)
    },

    inviteWrap:{
        height: getCommonPixel(182),
        flexDirection:'row',
    },
    leftWrap:{
        flex:1,
        marginTop: getCommonPixel(32),
    },
    leftTitleText:{
        fontSize:getCommonPixel(32),
        color:FontAndColor.FONT_COLOR2
    },
    leftContentText:{
        fontSize:getCommonPixel(24),
        color:FontAndColor.FONT_COLOR2,
        marginTop:getCommonPixel(36)
    },
    inviteBtn:{
        height:getCommonPixel(50),
        width:getCommonPixel(164),
        borderRadius:getCommonPixel(30),
        justifyContent:'center',
        alignItems:'center',
        marginTop:getCommonPixel(86),
        backgroundColor:FontAndColor.DARK_YELLOW
    },
    btnText:{
        color:FontAndColor.WHITE,
        fontSize:getFontPixel(24)
    },

    rewardWrap:{
        backgroundColor:FontAndColor.WHITE,
        marginTop:getCommonPixel(30),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:getCommonPixel(32),
        height:getCommonPixel(110)
    },
    imgWrap:{
        height:getCommonPixel(46),
        width:getCommonPixel(46),
    },
    rewardRightWrap:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:getCommonPixel(32),
        borderBottomWidth:getCommonPixel(2),
        borderBottomColor:FontAndColor.BORDER_COLOR,
        marginLeft:getCommonPixel(16),
        height:getCommonPixel(110)
    },
    rewardText:{
        fontSize: getFontPixel(32),
        color: FontAndColor.FONT_COLOR2
    },
    moreImg:{
        height:getCommonPixel(44),
        width:getCommonPixel(44)
    },
    aboutWrap:{
        backgroundColor:FontAndColor.WHITE,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:getCommonPixel(32),
        height:getCommonPixel(110)
    },

});


const mapStateToProps = state => ({
    name: state.mineState.name,
    avatar: state.mineState.avatar,
    projects: state.mineState.projects,
    likes: state.mineState.likes,
    articles: state.mineState.articles,
    balance: state.mineState.balance,
    isLogin: state.mineState.isLogin,
});

const mapDispatchToProps = dispatch => ({
    getProfile: ()=> dispatch(getProfile())
});

export default connect(mapStateToProps,mapDispatchToProps)(MineScene);