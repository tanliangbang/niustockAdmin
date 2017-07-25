import * as actionConstant from '../constants/actionConstant';

/**
 * Created by Administrator on 2017/2/14.
 */
// 初始化状态
let initData = {
    powerList:[],
    employeeList:[],
    currEmployee:null,
    showAddEmployee:false
}

export default function htmlRes(state = initData, action) {
    switch (action.type) {
        case actionConstant.POWERLIST:
            return Object.assign({}, state, {
                powerList:action.powerList
            });
        case actionConstant.SHOWADDEMPLOYEE:
            return Object.assign({}, state, {
                showAddEmployee:action.showAddEmployee
            });
        case actionConstant.EMPLOYELIST:
            return Object.assign({}, state, {
                employeeList:action.employeeList
            });
        case actionConstant.CURREMPLOYEE:
            return Object.assign({}, state, {
                currEmployee:action.currEmployee
            });

        default : return state;

    }
}