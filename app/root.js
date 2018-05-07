/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 公共入口文件
 * Created by CoderR on 2018/4/26.
 */
'use strict';

import React from 'react';

import { Provider} from 'react-redux';
import App from './components/app';
import store from './store/store';

export default class root extends React.Component {

    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )

    }

}