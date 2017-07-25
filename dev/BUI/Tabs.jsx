import './style.scss'
import React, { Component } from 'react'

export default class Tabs extends Component{
    constructor(props) {
        super(props);
        this.showCurrContent = this.showCurrContent.bind(this)
        this.state = {
            defaultVal : this.props.defaultVal
        }
    }

    callBack (index,name){
        if(this.props.callBack != undefined){
            this.props.callBack(index,name);
        }
    }


    showCurrContent(e){
        var index = e.currentTarget.dataset.index
        var name ="aaaaaa";
        this.setState({
            defaultVal : index
        });
        setTimeout(function(){
            //点击后的回调
            this.callBack(index,name);
        }.bind(this),0);
    }

    theader(){
         var arr = []
        this.props.children.map(function(elem,index) {
            arr.push(<li onClick={this.showCurrContent}  data-index={index} className={index==this.state.defaultVal?'mt-tabs-active':''} key={index}><a>{elem.props.title}</a> </li>)
        }.bind(this))

        return arr
    }
    tbody(){
        var arr = [];
        this.props.children.map(function(elem,index) {
            arr.push(<div className={index==this.state.defaultVal?'':'content-hidden'} key={index}>{elem} </div>)
        }.bind(this))

        return arr
    }

    render() {
        var animate = ' mt-tabs-animate';
        if(!this.props.animate){
            animate="";
        }
        return(
            <div className={"myTabs " + this.props.className} >
                <ul className="myTabs-header">
                    {this.theader()}
                </ul>
                <div className={"myTabs-content" +animate}>
                    {this.tbody()}
                </div>
            </div>
        )
    }
}
