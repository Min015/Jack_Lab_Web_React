import { Component } from 'react';
import '../main_category/category.scss';
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
                                    <td>{item.g_year}</td>
                                    <td>{item.g_group}</td>
                                    <td>{item.g_name}</td>
                                    <td>{item.g_position}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}