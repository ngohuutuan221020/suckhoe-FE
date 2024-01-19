/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import "./UserManage.scss";
import {getAllUser, createNewUserService, deleteUserService, editUserService} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import {emitter} from "../../utils/emitter";
import img from "../../assets/images/background-manage.jpg";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUser("ALL");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({isOpenModalUser: true});
  };
  toggleModalEditUser = () => {
    this.setState({isOpenModalEditUser: !this.state.isOpenModalEditUser});
  };
  toggleModalUser = () => {
    this.setState({isOpenModalUser: !this.state.isOpenModalUser});
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errorCode !== 0) {
        alert(response.errorMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (item) => {
    try {
      let res = await deleteUserService(item.id);
      if (res && res.errorCode === 0) {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (item) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: item,
    });
  };
  doEditUser = async (item) => {
    try {
      let res = await editUserService(item);
      if (res && res.errorCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errorCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrayUsers = this.state.arrUsers;
    const {language, userInfo, all} = this.props;

    return (
      <div className="body-image">
        <div className="card1">
          <div className="card-body">
            <h1>Xin chào {userInfo && userInfo.firstName ? userInfo.lastName + " " + userInfo.firstName : ""}</h1>
            <div>ID: {userInfo && userInfo.firstName ? userInfo.id : ""}</div>
            <div>Email: {userInfo && userInfo.email ? userInfo.email : ""}</div>
          </div>
        </div>
        {/* <img src={img} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
