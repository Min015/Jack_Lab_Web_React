import React, { Component } from 'react';
import '../style/guestmain.scss';
export default class BooksList extends Component {
	render() {
		const { booklist } = this.props;
		return (
			<div className='center'>
				<div className='booklist'>
					{booklist === undefined ? [] : booklist.map((item, index) => {
						let title = "";
						if (booklist !== undefined) {
							if (item.Title.length > 25) {
								title = `${item.Title.substr(0, 25)}...`;
							}
							else {
								title = item.Title;
							}
						}
						return (
							<div key={`book${index}`} className='book' >
								<img src={booklist === undefined ? "" : `http://localhost/${item.Image}`} alt="出版品" />
								<div className='booktitle'>
									{title}
								</div>
								<div className='bookauthor'>
									作者：<br />
									{booklist === undefined ? [] : item.Authors.map((item, index) => {
										return (
											<span key={`author${index}`}>{item.name} </span>
										)
									})}
								</div>
							</div>
						)
					})}
				</div >
			</div>
		)
	}
}
