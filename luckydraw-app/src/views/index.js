import React, { Component } from 'react';
import LuckyDraw from './diskLuckydraw/index'
import LuckyDraw2 from './luckydraw2/index'
import { loadGetGoods } from '../api/api';
import './index.css'
class IndexView extends Component {
  constructor (props) {
    super (props)
    this.state = {
      id: 1,
      goodsList: [],
      shop_id: null,
      isLoding: false
    }
  }
  // 组件挂载到DOM前调用
  componentWillMount () {
    this.setState({
      id: this.getQueryVariable('id')
    })
    this.getDatalist()
  }
  // 组件渲染后调用
  componentDidMount () {}
  getDatalist () {
    const _this = this
    let token = _this.getQueryVariable('token')
    let lng = _this.getQueryVariable('lng')
    let lat =  _this.getQueryVariable('lat')
    loadGetGoods({
      lng: lng,
      lat: lat,
      type: this.getQueryVariable('id')
    }, token).then(res => {
      _this.setState({
        goodsList: res.data.data.list,
        isLoding: true,
        shop_id: res.data.data.shop_id
      })
    })
  }
  getParams (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  }
  handelChange (event) {
    console.log(event.target.value);
    this.setState({type: event.target.value})
  }
  getQueryVariable (variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
      let pair = vars[i].split("=");
      if(pair[0] === variable){return pair[1];}
    }
    return(false);
  }
  render () {
    console.log(this.state.goodsList)
    if (this.state.isLoding && this.state.goodsList) {
      return (
        <div style={{width: '100%',height: '100%',background:'#fff'}}>
          {(this.state.id - 0 ) === 1 ? (<LuckyDraw2 goodsList={this.state.goodsList} shop_id={this.state.shop_id}></LuckyDraw2>) : (<LuckyDraw goodsList={this.state.goodsList} shop_id={this.state.shop_id}></LuckyDraw>)}
        </div>
      )
    }else {
      return (
        <div style={{width: '100%',height: '100%',background:'#fff'}}>
          <div className='no-Content-box'></div>
        </div>
      )
    }
    
  }
}
export default IndexView
