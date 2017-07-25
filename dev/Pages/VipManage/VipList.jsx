import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import {browserHistory } from 'react-router';
import { Tool, merged } from '../../Tool';
import List from '../../Components/VipManage/List';
import * as commonAction from '../../actions/common';
import * as userAction from '../../actions/user';

export  class VipList extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.actions.setMeun("vipManage");
        this.props.actions.getUserList();
    }

    render() {
            const {userList} = this.props;
            if(!userList){
                return null;
            }
            return (
                <div  className="vipList">
                    <div className="commonTop">
                        <p>会员管理>会员列表</p>
                    </div>
                    <List userList={userList}></List>
               </div>
            )

    }

}

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        userList:state.user.userList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,userAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(VipList);

