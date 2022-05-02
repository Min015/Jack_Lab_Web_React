import { Component } from 'react';
import '../main_category/category.scss';
import { Link } from 'react-router-dom';
export default class CreateTable extends Component {
    //func
    handleSetStyle = (i) => {
        if (i % 2 === 0) {
            return "tr_odd"
        }
        else if (i % 2 === 1) {
            return "tr_even";
        }
    }
    render() {
        const { table_header, table_content, onDetail } = this.props;
        let style;
        return (
            <table>
                <thead>
                    <tr>
                        {table_header.map((item, index) => (<th key={`th${index}`}>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {table_content.map(
                        (item, index) => {
                            style = this.handleSetStyle(index);
                            return (
                                <tr key={`tr${index}`} className={style}>

                                    <td>
                                        {/* {onDetail(item.Id, item.Title)} */}
                                        <Link
                                            to={`/meeting/meetinginfo/${item.Id}`}
                                        >
                                            {item.Title}
                                        </Link>
                                    </td>
                                    <td>{item.Time}</td>
                                    <td>{item.Place}</td>
                                    <td>{item.uploader.Name}</td>
                                    <td>
                                        {item.tag.map((item, index) => {
                                            return (<span className='table_tag' key={`tag${index}`}>{`${item.Name}`} </span>)
                                        })}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}