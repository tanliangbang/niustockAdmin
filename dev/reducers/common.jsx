import * as actionConstant from '../constants/actionConstant';
//定义方法名称，取个名称，action 内使用一个字符串类型的 type 字段来表示将要执行的动作
//初始化数据
const initialState = {
    menu:"index",
    mask:false
}

export default function user(state = initialState, action) {

    switch(action.type) {
        case actionConstant.SET_MENU:
            return Object.assign({}, state, {
                menu:action.menu
            });
        case actionConstant.SET_MASK:
            return Object.assign({}, state, {
                mask:action.mask
            });
        default : return state;
    }
}
