import React, { Component } from 'react';
import '../style/Carousel.scss';
export default class MysCarousel extends Component {
    constructor() {
        super();
        this.state = {
            imgs: [
                './img/img1.jpg',
                './img/img2.jpg',
                './img/img3.jpg',
            ],   // 圖片數組
            showIndex: 0, //顯示第幾個圖片
            timer: null,  // 定時器
        }
    }
    stop = () => { //暫停
        let { timer } = this.state;
        clearInterval(timer);
    }
    start = () => { //開始
        let { timer } = this.state;
        timer = setInterval(() => {
            this.next();
        }, 2500);
        this.setState({
            timer
        })
    }
    change = (index) => { //點擊下面的按鈕切換當前顯示的圖片
        this.setState({
            showIndex: index,
        })
    }
    next = () => { //下一張
        let { showIndex,imgs} = this.state;
        if (showIndex >= imgs.length - 1) {
            showIndex = 0;
        } else {
            showIndex++;
        }
        this.setState({
            showIndex
        })
    }
    render() {
        return (
            <div className="ReactCarousel">
                <div className="contain"
                    onMouseEnter={() => { this.stop() }} //鼠標進入停止自動播放
                    onMouseLeave={() => { this.start() }}  //鼠標退出自動播放
                >
                    <ul className="ul">
                        {
                            this.state.imgs.map((item, index) => {
                                return (
                                    <li className={index === this.state.showIndex ? 'show' : ''}
                                        key={index}
                                    >
                                        <img src={require(item + '')} alt="輪播圖" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="dots" style={{ width: this.state.imgs.length * 20 + 'px' }}>
                        {
                            this.state.imgs.map((value, index) => {
                                return (
                                    <li key={index}
                                        className={index === this.state.showIndex ? 'active' : ''}
                                        onClick={() => { this.change(index) }}>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount() { //一開始自動播放
        this.start();
    }
    componentWillUnmount() { //銷燬前清除定時器
        this.stop();
    }
}