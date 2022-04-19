import { Component } from 'react';
import AdminHeader from '../../../../Components/Header/AdminHeader';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import '../../style/mainstyle.scss';
import CreateTable from './CreateTable';
export default class LabIntroduce extends Component {
    state = {
        table_header: [
            "標題",
            "內容",
        ],
        object: [
            {
                l_id:"l01",
                l_title:"Web_Lab",
                l_content: "這是內容",
            },
        ]
    }
    
    render() {
        const{table_header,object}=this.state;
        return (
            <div>
                <AdminHeader />
                <div className="content">
                    <Sidebar />
                    <div className="content_in">
                        <div className="in">
                        <div className="work">
                                <div className="edit_button">
                                    <div className="add">
                                        <a href="#">
                                            <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.07143 17.2188C1.07143 17.6912 1.24075 18.1442 1.54215 18.4783C1.84355 18.8123 2.25233 19 2.67857 19H12.3214C12.7477 19 13.1565 18.8123 13.4578 18.4783C13.7592 18.1442 13.9286 17.6912 13.9286 17.2188V4.75001H1.07143V17.2188ZM10.1786 7.71876C10.1786 7.56129 10.235 7.41026 10.3355 7.29891C10.4359 7.18756 10.5722 7.12501 10.7143 7.12501C10.8564 7.12501 10.9926 7.18756 11.0931 7.29891C11.1936 7.41026 11.25 7.56129 11.25 7.71876V16.0313C11.25 16.1887 11.1936 16.3398 11.0931 16.4511C10.9926 16.5625 10.8564 16.625 10.7143 16.625C10.5722 16.625 10.4359 16.5625 10.3355 16.4511C10.235 16.3398 10.1786 16.1887 10.1786 16.0313V7.71876ZM6.96429 7.71876C6.96429 7.56129 7.02073 7.41026 7.12119 7.29891C7.22166 7.18756 7.35792 7.12501 7.5 7.12501C7.64208 7.12501 7.77834 7.18756 7.87881 7.29891C7.97927 7.41026 8.03571 7.56129 8.03571 7.71876V16.0313C8.03571 16.1887 7.97927 16.3398 7.87881 16.4511C7.77834 16.5625 7.64208 16.625 7.5 16.625C7.35792 16.625 7.22166 16.5625 7.12119 16.4511C7.02073 16.3398 6.96429 16.1887 6.96429 16.0313V7.71876ZM3.75 7.71876C3.75 7.56129 3.80644 7.41026 3.90691 7.29891C4.00737 7.18756 4.14363 7.12501 4.28571 7.12501C4.42779 7.12501 4.56406 7.18756 4.66452 7.29891C4.76499 7.41026 4.82143 7.56129 4.82143 7.71876V16.0313C4.82143 16.1887 4.76499 16.3398 4.66452 16.4511C4.56406 16.5625 4.42779 16.625 4.28571 16.625C4.14363 16.625 4.00737 16.5625 3.90691 16.4511C3.80644 16.3398 3.75 16.1887 3.75 16.0313V7.71876ZM14.4643 1.18751H10.4464L10.1317 0.493561C10.065 0.345203 9.96233 0.220408 9.83515 0.133214C9.70798 0.04602 9.56137 -0.000112366 9.41183 6.50628e-06H5.58482C5.43562 -0.000629197 5.28927 0.0453312 5.16255 0.132622C5.03582 0.219913 4.93385 0.345003 4.8683 0.493561L4.55357 1.18751H0.535714C0.393634 1.18751 0.257373 1.25006 0.156907 1.36141C0.0564412 1.47276 0 1.62378 0 1.78126L0 2.96876C0 3.12623 0.0564412 3.27725 0.156907 3.3886C0.257373 3.49995 0.393634 3.56251 0.535714 3.56251H14.4643C14.6064 3.56251 14.7426 3.49995 14.8431 3.3886C14.9436 3.27725 15 3.12623 15 2.96876V1.78126C15 1.62378 14.9436 1.47276 14.8431 1.36141C14.7426 1.25006 14.6064 1.18751 14.4643 1.18751Z" fill="white" />
                                            </svg>
                                            <p>刪除簡介</p>
                                        </a>
                                    </div>
                                    <div className="add">
                                        <a href="#">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.4737 4.21053V6.72842C13.4737 6.72842 11.7979 6.73684 11.7895 6.72842V4.21053H9.26316C9.26316 4.21053 9.27158 2.53474 9.26316 2.52632H11.7895V0H13.4737V2.52632H16V4.21053H13.4737ZM10.9474 7.57895V5.05263H8.42105V2.52632H1.68421C0.757895 2.52632 0 3.28421 0 4.21053V14.3158C0 15.2421 0.757895 16 1.68421 16H11.7895C12.7158 16 13.4737 15.2421 13.4737 14.3158V7.57895H10.9474ZM1.68421 14.3158L4.21053 10.9474L5.89474 13.4737L8.42105 10.1053L11.7895 14.3158H1.68421Z" fill="white" />
                                            </svg>
                                            <p>新增簡介</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <CreateTable table_header={table_header} table_content={object} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}