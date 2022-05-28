import { Component } from 'react';
import '../style/guestmain.scss';

export default class Lab extends Component {
	render() {
		const { LabIntroduceList } = this.props;
		return (
			<div>
				{LabIntroduceList === undefined ? [] : LabIntroduceList.list.map((item, index) => {
					return (
						<div key={`LabIntroduceList${index}`}>
							<div className='index_title'>{item.Title}</div>
							<div className='center'>
								<div className='labintroduce'>
									{item.Content}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}
