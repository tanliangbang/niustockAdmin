import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import * as productAction from '../../actions/product';

export class List extends Component {


    constructor(props) {
        super(props);
    }




    render() {
        const {userList} = this.props;
        console.log(userList)
       return (
           <table className="vipListtable">
               <thead>
               <tr>
                   <th width="10">会员编号</th>
                   <th width="25%">会员名称</th>
                   <th width="8%">会员账号</th>
                   <th width="7%">经办人</th>
                   <th width="10%">经办人手机</th>
                   <th width="7%">上次登入时间</th>
                   <th width="10%">认证状态</th>
                   <th width="14%">操作</th>
                   <th width="8%">地址</th>
               </tr>
               </thead>


               <tbody>

               {
                   userList.map((item, key) => {
                       return (
                           <tr key={key}>
                                   <td width="10%" >{item.uid}</td>
                                   <td width="25%" >{item.company_name}</td>
                                   <td width="10%">{item.username}</td>
                                   <td width="7%" >{item.realname}</td>
                                   <td width="10%" >{item.mobile}</td>
                                   <td width="7%" >{item.registerTime} </td>
                                   <td width="10%" >{item.reviewStatus}</td>
                                   <td width="14%" ><Link to={{pathname:`/vipIndex`,query:{id:item.uid}}}>审核</Link>&nbsp;&nbsp;<Link to={{pathname:`/vipIndex`,query:{id:item.uid}}}>编辑</Link></td>
                                   <td width="8%" >{item.username}</td>
                           </tr>
                       )
                   })
               }







               </tbody>

           </table>
       )

    }
}

export default  List;