import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import * as productAction from '../../actions/product';
import { Tool, merged } from '../../Tool';
import List from '../../Components/product/list';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';


class ProjectDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var id = Tool.getQueryString(this.props.location.search,"id");
        this.props.actions.setMeun("project")
        this.props.actions.getProductDetail(id);
        this.props.actions.getProductRecord(id)
    }

    render() {

        const {productDetail,productRecord} = this.props;
        var tabsData = {
            className : 'modelTableOpear',
            defaultVal : 0,
            animate : true,
            callBack: function(index,title){ //切换后的回调函数
                console.log("tabs为：",index);
                console.log("title为：",title);
            }
        }

        return (
            <div className="projectDetail">
                <div className="commonTop">
                    <p>项目管理>项目列表>项目详情</p>
                </div>

                <div>
                    <Tabs {...tabsData}>
                        <div title="项目详情" className='communityList'>
                            <div className="detial">
                                <div className="pdetial">
                                    <div>项目来源</div>
                                    <div>{productDetail.exchange}</div>
                                </div>
                                <div className="pdetial">
                                    <div>项目编号</div>
                                    <div>{productDetail.pid}</div>
                                </div>
                                <div className="pdetial">
                                    <div>发布时间</div>
                                    <div>{productDetail.publishedDate}</div>
                                </div>
                                <div className="pdetial">
                                    <div>预期年化收益率</div>
                                    <div>{productDetail.annualizedYield}%</div>
                                </div>

                                <div className="pdetial">
                                    <div>期限</div>
                                    <div>{productDetail.term}月</div>
                                </div>

                                <div className="pdetial">
                                    <div>融资主体:</div>
                                    <div>{productDetail.entity}</div>
                                </div>

                                <div className="pdetial">
                                    <div>融资用途:</div>
                                    <div>{productDetail.purpose}</div>
                                </div>

                                <div className="pdetial">
                                    <div>还款方式:</div>
                                    <div>{productDetail.repayment}</div>
                                </div>


                                <div className="pdetial">
                                    <div>担保方式:</div>
                                    <div>{productDetail.guarantee}</div>
                                </div>

                                <div className="pdetial">
                                    <div>主体评级:</div>
                                    <div>{productDetail.rate}</div>
                                </div>
                            </div>

                            <div  className="content"  dangerouslySetInnerHTML={{__html: productDetail.details}}></div>
                        </div>

                        <div title="投资记录" className='communityList'>
                            <div className="record">
                                <div>武汉某国有企业厂房建设</div>
                                <table>
                                    <thead>
                                        <tr className="brder">
                                            <td>投资者</td>
                                            <td>投资金额</td>
                                            <td>投资时间</td>
                                            <td>还款时间</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        productRecord.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.company_name}</td>
                                                    <td>{item.amount}万</td>
                                                    <td>{item.investTime}</td>
                                                    <td>{item.repaymentTime}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </Tabs>
                </div>

            </div>
        );
    }

}

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        productDetail:state.product.productDetail,
        productRecord:state.product.productRecord
    }
}, (dispatch)=>{
    const allAction =Object.assign({},productAction,commonAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(ProjectDetail);