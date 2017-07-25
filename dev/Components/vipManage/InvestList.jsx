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
        return (
            <table className="productList">
                <thead>
                <tr>
                    <th width="10">产品编号</th>
                    <th width="25%">产品名称</th>
                    <th width="8%">产品类型</th>
                    <th width="7%">投资金额</th>
                    <th width="8%">预期年化收益率</th>
                    <th width="8%">期限</th>
                    <th width="8%">状态</th>
                    <th width="12%">投资日期</th>
                </tr>
                </thead>


                <tbody>

                {
                    this.props.productList.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td width="10%" >{item.pid}</td>
                                <td width="25%" >{item.name}</td>
                                <td width="10%">{item.type}</td>
                                <td width="7%" >{item.amount}万</td>
                                <td width="8%" >{item.annualizedYield}%</td>
                                <td width="7%" >{item.term}个月</td>
                                <td width="7%" >{item.status}</td>
                                <td width="12%" >{item.investTime}</td>
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