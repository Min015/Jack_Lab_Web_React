import React, { Component } from 'react';
import '../style/guestmain.scss';

export default class Teacher extends Component {
	render() {
		const { TeacherIntroduceList } = this.props;
		return (
			<div className='center'>
				<div className='teacher_block'>
					{TeacherIntroduceList === undefined ? [] : TeacherIntroduceList.list.map((item, index) => {
						return (
							<div key={`TeacherIntroduceList${index}`} className='teacher'>
								<div className='teacherphoto'>
									<div className='imgBG'></div>
									<img src={item === undefined ? "" : `http://localhost/${item.Image}`} alt="教師頭像" className='Image' />
									<div className='teacherinfo'>
										<span className='name'>{item.Name}</span> <span>{item.Title}</span>
									</div>
								</div>
								<div className='teacherintroduce' dangerouslySetInnerHTML={{__html:item.Introduction}}>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
