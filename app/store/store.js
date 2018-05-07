/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 创建Store，整合Provider
 * Created by CoderR on 2018/5/2.
 */
'use strict';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';

let store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunk),
    window.devTools ? window.devTools() : f => f
));

export default store;