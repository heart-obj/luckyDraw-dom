import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
class luckIndex extends Component {
  constructor (props) {
    super (props);
    this.state = {
      wheelGoods: [], // 大转盘物品列表
      btnEnable: true // 反正用户频繁点击
    };
  }
  // 在渲染前调用,在客户端也在服务端(用于数据初始化)。
  componentWillMount () {
    
  }
  render() {
    return (
      <div> textInComponent </div>
    );
  }
}
export default luckIndex