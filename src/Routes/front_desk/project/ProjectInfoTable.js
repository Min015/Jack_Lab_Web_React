import { Component } from 'react';
import '../main_category/category.scss';
export default class ProjectInfoTable extends Component {
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
        const { table_header, table_content } = this.props;
        let style;
        return (
            <table>
                <thead>
                    <tr>
                        {table_header.map(item => (<th>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {table_content.map(
                        (item, index) => {
                            style = this.handleSetStyle(index);
                            return (
                                <tr className={style}>
                                    <td>{item.file_name}</td>
                                    <td>{item.file_uploader}</td>
                                    <td>{item.file_createTime}</td>
                                    <td>{item.file_record}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}