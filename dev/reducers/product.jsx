import * as actionConstant from '../constants/actionConstant';

/**
 * Created by Administrator on 2017/2/14.
 */
// 初始化状态
let initTestList = {
    productList:[],
    productDetail:{},
    productRecord:[]
}

export default function htmlRes(state = initTestList, action) {
    switch (action.type) {
        case actionConstant.GET_PRODUCT_LIST:
            return Object.assign({}, state, {
                productList:action.productList
            });
        case actionConstant.GET_PRODUCT_DETAIL:
            return Object.assign({}, state, {
                productDetail:action.productDetail
            });
        case actionConstant.GET_PRODUCT_RECORD:
            return Object.assign({}, state, {
                productRecord:action.productRecord
            });
        default : return state;

    }
}