import './../../Pages/SystemManage/style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';
import * as systemManageAction from '../../actions/systemManage';

export class EmployeeList extends Component {

    constructor(props) {
        super(props);
    }

    deleteEmployee(item){
        if(confirm("确认要删除？")){
            var _this = this;
            var p = new Promise(function(resolve, reject){
                _this.props.actions.deleteEmployee(item.uid,resolve)
            });
            p.then(function(res){
                _this.props.actions.getEmployeeList();
            });

        }
    }

    editorFn(item){
        this.props.actions.setCurrEmployee(item);
        this.props.actions.setMask(true)
        this.props.actions.setShowAddEmployee(true);
    }



    render() {
        const {employeeList} = this.props;
        return (
            <div className="EmployeeList">
                <table className="commonTable">
                    <thead>
                    <tr>
                        <th width="13%">姓名</th>
                        <th width="13%">登入名</th>
                        <th width="13%">手机号码</th>
                        <th width="13%">权限</th>
                        <th width="13%">注册时间</th>
                        <th width="13%">上次登入时间</th>
                        <th width="13%">操作</th>
                    </tr>
                    </thead>


                    <tbody>

                    {
                        employeeList.map((item, key) => {
                            return (
                                <tr key={key}>
                                        <td width="13%">{item.name}</td>
                                        <td width="13%">{item.account}</td>
                                        <td width="13%">{item.mobile}</td>
                                        <td width="13%">{item.powerName}</td>
                                        <td width="13%">{item.registerTime}</td>
                                        <td width="13%">{item.lastLoginTime}</td>
                                        <td width="13%"  ><a onClick={this.editorFn.bind(this,item)}>编辑</a>&nbsp;&nbsp;<a onClick={this.deleteEmployee.bind(this,item)}>删除</a></td>
                                </tr>
                            )
                        })
                    }


                    </tbody>

                </table>
            </div>



        );
    }
};


export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,systemManageAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(EmployeeList);