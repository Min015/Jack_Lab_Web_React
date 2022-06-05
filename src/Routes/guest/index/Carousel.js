import React, { Component } from 'react';

import '../style/Carousel.scss';
import nocarousel from './img/nocarousel.jpg'
export default class MysCarousel extends Component {
	state = {
		showIndex: 0, //顯示第幾個圖片
		timer: null,  // 定時器
	}

	componentDidMount = () => {
		this.start();
	}
	componentWillUnmount() { //銷燬前清除定時器
		this.stop();
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
		let { showIndex } = this.state;
		const { AlbumListAll } = this.props;
		const length = (AlbumListAll === undefined ? 1 : AlbumListAll.length);
		if (showIndex >= length - 1) {
			showIndex = 0;
		} else {
			showIndex++;
		}
		this.setState({
			showIndex
		})
	}
	render() {
		const { showIndex } = this.state;
		const { AlbumListAll } = this.props;
		const dot = (AlbumListAll === undefined ? 1 : AlbumListAll.length);
		return (
			<div className="ReactCarousel" >
				<div className="contain"
					onMouseEnter={() => { this.stop() }} //鼠標進入停止自動播放
					onMouseLeave={() => { this.start() }}  //鼠標退出自動播放
				>
					<ul className="ul">
						{
							(AlbumListAll === undefined || AlbumListAll === '') ?
								<li className='show'>
									<img src={nocarousel} alt="輪播圖" />
								</li>
								: AlbumListAll.map((item, index) => {
									return (
										<li className={index === showIndex ? 'show' : ''}
											key={`AlbumListAll${index}`}
										>
											<img src={(AlbumListAll === undefined || AlbumListAll === '') ? "" : `http://localhost/${item.Image}`} alt="輪播圖" />
										</li>
									)
								})
						}
					</ul>
					<ul className="dots" style={{ width: dot * 20 + 'px' }}>
						{
							(AlbumListAll === undefined || AlbumListAll === '') ? [] : AlbumListAll.map((value, index) => {
								return (
									<li key={`Album${index}`}
										className={index === showIndex ? 'active' : ''}
										onClick={() => { this.change(index) }}>
									</li>)
							})
						}
					</ul>
				</div>
			</div >
		)
	}
}
