import { Component } from 'react';
import { connect } from "react-redux";
import GuestHeader from '../../../Components/Header/front_end/GuestHeader';
import Carousel from './Carousel';
import Booklist from './BooksList';
import '../style/guestmain.scss';

import {
	GET_AdminAlbumAll,
	GET_Book,
} from '../../../Action/IndexAction';

const mapStateToProps = state => {
	return {
		AlbumListAll: state.guestindexReducer.AlbumListAll,
		BookList: state.guestindexReducer.BookList,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		GET_AdminAlbumAll: () => dispatch(GET_AdminAlbumAll()),
		GET_Book: (page, search) => dispatch(GET_Book(page, search)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(
	class Index extends Component {

		componentDidMount = () => {
			this.props.GET_AdminAlbumAll();
			this.props.GET_Book('1', " ");
		}
		render() {
			const { AlbumListAll } = this.props;
			const { BookList } = this.props;
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
								{/* <Booklist booklist={booklist} /> */}
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