import React, { Component } from 'react';
import LuckyDraw from './diskLuckydraw/index'
import LuckyDraw2 from './luckydraw2/index'
class IndexView extends Component {
  constructor (props) {
    super (props)
    this.state = {
      type: 1
    }
  }
  componentDidMount () {
    console.log(this.getParams('id'))
    this.setState({
      type: 1
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
  render () {
    let childrenDom = <LuckyDraw></LuckyDraw>;
    if ((this.state.type - 0 ) === 1 ) {
      childrenDom = <LuckyDraw></LuckyDraw>;
    } else {
      childrenDom = <LuckyDraw2></LuckyDraw2>;
    }
    return (
      <div style={{width: '100%',height: '100%'}}>
        {childrenDom}
      </div>
    )
  }
}
export default IndexView