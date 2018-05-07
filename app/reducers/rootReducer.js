/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 组合所有的Reducer
 * Created by CoderR on 2018/5/2.
 */
'use strict';

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import mineReducer from './mineReducer';
import personalReducer from './personalReducer';

const rootReducer = combineReducers({
    loginState: loginReducer,
    mineState: mineReducer,
    personalState: personalReducer,
});

export default rootReducer;