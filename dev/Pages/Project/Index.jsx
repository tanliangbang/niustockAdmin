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


export class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exchange:"",
            type:"",
            annualizedYield:"",
            term:"",
            rate:""
        }
    }

    componentWillMount() {
        this.props.actions.setMeun("project")
        this.props.actions.getProductList();
    }

    addExchange(str){
        if(!str){
            $("input[name='exchange']").attr('checked',false);
            str = ""
        }
        var currDate = this.state;
        currDate.exchange = str;
        this.props.actions.getSelectDate(currDate);
        this.setState({
            exchange:str
        })

    }

    addExchangeType(str){
        if(!str){
            $("input[name='type']").attr('checked',false);
            str = ""
        }
        var currDate = this.state;
        currDate.type = str;
        this.props.actions.getSelectDate(currDate);
        this.setState({
            type:str
        })

    }

    addAnnualizedYield(str){
        if(!str){
            $("input[name='annualizedYield']").attr('checked',false);
            str = ""
        }
        var currDate = this.state;
        currDate.annualizedYield = str;
        this.props.actions.getSelectDate(currDate);
        this.setState({
            annualizedYield:str
        })
    }

    addTerm(str){
        if(!str){
            $("input[name='term']").attr('checked',false);
            str = ""
        }
        var currDate = this.state;
        currDate.term = str;
        this.props.actions.getSelectDate(currDate);
        this.setState({
            term:str
        })
    }

    addRate(str){
        if(!str){
            $("input[name='rate']").attr('checked',false);
            str = ""
        }
        var currDate = this.state;
        currDate.rate = str;
        this.props.actions.getSelectDate(currDate);
        this.setState({
            rate:str
        })
    }





    render() {
        const {productList,handleSubmit} = this.props;
        if(!productList){
            return null;
        }

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
            <div className="product" >
                <div className="commonTop">
                    <p>项目管理>项目列表</p>
                </div>
                <div className="filterSelect">

                    <ul>
                        <li>
                            <div>
                                <span>交易所</span><span  onClick={this.addExchange.bind(this,false)} className={this.state.exchange!=""?"noSelected":"selected"}>不限</span>
                            </div>
                            <div>
                                    <span>
                                        <input onClick={this.addExchange.bind(this,'武汉金融资产交易所')}   name="exchange" value="武汉金融资产交易所"  type="radio"   />武汉金融资产交易所
                                    </span>

                                     <span>
                                         <input onClick={this.addExchange.bind(this,'重庆金融资产交易所')}  name="exchange" value="重庆金融资产交易所"  type="radio"   />重庆金融资产交易所
                                    </span>
                                     <span>
                                         <input onClick={this.addExchange.bind(this,'广州金融资产交易中心')}  name="exchange" value="广州金融资产交易中心"  type="radio"   />广州金融资产交易中心
                                    </span>

                                     <span>

                                         <input onClick={this.addExchange.bind(this,'南京金融资产交易中心')}  name="exchange" value="南京金融资产交易中心"  type="radio"   />南京金融资产交易中心
                                    </span>

                                     <span>
                                         <input onClick={this.addExchange.bind(this,'天津金融资产交易所')}  name="exchange" value="天津金融资产交易所"  type="radio"   />天津金融资产交易所
                                    </span>


                                     <span>
                                         <input onClick={this.addExchange.bind(this,'大连金融资产交易所')}  name="exchange" value="大连金融资产交易所"  type="radio"   />大连金融资产交易所
                                    </span>


                                     <span>
                                         <input onClick={this.addExchange.bind(this,'武汉股权托管交易中心')}  name="exchange" value="武汉股权托管交易中心"  type="radio"   />武汉股权托管交易中心
                                    </span>


                                     <span>
                                         <input onClick={this.addExchange.bind(this,'其他')}  name="exchange" value="其他"  type="radio"   />其他
                                    </span>

                            </div>
                        </li>
                        <li>
                            <div>
                                <span>产品类型</span><span onClick={this.addExchangeType.bind(this,false)} className={this.state.type!=""?"noSelected":"selected"}>不限</span>
                            </div>
                            <div>
                                <span><input onClick={this.addExchangeType.bind(this,'基础资产交易类')}   name="type" value="基础资产交易类"  type="radio"   />基础资产交易类</span>
                                <span><input onClick={this.addExchangeType.bind(this,'权益资产交易类')}  name="type" value="权益资产交易类"  type="radio"   />权益资产交易类</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>预期年化收益</span><span  onClick={this.addAnnualizedYield.bind(this,false)} className={this.state.annualizedYield!=""?"noSelected":"selected"}>不限</span>
                            </div>
                            <div>
                                <span><input onClick={this.addAnnualizedYield.bind(this,'0-3')}  name="annualizedYield" value="0-3"  type="radio"   />3%</span>
                                <span><input onClick={this.addAnnualizedYield.bind(this,'3-4')}  name="annualizedYield" value="3-4"  type="radio"   />3%-4%</span>
                                <span><input onClick={this.addAnnualizedYield.bind(this,'4-5')}  name="annualizedYield" value="4-5"  type="radio"   />4%-5%</span>
                                <span><input onClick={this.addAnnualizedYield.bind(this,'5-6')}  name="annualizedYield" value="5-6"  type="radio"   />5%-6%</span>
                                <span><input onClick={this.addAnnualizedYield.bind(this,'6-100')}  name="annualizedYield" value="6"  type="radio"   />6%</span>
                                     <span className="selfInput">
                                          <input/><i>—</i><input/>
                                          <button>确定</button>
                                     </span>

                            </div>

                        </li>

                        <li>
                            <div>
                                <span>期限</span><span onClick={this.addTerm.bind(this,false)} className={this.state.term!=""?"noSelected":"selected"}>不限</span>
                            </div>
                            <div>
                                <span><input onClick={this.addTerm.bind(this,'0-6')}  name="term" value="0-6"  type="radio"   />6个月</span>
                                <span><input onClick={this.addTerm.bind(this,'6-12')}  name="term" value="6-12"  type="radio"   />6-12个月</span>
                                <span><input onClick={this.addTerm.bind(this,'12-24')}  name="term" value="12-24"  type="radio"   />1-2年</span>
                                <span><input onClick={this.addTerm.bind(this,'24-36')}  name="term" value="24-36"  type="radio"   />2-3年</span>
                                <span><input onClick={this.addTerm.bind(this,'36-60')}  name="term" value="36-60"  type="radio"   />3-5年</span>
                            </div>

                        </li>


                        <li>
                            <div>
                                <span>评级</span><span onClick={this.addRate.bind(this,false)} className={this.state.rate!=""?"noSelected":"selected"}>不限</span>
                            </div>
                            <div>
                                <span><input onClick={this.addRate.bind(this,'AAA')}  name="rate" value="AAA"  type="radio"   />AAA</span>
                                <span><input onClick={this.addRate.bind(this,'AA+')}  name="rate" value="AA+"  type="radio"   />AA+</span>
                                <span><input onClick={this.addRate.bind(this,'AA')}  name="rate" value="AA"  type="radio"   />AA</span>
                                <span><input onClick={this.addRate.bind(this,'AA-')}  name="rate" value="AA-"  type="radio"   />AA-</span>
                                <span><input onClick={this.addRate.bind(this,'A+')}  name="rate" value="A+"  type="radio"   />A+</span>
                                <span><input onClick={this.addRate.bind(this,'A')}  name="rate" value="A"  type="radio"   />A</span>
                                <span><input onClick={this.addRate.bind(this,'A-')}  name="rate" value="A-"  type="radio"   />A-</span>
                                <span><input onClick={this.addRate.bind(this,'BBB+')}  name="rate" value="BBB+"  type="radio"   />BBB+</span>
                            </div>

                        </li>
                    </ul>
                </div>



                <div className="productList">

                    <Tabs {...tabsData}>
                        <div title="未成交项目" className='communityList'>
                            <div>
                                <List productList={productList} status="0"></List>
                            </div>
                        </div>
                        <div title="已成交项目" className='communityList'>
                             <List productList={productList} status="1"></List>
                        </div>

                    </Tabs>






                </div>













            </div>



        );
    }
};
//主

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        productList:state.product.productList
    }
}, (dispatch)=>{
    const allAction =Object.assign({},productAction,commonAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(Project);