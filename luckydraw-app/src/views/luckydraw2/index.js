import React, { Component } from 'react';
import './index.css';
import { menu_random } from '../../api/api';
class Lucky2 extends Component {
  constructor (props) {
    super (props)
    console.log(props)
    this.state = {
      list: props.goodsList,
      shop_id: props.shop_id,
      // 被选中的格子的ID
      activedId: props.goodsList[0].id,
      activedNum: 0,
      // 中奖ID
      prizeId: null,
      // 获得prizeId之后计算出的动画次数
      times: 0,
      // 当前动画次数
      actTimes: 0,
      // 是否正在抽奖
      isRolling: false
    }
  }
  /**
   * dom未渲染（一般用于数据初始）
   */
  componentWillMount () {

  }
  /**
   * dom 渲染完成后立即执行
   */
  componentDidMount () {

  }
  handleBegin () {
    if (!this.state.isRolling) {
      // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
      this.setState({
        activedId: '',
        activedNum: '',
        prizeId: null,
        times: 0,
        actTimes: 0,
        isRolling: true
      }, () => {
        // 状态还原之后才能开始真正的抽奖
        this.getRandomNum()
      })
    }
  }
  handlePlay (prize) {
    this.setState({
      prizeId: this.state.list[prize].id,
      activedId: 0,
      activedNum: 0
    })
    // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
    let times = this.state.list.length * Math.floor(Math.random() * 5 + 4)
    this.setState({
      times: times
    })
    let loopTime = setInterval (() => {
      let num;
      if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
        // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
        clearInterval(loopTime)
        if (this.getQueryVariable('type') === 'Android') {
          window.action.showWindow(this.state.list[prize]);
        } else if (this.getQueryVariable('type') === 'IOS') {
          // ios
        }
        console.log(this.state.activedId)
        this.setState({
          isRolling: false
        })
        return
      }
      // 以下是动画执行时对id的判断
      if (this.state.activedId === '') {
        num = 0
        this.setState({
          activedNum: num,
          activedId: this.state.list[num].id
        })
      } else {
        num = this.state.activedNum
        if (num === 10) {
          num = 0
          this.setState({
            activedNum: num,
            activedId: this.state.list[num].id
          })
        } else {
          num = num + 1
          this.setState({
            activedNum: num,
            activedId: this.state.list[num - 1].id
          })
        }
      }
      this.setState({
        actTimes: this.state.actTimes + 1
      })
    },40)
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
  getRandomNum () {
    let _this = this
    if (_this.state.isRolling) {
      menu_random ({
        shop_id: this.state.shop_id,
        type: 1
      }).then(res => {
        let activedGoodsid = res.data.data.data.id
        this.state.list.map((item, i) => {
          if (item.id === activedGoodsid) {
            console.log(item.id)
            _this.handlePlay (i)
          }
          return item.id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
  render () {
    return (
      <div className = 'box'>
        <div className = 'box-col'>
          <div className = 'goods-btn' onClick = {() => this.handleBegin()}>转一下</div>
          <div className = 'goods-box'>
            <div className = 'goods-row'>
              <div className={`${this.state.activedId === this.state.list[0].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[0].image } alt=""/>
                <span className='goods-text'>{ this.state.list[0].name }</span>
              </div>
              <div className={`${this.state.activedId === this.state.list[1].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[1].image } alt=""/>
                <span className='goods-text'>{ this.state.list[1].name }</span>
              </div>
              <div className={`${this.state.activedId === this.state.list[2].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[2].image } alt=""/>
                <span className='goods-text'>{ this.state.list[2].name }</span>
              </div>
            </div>
            <div className = 'goods-row'>
            <div className={`${this.state.activedId === this.state.list[9].id ? 'select-goods' : ''} ${'goods-col'}`}>
              <img src={ this.state.list[9].image } alt=""/>
              <span className='goods-text'>{ this.state.list[9].name }</span>
            </div>
              <div className={`${this.state.activedId === this.state.list[3].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[3].image } alt=""/>
                <span className='goods-text'>{ this.state.list[3].name }</span>
              </div>
            </div>
            <div className = 'goods-row'>
            <div className={`${this.state.activedId === this.state.list[8].id ? 'select-goods' : ''} ${'goods-col'}`}>
              <img src={ this.state.list[8].image } alt=""/>
              <span className='goods-text'>{ this.state.list[8].name }</span>
            </div>
              <div className={`${this.state.activedId === this.state.list[4].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[4].image } alt=""/>
                <span className='goods-text'>{ this.state.list[4].name }</span>
              </div>
            </div>
            <div className = 'goods-row'>
              <div className={`${this.state.activedId === this.state.list[7].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[7].image } alt=""/>
                <span className='goods-text'>{ this.state.list[7].name }</span>
              </div>
              <div className={`${this.state.activedId === this.state.list[6].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[6].image } alt=""/>
                <span className='goods-text'>{ this.state.list[6].name }</span>
              </div>
              <div className={`${this.state.activedId === this.state.list[5].id ? 'select-goods' : ''} ${'goods-col'}`}>
                <img src={ this.state.list[5].image } alt=""/>
                <span className='goods-text'>{ this.state.list[5].name }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default Lucky2