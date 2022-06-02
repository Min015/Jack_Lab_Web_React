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
						let author = "";
						author += item.Authors.map((item) => `${item.name} `);
						author = author.replaceAll(',', "");
						let Author = author.replaceAll(',', "");
						if (booklist !== undefined) {
							if (item.Title.length > 25) {
								title = `${item.Title.substr(0, 25)}...`;
							}
							else {
								title = item.Title;
							}
							if (author.length > 15) {
								author = `${author.substr(0, 15)}...`;
							}
						}
						return (
							<div key={`book${index}`} className='book' >
								<img src={booklist === undefined ? "" : `http://localhost/${item.Image}`} alt="出版品" />
								<div className='booktitle'>
									{`${title}`}
									<label>{item.Title}</label>
								</div>
								<div className='bookauthor'>
									作者：<br />
									{author}
									<label>{Author}</label>
								</div>
							</div>
						)
					})}
				</div >
			</div>
		)
	}
}
