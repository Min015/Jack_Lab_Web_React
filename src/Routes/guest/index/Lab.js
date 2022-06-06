import React, { Component } from 'react';
import '../style/guestmain.scss';

export default class Lab extends Component {
	render() {
		const { LabIntroduceList } = this.props;
		return (
			<div>
				{LabIntroduceList === undefined ? [] : LabIntroduceList.list.map((item, index) => {
					return (
						<div className='block'>
							<div key={`LabIntroduceList${index}`} className="center">
								<div className='index_title'>{item.Title}</div>
								<div className='labintroduce' >
									<div dangerouslySetInnerHTML={{ __html: item.Content }}></div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}
