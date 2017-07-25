import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Tool, merged } from '../../Tool';
import Tabs from '../../BUI/Tabs.jsx';
import * as commonAction from '../../actions/common';

export class UserStatistics extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.setMeun("statistics");
    }

    dealDate(i){
        var data=[[2,1,5,3,8,4,5,1,9,10,15,19],[2,5,7,3,9,4,3,1,1,10,2,4],[2,4,5,3,2,4,5,6,9,10,0,1],[2,4,5,3,1,4,5,1,5,10,18,6],[8,15,18,22,26,29,38,52,65,75,85,90]];
        var  option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['','']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 个'
                }
            },
            series: [
                {
                    name:'当前',
                    type:'line',
                    data:data[i],
                    markPoint: {
                        data: [
                            {type: 'max', name: '当前'},
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }

            ]
        };
        return option;
    }

    componentDidMount(){
        var user1 = echarts.init(document.getElementById('user1'));
        var user2 = echarts.init(document.getElementById('user2'));
        var user3 = echarts.init(document.getElementById('user3'));
        var user4 = echarts.init(document.getElementById('user4'));
        var user5 = echarts.init(document.getElementById('user5'));

        user1.setOption(this.dealDate(0));
        user2.setOption(this.dealDate(1));
        user3.setOption(this.dealDate(2));
        user4.setOption(this.dealDate(3));
        user5.setOption(this.dealDate(4));
    }


    render() {
        var tabsData = {
            className : 'modelTableOpear',
            defaultVal : 0,
            animate : true,
            callBack: function(index,title){ //切换后的回调函数

            }
        }

        var style = {width: "1000px",height:"400px"}
        return (
            <div className="Statistics">
                <div className="timeBtn">
                    <a>日</a><a>周</a><a>月</a><a>季</a><a>半年</a><a>年</a>
                </div>
                <Tabs {...tabsData}>
                    <div title="总项目" >
                        <div id="user1" style={style}></div>
                    </div>
                    <div title="新增项目" >
                        <div id="user2" style={style}></div>
                    </div>
                    <div title="成交项目" >
                        <div id="user3" style={style}></div>
                    </div>
                    <div title="总金额" >
                        <div id="user4" style={style}></div>
                    </div>
                    <div title="成交金额" >
                        <div id="user5" style={style}></div>
                    </div>
                </Tabs>
            </div>

        );
    }
};





export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
    }
}, (dispatch)=>{
    const allAction =Object.assign({},commonAction);
    return {
        actions: bindActionCreators(allAction, dispatch)
    }
})(UserStatistics);