import { Component } from 'react';
import '../style/guestmain.scss';
import book1 from './img/book1.jpg';
import book2 from './img/book2.jpg';
import book3 from './img/book3.jpg';
export default class BooksList extends Component {
    //func

    render() {
        const { books } = this.props;
        return (
            <div className='booklist'>
                {books.map((item,index) => {
                    console.log(item);
                    const photo =item.book_photo;
                    console.log(photo);
                    return (
                        <div key={index} div className='col-3 book' >
                            <img src={book1} />
                            <div className='booktitle'>
                                {item.book_title}
                            </div>
                            <div className='bookauthor'>
                                作者：<br />
                                {item.book_author}
                            </div>
                        </div>
                    )
                })}
            </div >
        )
    }
}