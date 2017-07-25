import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm,Field} from 'redux-form';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';
import * as systemManageAction from '../../actions/systemManage';


export class RoleManage extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            currRole:{id:0}
        }
    }


    componentWillMount() {
        this.props.actions.setMeun("systemManage")
        this.props.actions.getPowerList();
    }
    submit(data){
        var _this = this;
        var p = new Promise(function(resolve, reject){
            _this.props.actions.addRole(data,resolve);
        });
        p.then(function(res){
            _this.props.actions.getPowerList();
            if(!data.id){
                _this.props.reset()
            }
        });
    }

    analysisPower(item){
        if(!item.powers){
            return item;
        }
        var powers = JSON.parse(item.powers);
        for(var currRole in powers){
            var currPower = powers[currRole]
            console.log(currPower)
            for(var i=0;i<currPower.length;i++){
                item[currPower[i]] = true;
            }
        }
        delete item.powers;
        return item;
    }

    selectCurrRole(item){

        item = this.analysisPower(item)
        this.props.initialize(item)
        this.setState({
            currRole:item,
        })
        this.props.reset();
    }

    addUser(){
        this.props.reset();
        this.props.initialize(null)
        this.setState({
            currRole:{id:0}
        })
    }



    render() {
        const { handleSubmit,submit,powerList } = this.props;
        const {currRole,powers} = this.state;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
            <div className="RoleManage">

                <div>
                   <div className="topTitle">
                       角色列表
                   </div>
                   <div className="roleList">

                       {
                           powerList.map((item, key) => {
                               return (
                                  <a key={key} className={currRole.id==item.id?"active":""} onClick={this.selectCurrRole.bind(this,item)}>{item.powerName}</a>
                               )
                           })
                       }
                       <a className={currRole.id==0?"active":""} onClick={this.addUser.bind(this)}>+新增角色</a>
                   </div>
               </div>
                <div>
                        <div className="topTitle">
                            角色详情  <button className="saveRole">保存</button>
                        </div>
                        <div className="roleDetial">
                            <div className="addRole">
                                <p>名称</p>
                                <Field type="text" component="input"   name="powerName"/>
                                <p>备注</p>
                                <Field type="textarea" component="textarea" name="powerDetails" ></Field>
                            </div>
                            <p>权限</p>
                            <div className="powerList">
                                 <p>会员相关</p>

                                  <ul>
                                      <li><Field name="user-List"    type="checkbox" component="input" /> 会员列表</li>
                                      <li><Field name="user-Review"  type="checkbox" component="input" /> 会员审核</li>
                                      <li><Field name="user-Delete"  type="checkbox" component="input" /> 会员删除</li>
                                  </ul>
                            </div>

                            <div className="powerList">
                                <p>项目相关</p>
                                <ul>
                                    <li><Field name="project-List"  type="checkbox" component="input" /> 项目列表</li>
                                    <li><Field name="project-Add"  type="checkbox" component="input" /> 项目添加</li>
                                    <li><Field name="project-Delete"  type="checkbox" component="input" /> 项目删除</li>
                                </ul>
                            </div>

                            <div className="powerList">
                                <p>数据统计</p>
                                <ul>
                                    <li><Field name="statistics-projectList"  type="checkbox" component="input" />项目统计</li>
                                    <li><Field name="statistics-userList"  type="checkbox" component="input" />用户统计</li>
                                </ul>
                            </div>


                            <div className="powerList">
                                <p>系统管理</p>
                                <ul>
                                    <li><Field name="systemManage-employeeList"  type="checkbox" component="input" />员工列表</li>
                                    <li><Field name="systemManage-employeeAdd"  type="checkbox" component="input" />添加员工</li>
                                    <li><Field name="systemManage-roleManage"  type="checkbox" component="input" />角色权限</li>
                                </ul>
                            </div>

                        </div>

                </div>
                <div>
                    <div className="topTitle">
                        成员列表
                    </div>


                       <table className="roleUserList">
                           <thead>
                           <tr>
                               <th>姓名</th>
                               <th>登入名</th>
                           </tr>
                           </thead>
                           <tbody>
                              <tr>
                                  <td>李嘉诚</td>
                                  <td>Lijiacheng</td>
                              </tr>
                              <tr>
                                  <td>李嘉诚</td>
                                  <td>Lijiacheng</td>
                              </tr>
                              <tr>
                                  <td>李嘉诚</td>
                                  <td>Lijiacheng</td>
                              </tr>
                           </tbody>
                       </table>
                    </div>

            </div>
            </form>

        );
    }
};





export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        powerList:state.systemManage.powerList,
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction,systemManageAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(reduxForm({
    form:'addRoleForm',
})(RoleManage))