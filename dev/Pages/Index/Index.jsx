import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import * as productAction from '../../actions/product';
import { Tool, merged } from '../../Tool';
import List from '../../Components/product/list';
import * as commonAction from '../../actions/common';


class Index extends Component {

    componentWillMount() {
        this.props.actions.getProductList();
        this.props.actions.setMeun("index")
    }

  render() {
      const {productList} = this.props;

      return (
        <div className="index">
            <div className="pbasicTacts">

                <div>
                    <p>56</p>
                    <p>新增项目</p>
                </div>
                <div>
                    <p>5</p>
                    <p>新增会员</p>
                </div>
                <div>
                    <p>5</p>
                    <p>今日成交项目</p>
                </div>
                <div>
                    <p>56</p>
                    <p>新增项目</p>
                </div>
                <br className="clear"/>

            </div>

            <div className="newProject">
                <p>最新项目</p>
                <List productList={productList} status="0"></List>
            </div>


            <div className="newProject">
                <p>最近成交项目</p>
                <List productList={productList} status="1"></List>
            </div>
        </div>
    );
  }

}

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        productList:state.product.productList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,productAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(Index);