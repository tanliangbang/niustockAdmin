/**
 * 自定义内容的弹窗插件
 * @author : BANGBANG
 * @date : 2017-2-21
 */
import './style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { render } from 'react-dom'


export class Mask extends Component{
    constructor(props) {
        super(props);
    }



    render() {
       return(
           <div  className={this.props.mask?"b-maskDiv":"b-maskDiv none"}></div>
       )
    }
}

export default  connect((state)=>{
    return {
        path: state.routing.locationBeforeTransitions.pathname,
        mask: state.common.mask
    }
}, (dispatch)=>{
    return {}
})(Mask);