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
        this.add = this.add.bind(this)
    }

    add(){
        console.log(this)
    }




    render() {
        const {status} = this.props
       return (
           <table className="productList">
               <thead>
               <tr>
                   <th width="10">产品编号</th>
                   <th width="25%">产品名称</th>
                   <th width="8%">产品类型</th>
                   <th width="7%">融资金额</th>
                   <th width="10%">预期年化收益率</th>
                   <th width="8%">期限</th>
                   <th width="8%">评级</th>
                   <th width="10%">发布日期</th>
               </tr>
               </thead>


               <tbody>

               {
                   this.props.productList.map((item, key) => {
                       if(item.status!=status){
                           return;
                       }
                       return (
                           <tr key={key}>
                               <td width="10%" >{item.pid}</td>
                               <td width="25%" ><Link to={{pathname:`/projectDetail`,query:{id:item.pid}}}>{item.name}</Link></td>
                               <td width="10%">{item.type}</td>
                               <td width="7%" >{item.amount}万</td>
                               <td width="10%" >{item.annualizedYield}%</td>
                               <td width="7%" >{item.term}个月</td>
                               <td width="7%" >{item.rate}</td>
                               <td width="10%" >{item.publishedDate}</td>
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