import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import './index.css'
class luckIndex extends Component {
  constructor (props) {
    super (props);
    this.state = {
      wheelGoods: [
        {
          id: 1,
          name: 1
        },
        {
          id: 2,
          name: 2
        },
        {
          id: 3,
          name: 3
        },
        {
          id: 4,
          name: 4
        },
        {
          id: 5,
          name: 5
        },
        {
          id: 6,
          name: 6
        },
        {
          id: 7,
          name: 7
        },
        {
          id: 8,
          name: 8
        },
        {
          id: 9,
          name: 9
        },
        {
          id: 10,
          name: 10
        },
        {
          id: 11,
          name: 11
        },
        {
          id: 12,
          name: 12
        },
        {
          id: 13,
          name: 13
        },
        {
          id: 14,
          name: 14
        },
        {
          id: 15,
          name: 15
        },
        {
          id: 16,
          name: 16
        }
        
      ], // 大转盘物品列表
      btnEnable: true // 反正用户频繁点击
    };
  }
  // 在渲染前调用,在客户端也在服务端(用于数据初始化)。
  componentWillMount () {
    
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
        var randomNum = this.rnd(0, 11);
        console.log(randomNum)
        this.animation(randomNum * 22.5);
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
  setLoopEle (datas, index) {
    if (index % 2 === 0) {
      return (<i className="loop dot2"  key={ index } style={{transform: `rotate(${index * 7.5}deg)`}}></i>)
    }else{
      return (<i className="loop dot1" key={ index } style={{transform: `rotate(${index * 7.5}deg)`}}></i>)
    } 
  }
  wheelItemsEle = (datas) => {
    return (
      <div className="wheel-item" key= { datas.id } >
        <div className="sector" >
          <div className="sectorCss" ref= {`sector${datas.id}`
          } style= {{transform: `rotate(${datas.id * 22.5 - 15}deg) skewY(-30deg)` }}></div>
        </div>
        <div className= "wheel-goods" style= {{transform: `rotate(${datas.id * 22.5}deg)` }}>
          <h3 className="wg-text" > { datas.name } </h3>
            < div className= "wg-icon" >

            </div>
        </div>
      </div>
  )
  }
  render() {
    return (
      <div className='box' id='BagWheel'>
        <div className='content-box'>
          <div className='wheel_box'>
            <div className="wheel-loop" ref="loops" >
              { [...Array(48)].map(this.setLoopEle) }
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