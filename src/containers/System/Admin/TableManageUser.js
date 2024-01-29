/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {MDBDataTable} from "mdbreact";

const mdParser = new MarkdownIt();
function handleEditorChange({html, text}) {}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        userRedux: this.props.listUser,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    let arrUsers = this.state.userRedux;
    ////////////////////////////////
    const columns = [
      {key: "id", name: "ID"},
      {key: "title", name: "Title"},
    ];

    const rows = [
      {id: 0, title: "Example"},
      {id: 1, title: "Demo"},
    ];

    const Getdata = [];
    if (arrUsers && arrUsers.length > 0) {
      arrUsers.forEach((item, index) => {
        Getdata.push({
          stt: index,
          id: item.id,
          email: item.email,
          ho: item.lastName,
          ten: item.firstName,
          gioitinh: item.gender,
          diachi: item.address,
          sodienthoai: item.phoneNumber,
          chucvu: item.positionId,
          vaitro: item.roleId,
          action: [
            <div className="td" style={{display: "flex"}}>
              <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>,
          ],
        });
      });
    } else {
    }
    const data = {
      columns: [
        {
          label: "STT",
          field: "stt",
        },
        {
          label: "Số ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Họ",
          field: "ho",
          sort: "asc",
        },
        {
          label: "Tên",
          field: "ten",
          sort: "asc",
        },
        {
          label: "Giới tính",
          field: "gioitinh",
          sort: "asc",
        },
        {
          label: "Địa chỉ",
          field: "diachi",
          sort: "asc",
        },
        {
          label: "Số điện thoại",
          field: "sodienthoai",
          sort: "asc",
        },
        {
          label: "Chức vụ",
          field: "chucvu",
          sort: "asc",
        },
        {
          label: "Vai trò",
          field: "vaitro",
          sort: "asc",
        },
        {
          label: "Hành động",
          field: "action",
          sort: "asc",
        },
      ],
      rows: Getdata,
    };
    ////////////////////////
    return (
      <>
        <table id="TableManageUser">
          <MDBDataTable striped bordered small data={data} />
          {/* <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Number Phone</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.positionId}</td>
                    <td className="td" style={{display: "flex"}}>
                      <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody> */}
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    // editUserRedux: (id) => dispatch(actions.editUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
