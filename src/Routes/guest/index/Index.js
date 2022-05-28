import { Component } from 'react';
import { connect } from "react-redux";
import GuestHeader from '../../../Components/Header/front_end/GuestHeader';
import Carousel from './Carousel';
import Booklist from './BooksList';
import Teacher from './Teacher';
import Lab from './Lab';

import '../style/guestmain.scss';

import {
	GET_AdminAlbumAll,
	GET_Book,
} from '../../../Action/IndexAction';

import {
	GET_TeacherIntroduce,
	GET_LabIntroduce,
} from '../../../Action/IntroduceAction'

const mapStateToProps = state => {
	return {
		AlbumListAll: state.guestindexReducer.AlbumListAll,
		BookList: state.guestindexReducer.BookList,
		TeacherIntroduceList: state.introduceReducer.TeacherIntroduceList,
		LabIntroduceList: state.introduceReducer.LabIntroduceList,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_AdminAlbumAll: () => dispatch(GET_AdminAlbumAll()),
		GET_Book: (page, search) => dispatch(GET_Book(page, search)),
		GET_TeacherIntroduce: (page, search) => dispatch(GET_TeacherIntroduce(page, search)),
		GET_LabIntroduce: (page, search) => dispatch(GET_LabIntroduce(page, search)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(
	class Index extends Component {

		componentDidMount = () => {
			this.props.GET_AdminAlbumAll();
			this.props.GET_Book('1', " ");
			this.props.GET_TeacherIntroduce('1', " ");
			this.props.GET_LabIntroduce('1', " ");
		}
		render() {
			const { AlbumListAll, BookList, TeacherIntroduceList,LabIntroduceList } = this.props;
			const booklist = (BookList === undefined ? [] : BookList.list.filter((item, index) => {
				return index < 5;
			}))

			return (
				<div>
					<GuestHeader />
					<div className="content">
						<Carousel AlbumListAll={AlbumListAll} />
						<div id='GuestIndex'>
							<div className='block'>
								<div className='index_title'>教師介紹</div>
								<Teacher TeacherIntroduceList={TeacherIntroduceList} />
							</div>
							<div className='block'>
								<Lab LabIntroduceList={LabIntroduceList} />
							</div>
							<div className='block'>
								<div className='index_title'>出版品</div>
								<Booklist booklist={booklist} />
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
)