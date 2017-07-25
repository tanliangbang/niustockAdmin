import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import * as productAction from '../../actions/product';
import List from '../../Components/VipManage/InvestList';

export class InvestState extends Component {


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.getProductList();
    }


    render() {
        const {userInvestList} = this.props;
        console.log(userInvestList)
        if(!userInvestList){
            return null;
        }

        return (
            <div className="investState">
                <div>
                    <div>
                        <p>16</p>
                        <p>共投资项目</p>
                    </div>

                    <div>
                        <p>4500</p>
                        <p>共投资资金（万元）</p>
                    </div>
                    <br className="clear"/>
                </div>

                <div className="investList">
                    <p>投资情况列表</p>
                    <List productList={userInvestList}></List>
                </div>


            </div>
        )

    }
}


export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        userInvestList:state.user.userInvestList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},productAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(InvestState);