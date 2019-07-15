import React, { Component } from 'react';
import { menu_random } from '../../api/api';
import './index.css'

class luckIndex extends Component {
  constructor (props) {
    super (props)
    console.log(props)
    this.state = {
      wheelGoods: props.goodsList, // 大转盘物品列表
      shop_id: props.shop_id,
      selectGoodsData: null, // 选中的商品
      btnEnable: true // 反正用户频繁点击
    };
  }
  // 在渲染前调用,在客户端也在服务端(用于数据初始化)。
  componentWillMount () {}
  componentDidMount () {
    if (this.state.wheelGoods) {
      this.setCanvas(this.state.wheelGoods.length)
    }
  }
  rnd = (n, m) => {
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
  }
  getPrize = (randomNum) => {
    clearTimeout(this.timer);
    if (this.state.btnEnable && this.state.wheelGoods) {
      // alert(window.action.login())
      this.setState({ btnEnable: false })
      //禁止用户连续点击
      this.animation((randomNum+1)* (360 / this.state.wheelGoods.length));
      setTimeout(() => {
        // 指定奖品的扇形添加动画
        let selectData = JSON.stringify(this.state.selectGoodsData).toString()
        console.log(selectData)
        if (this.getQueryVariable('type') === 'Android') {
          // 安卓调用
          window.action.showWindow(selectData);
        } else if (this.getQueryVariable('type') === 'IOS') {
          // 返回ios数据
          window.webkit.messageHandlers.payInfoJavascriptHandler.postMessage(selectData)
        }
      }, 6000);
    }
    this.timer = setTimeout(() => {
      this.setState({ btnEnable: true })
    }, 6000);
  }
  animation = (circle) => {
    //周围小球交换显示
    let loopTime = setInterval(() => {
        let loopEle = this.refs.loops.querySelectorAll('.loop');
        for (let i = 0; i < loopEle.length; i++) {
            if (/(dot1)/.test(loopEle[i].className)) {
                setTimeout(() => {
                    loopEle[i].className = 'loop dot2'
                }, 100);
            } else {
                loopEle[i].className = 'loop dot1'
            }
        }
    }, 300)
    setTimeout(() => {
        clearInterval(loopTime)
    }, 6000)
    let wheel_btn = this.refs.wheel_btn, initDeg = 0;
    if (wheel_btn.style.transform) initDeg = wheel_btn.style.transform.replace(/[^0-9]/ig, "") * 1
    // 缓冲为6圈
    wheel_btn.style.transform = `rotate(${3600 + circle + initDeg - initDeg % 360}deg)`

  }
  /**
   * 设置外圈圆点
   * @param {*} datas 
   * @param {*} index 
   */
  setLoopEle (datas, index) {
    if (index % 2 === 0) {
      return (<i className="loop dot2"  key={ index } style={{transform: `rotate(${index * 12}deg)`}}></i>)
    }else{
      return (<i className="loop dot1" key={ index } style={{transform: `rotate(${index * 12}deg)`}}></i>)
    } 
  }
  /**
   * datas 数据
   * i 当前位置0，1，2....
   */
  wheelItemsEle = (datas, i) => {
    return (
      <div className="wheel-item" key= { i } >
        <div className="sector" >
          <div className="sectorCss" ref= {`sector${datas}`
          } style= {{transform: `rotate(${i * (360 / this.state.wheelGoods.length) - 15}deg) skewY(-30deg)` }}></div>
        </div>
        <div className= "wheel-goods" style= {{transform: `rotate(${i * (360 / this.state.wheelGoods.length)}deg)` }}>
          <h3 className="wg-text" > { datas.name } </h3>
        </div>
      </div>
    )
  }
  /**
   * 绘制抽奖背景圆盘
   * @param {*} num 数据长度（用于分块）
   */
  setCanvas (num) {
    const canvasBox=document.getElementById('canvasBox') // 获取canvas父盒
    const canvas=document.getElementById('canvas_yuan')
    const ctx=canvas.getContext('2d')
    // 设置canvas画布宽高
    canvas.width = canvasBox.getBoundingClientRect().width; 
    canvas.height = canvasBox.getBoundingClientRect().height;
    var startAngle = 0;//扇形的开始弧度
    var endAngle = 0;//扇形的终止弧度
    for (let i = 0; i< num; i++){
      startAngle = Math.PI*(i/(num/2)-1/num);
      endAngle = startAngle+Math.PI*(1/(num/2));
      ctx.save();
      ctx.beginPath();
      ctx.arc((canvas.width/2), (canvas.height/2), 10, startAngle, endAngle, false);
      ctx.lineWidth = canvas.width - 20;
      if (i%2 === 0) {
        ctx.strokeStyle = '#ffd670'
      }else{
        ctx.strokeStyle= '#ffec8a';
      }
      ctx.stroke();
      ctx.restore();
    } 
  }
  /**
   * 获取url参数
   * @param {*} variable 
   */
  getQueryVariable (variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
      let pair = vars[i].split("=");
      if(pair[0] === variable){return pair[1];}
    }
    return(false);
  }
  /**
   * 后台返回
   * 获取随机彩品
   */
  getRandomNum () {
    let _this = this
    if (_this.state.btnEnable) {
      menu_random ({
        shop_id: _this.state.shop_id,
        type: 2
      }).then(res => {
        let activedGoodsid = res.data.data.data.id
        _this.setState({
          selectGoodsData: res.data.data.data
        })
        _this.state.wheelGoods.map((item, i) => {
          if (item.id === activedGoodsid) {
            console.log(item.id)
            _this.getPrize (i)
          }
          return item.id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
  render() {
    return (
      <div className='box' id='BagWheel'>
        <div className='content-box'>
          <div className='wheel_box'>
            <div className="wheel-loop" ref="loops" >
              { [...Array(30)].map(this.setLoopEle) }
            </div>
            <div className='canvas_yuan' id='canvasBox'>
              <canvas id='canvas_yuan'></canvas>
            </div>
            <div className="wheel-goods_box" > {this.state.wheelGoods ? this.state.wheelGoods.map((item, i) => this.wheelItemsEle(item, i+1)) : null} </div>
            <div className="wheel-btn_box flex-center">
              <div className="btn wheel_btnTop" onClick={() => this.getRandomNum() }>转一下</div>
                <div className="btn wheel_btn" ref="wheel_btn">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default luckIndex