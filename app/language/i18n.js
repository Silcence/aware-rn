/**
 * Copyright © 2018年 AWARE. All rights reserved.
 *
 * 引用不同语言
 * Created by CoderR on 2018/5/2.
 */
'use strict';

import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

I18n.defaultLocale = 'zh';
I18n.fallbacks = true;
I18n.translations = {
    en,
    zh,
};

export default I18n;