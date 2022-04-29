import { Component } from "react";
import { Link } from "react-router-dom";
export default class NoRoute extends Component {
    render() {
        return (
            <div>
                <h1>您所尋找的路徑不存在</h1>
                <Link to='/index'>回主頁</Link>
            </div>
        );
    }
}
