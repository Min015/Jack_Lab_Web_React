import { Component } from 'react';
import '../style/studentcard.scss';
export default class CreateStudentCard extends Component {

	render() {
		const { student } = this.props;
		return (
			<div id='stu_card'>
				<nav>
					<ul>
						<li>2022</li>
						<li>2021</li>
						<li>2020</li>
						<li>2019</li>
						<li>2018</li>
						<li>2017</li>
					</ul>
				</nav>
				<div className='block'>

					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>
					<div className='card'>
						<div className='card_in'>
							<div className='stu_i'>
								<div className='img'></div>
							</div>

							<div className='stu_n'>學生姓名</div>
							<div className='stu_t'>學制</div>
						</div>
					</div>




					{/* {student.map((item) => {
						return (
							<div className='card'>

								<div className='stu_i'>
								</div>
								<div className='stu_n'>{item.stu_name}</div>
								<div className='stu_c'>{item.stu_classes}</div>

							</div>
						)
					})} */}
				</div>
			</div>
		)
	}
}