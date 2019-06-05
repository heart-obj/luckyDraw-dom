import React, { Component } from 'react';
import './index.css'
class luckIndex extends Component {
  constructor (props) {
    super (props);
    this.state = {
      wheelGoods: [
        {
          id: 1,
          name: '五香兔腿'
        },
        {
          id: 2,
          name: '黄瓜炒肉'
        },
        {
          id: 3,
          name: '广式腊饭'
        },
        {
          id: 4,
          name: '意大利面'
        },
        {
          id: 5,
          name: '小笼包'
        },
        {
          id: 6,
          name: '炸鸡肉'
        },
        {
          id: 7,
          name: '麻辣香肠麻辣香肠'
        },
        {
          id: 8,
          name: '鱼香茄子'
        },
        {
          id: 9,
          name: '鱼香茄子'
        },
        {
          id: 10,
          name: '鱼香茄子'
        },
        {
          id: 11,
          name: '鱼香茄子'
        },
        {
          id: 12,
          name: '鱼香茄子'
        },
        {
          id: 13,
          name: '鱼香茄子'
        },
        {
          id: 14,
          name: '鱼香茄子'
        },
        {
          id: 15,
          name: '鱼香茄子'
        },
        {
          id: 16,
          name: '鱼香茄子'
        }
      ], // 大转盘物品列表
      btnEnable: true // 反正用户频繁点击
    };
  }
  // 在渲染前调用,在客户端也在服务端(用于数据初始化)。
  componentWillMount () {
    
  }
  componentDidMount () {
    this.setCanvas(this.state.wheelGoods.length)
  }
  rnd = (n, m) => {
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
  }
  getPrize = () => {
    clearTimeout(this.timer);
    if (this.state.btnEnable) {
        this.setState({ btnEnable: false })
        //禁止用户连续点击
        var randomNum = this.rnd(1, this.state.wheelGoods.length);
        console.log(randomNum)
        this.animation(randomNum * (360 / this.state.wheelGoods.length));
        setTimeout(() => {
          // 指定奖品的扇形添加动画
          // goalSectorEle.style.backgroundColor = '#fffdb6'
          console.log(`恭喜您获得了${this.state.wheelGoods[randomNum - 1].name}`);
        }, 6000);
    }
    this.timer = setTimeout(() => {
        this.setState({ btnEnable: true })
    }, 3000);
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
  wheelItemsEle = (datas) => {
    return (
      <div className="wheel-item" key= { datas.id } >
        <div className="sector" >
          <div className="sectorCss" ref= {`sector${datas.id}`
          } style= {{transform: `rotate(${datas.id * (360 / this.state.wheelGoods.length) - 15}deg) skewY(-30deg)` }}></div>
        </div>
        <div className= "wheel-goods" style= {{transform: `rotate(${datas.id * (360 / this.state.wheelGoods.length)}deg)` }}>
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
            <div className="wheel-goods_box" > {this.state.wheelGoods.map(this.wheelItemsEle)} </div>
            <div className="wheel-btn_box flex-center">
              <div className="btn wheel_btnTop" onClick={ this.getPrize }> </div>
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