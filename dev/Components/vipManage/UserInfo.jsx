import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import * as productAction from '../../actions/product';

export class UserInfo extends Component {


    constructor(props) {
        super(props);
    }




    render() {
        const {userDetail} = this.props
        console.log(userDetail)
        return (
           <div className="userAuth">
               <div>
                   <div className="userInfoLine">
                       <label>企业全称:</label>
                       {userDetail.company_name}
                   </div>
                   <div className="userInfoLine">
                       <label>组织机构代码:</label>
                       {userDetail.organization_code}
                   </div>

                   <div className="userInfoLine">
                       <label>工商执照注册码:</label>
                       {userDetail.registration_code}
                   </div>


                   <div className="userInfoLine">
                       <label>法人代表:</label>
                       {userDetail.corporate}
                   </div>


                   <div className="userInfoLine">
                       <label>经营范围:</label>
                       {userDetail.business_scope}
                   </div>

                   <div className="userInfoLine">
                       <label>企业规模:</label>
                       {userDetail.scale}
                   </div>
               </div>


               <div>
                   <div className="userInfoLine">
                       <label>企业开户名称:</label>
                       {userDetail.company_full_open_name}
                   </div>
                   <div className="userInfoLine">
                       <label>开户银行:</label>
                       {userDetail.bank_name}
                   </div>

                   <div className="userInfoLine">
                       <label>银行账号:</label>
                       {userDetail.bank_account}
                   </div>
               </div>



               <div>
                   <p>经办人信息</p>
                   <div className="userInfoLine">
                       <label>姓名:</label>
                       {userDetail.realname}
                   </div>
                   <div className="userInfoLine">
                       <label>职位部门:</label>
                       {userDetail.position_department}
                   </div>

                   <div className="userInfoLine">
                       <label>手机号:</label>
                       {userDetail.telephone}
                   </div>

                   <div className="userInfoLine">
                       <label>座机:</label>
                       {userDetail.telephone}
                   </div>

                   <div className="userInfoLine">
                       <label>电子邮箱:</label>
                       {userDetail.email}
                   </div>
               </div>

               <div>
                   <p>文件上传</p>
                   <div className="userInfoLine">
                       <label>营业执照:</label>
                       <a href={userDetail.business_license} target="view_window">{userDetail.business_license}</a>
                   </div>
                   <div className="userInfoLine">
                       <label>身份证正面:</label>
                       <a href={userDetail.idcard_front} target="view_window">{userDetail.idcard_front}</a>
                   </div>

                   <div className="userInfoLine">
                       <label>身份证反面:</label>
                       <a href={userDetail.idcard_back} target="view_window">{userDetail.idcard_back}</a>
                   </div>

                   <div className="userInfoLine">
                       <label>申请书:</label>
                       <a href={userDetail.application} target="view_window">{userDetail.application}</a>
                   </div>

               </div>


               <div className="passBtn">通&nbsp;&nbsp;过</div>
               <div className="passBtn">不通过</div>
           </div>
        )

    }
}

export default  UserInfo;