import { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import BackLayout from '../../../../Components/Layout/back/BackLayout';
import '../../style/info.scss';
import { GET_PublicMembers } from '../../../../Action/MemberAction';
import {GET_ProjectType,POST_AddProject } from '../../../../Action/ProjectAction';
const mapStateToProps = state => {
  return {
    PublicMemberList:state.memberReducer.PublicMemberList,
    ProjectType:state.projectReducer.ProjectType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GET_ProjectType:()=>dispatch(GET_ProjectType()),
    GET_PublicMembers: () => dispatch(GET_PublicMembers()),
    POST_AddProject: (payload) => dispatch(POST_AddProject(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  class CaseAdd extends Component {
    state = {
      participate: [],//已選擇
      long: 0,//一個tag的長度
      tag: [],//已輸入的tag
      drop: false,
      disabled: false,
      all_file_max_size: 1024 * 1024 * 50,//50M
      one_file_max_size: 1024 * 1024 * 30,//30M
      mimes_type: ['zip', '7z', 'rar', 'svg', 'png', 'jpg', 'jpeg', 'csv', 'txt', 'xlx', 'xls', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx'],//媒體類型
      title: {
        value: "",
        errormsg: "*",
      },
      content: {
        value: "",
        errormsg: "*",
      },
      member: {
        errormsg: "*",
      },
      type:{
        value: "",
        errormsg: "*",
      }
    }


    //載入所有人員名單
    componentDidMount = async () => {
      this.props.GET_PublicMembers();
      this.props.GET_ProjectType();
    }
    //送出
    Submit = async () => {
      const { title, content, participate, tag, member,type } = this.state;
      const errormsg = "*";
      if (title.errormsg !== errormsg && content.errormsg !== errormsg && member.errormsg !== errormsg && type.errormsg !== errormsg) {
        const addmember = participate?.map((item) => { return (item.account) });
        const payload={
          Name:title.value,
          Description:content.value,
          Proj_type:type.value,
          Tag:tag,
          Member:addmember,
        }
        this.props.POST_AddProject(payload);
        this.props.history.push("/casemanage");
      }
      else {
        alert("您有必填欄位尚未填寫，請確認");
      }
    }

    //確定是否填寫
    handleInputChange(event) {
      const target = event.target;
      let { value, name } = target;
      value = value.trim();
      if (value !== "") {
        this.setState({
          [name]: {
            value,
            errormsg: "",
          }
        });
      }
      else {
        this.setState({
          [name]: {
            value,
            errormsg: "*",
          }
        });
      }
    }
    //選參與人
    handelOnClick = e => {
      let participate = this.state.participate;
      const account = e.id;
      const name = e.value;
      const obj = {
        account,
        name
      }
      if (e.checked === true) {
        if (!participate.find((item) => JSON.stringify(item) === JSON.stringify(obj))) {
          participate.push(obj);
        }
        this.setState({
          participate,
        })
      }
      else {
        let newarray = participate.filter((item) => item.account !== obj.account)
        this.setState({
          participate: newarray,
        })
      }
      if (participate.length === 0) {
        this.setState({
          member: {
            errormsg: "*",
          },
        })
      }
      else {
        this.setState({
          member: {
            errormsg: "",
          },
        })
      }
    }
    
    //下拉式選人判斷
    handleGrop_down = () => {
      this.setState({
        drop: !this.state.drop,
      })
    }
    //下拉式選人關閉
    handelMouseDown = (e) => {
      const cn = (e.target.className);
      const name = cn.substr(0, 6)
      if (name !== "choose") {
        this.setState({
          drop: false,
        })
      }
      else {
        this.setState({
          drop: true,
        })
      }
    }
    //判斷標籤長度
    headleGetLong = (e) => {
      const long = e.target.value.length;
      if (long >= 20) {
        alert("一個標籤勿超過20字");
        e.target.value = "";
      }
      this.setState({
        long
      })
    }
    //新增標籤
    heandleAddTag = (e) => {
      const tag = this.state.tag;
      if (tag.length === 5) {
        e.target.value = "";
        this.setState({
          disabled: true,
        })
        alert("一次請勿輸入超過五個標籤");
      }
      else {
        this.setState({
          disabled: false,
        })
        if (e.keyCode === 32) {
          if (!tag.includes(e.target.value) && (e.target.value) !== "" && (e.target.value) !== " ") {
            tag.push(e.target.value);
          }
          e.target.value = "";
        }
      }
    }
    //刪除標籤
    heandleDelTag = (e) => {
      const thistag = e.target.id;
      let tag = this.state.tag;
      this.setState({
        disabled: false,
      })
      if (tag.includes(thistag)) {
        tag.forEach((item, index) => {
          if (item === thistag) {
            tag.splice(index, 1)
          }
        })
      }
      this.setState({
        tag
      })
    }

    render() {
      const { title, content, member, tag, participate, long, disabled, drop,type } = this.state;
      const { PublicMemberList,ProjectType } = this.props;
      return (
        <BackLayout>
          <div
            className="info_form"
            onClick={this.handelMouseDown.bind(this)}
          >
            <div className="inputbox">
              <div className="set col-4">
                <select onChange={this.handleInputChange.bind(this)} name="type" required className="input">
                  {ProjectType===undefined?"":ProjectType.map((item) => {
										return (
											<option value={item.Id}>{item.Name}</option>
										)
									})}
                </select>
                <label for="" className="label">專案類型<div className='error_msg'>{type.errormsg}</div></label>
              </div>
            </div>
            {/* 輸入專案名稱 */}
            <div className="inputbox">
              <div className="set col-12">
                <input
                  type="text"
                  name="title"
                  placeholder="專案名稱"
                  required
                  maxLength="50"
                  className="input"
                  value={title.value}
                  onChange={this.handleInputChange.bind(this)}
                />
                <label className="label">輸入專案名稱<div className='error_msg'>{title.errormsg}</div></label>
              </div>
            </div>
            {/* 輸入內容描入 */}
            <div className="inputbox">
              <div className="set col-12">
                <textarea
                  name="content"
                  placeholder="內容描入"
                  rows="20"
                  required
                  maxLength="2000"
                  className="input"
                  defaultValue={content.value}
                  onChange={this.handleInputChange.bind(this)}
                ></textarea>
                <label className="label">內容描入<div className='error_msg'>{content.errormsg}</div></label>

              </div>
            </div>
            {/* 參與人員 */}
            <div className="inputbox">
              <div className={drop === true ? "set col-12 focus" : "set col-12"}>
                <div
                  className='choose input'
                  onClick={this.handleGrop_down}
                >
                  {participate.length === 0 ? "參與人員" : ""}
                  {participate.length === 0 ? [] : participate.map((item, index) =>
                    <div
                      className='oncheck'
                      key={index}
                    >
                      <p >{item.name}
                        <label className='deselect'>
                          <input
                            type='checkbox'
                            id={item.account}
                            value={item.name}
                            checked
                            onChange={(e) => { this.handelOnClick(e.target) }}
                          />
                          <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
                            </svg>

                          </span>
                        </label>
                      </p>
                    </div>
                  )}
                </div>
                <div className='locator'>
                  <div className={drop === false ? "selectlist" : "selectlist active"}>
                    {PublicMemberList === undefined ? "" : PublicMemberList.map((item, index) => {
                      const participate2 =participate.map(item => { return item.account })
                      return (
                        <div
                          className={participate2.includes(item.Account) ? "option selected" : "option noS"}
                          key={index}
                        >
                          <input
                            type='checkbox'
                            id={item.Account}
                            value={item.Name}
                            className='choose'
                            onChange={(e) => { this.handelOnClick(e.target) }}
                          />
                          <label for={item.Account} className='choose'>{item.Name}</label>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
                <label className="label">選擇參與人員<div className='error_msg'>{member.errormsg}</div></label>
              </div>
            </div>
            {/* 標籤 */}
            <div className="inputbox">
              <div className="set col-12">
                <div className="input">
                  {tag.map((item) => (
                    <p key={item}>
                      {item}
                      <span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.33546 0.33546C0.550319 0.120665 0.841693 0 1.1455 0C1.44932 0 1.74069 0.120665 1.95555 0.33546L6.00692 4.38683L10.0583 0.33546C10.2744 0.126752 10.5638 0.0112672 10.8642 0.0138777C11.1646 0.0164882 11.452 0.136985 11.6644 0.349417C11.8768 0.561848 11.9973 0.849216 12 1.14963C12.0026 1.45004 11.8871 1.73946 11.6784 1.95555L7.62701 6.00692L11.6784 10.0583C11.8871 10.2744 12.0026 10.5638 12 10.8642C11.9973 11.1646 11.8768 11.452 11.6644 11.6644C11.452 11.8768 11.1646 11.9973 10.8642 12C10.5638 12.0026 10.2744 11.8871 10.0583 11.6784L6.00692 7.62701L1.95555 11.6784C1.73946 11.8871 1.45004 12.0026 1.14963 12C0.849216 11.9973 0.561848 11.8768 0.349417 11.6644C0.136985 11.452 0.0164882 11.1646 0.0138777 10.8642C0.0112672 10.5638 0.126752 10.2744 0.33546 10.0583L4.38683 6.00692L0.33546 1.95555C0.120665 1.74069 0 1.44932 0 1.1455C0 0.841693 0.120665 0.550319 0.33546 0.33546Z" fill="#022840" />
                        </svg>
                        <div
                          className='close'
                          id={item}
                          onClick={this.heandleDelTag}></div>
                      </span>
                    </p>
                  ))}
                  <input
                    type="text"
                    name=""
                    placeholder=""
                    size={long}
                    className='input_tag'
                    disabled={disabled}
                    onKeyDown={this.heandleAddTag}
                    onChange={this.headleGetLong}
                  />
                </div>
                <label className="label">輸入標籤</label>
              </div>
            </div>
            {/* 送出 */}
            <div id="work_col">
              <button
                className="col-1 form_submit"
              >
                <Link to={`/casemanage`}>
                  返回
                </Link>
              </button>
              <button
                className="col-1 form_submit"
                onClick={this.Submit}
              >
                新增
              </button>
            </div>
          </div>
        </BackLayout>
      )
    }
  })