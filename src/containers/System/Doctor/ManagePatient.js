/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./ManagePatient.scss";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {getAllPatientForDoctor, postSendRemedy} from "../../../services/userService";
import moment from "moment";
import RemedyModel from "./RemedyModel";
import {toast} from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import image from "../../../assets/Comprehensive-service/161350-iconkham-tong-quan.png";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedy: false,
      isShowLoading: false,
      dataModal: {},
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let {userInfo} = this.props;
    let {currentDate} = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: userInfo.id,
      date: formatedDate,
    });
    if (res && res.errorCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtn = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedy: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedy: false,
      dataModal: {},
    });
  };
  sendRemedyModal = async (dataChild) => {
    let {dataModal} = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      language: this.props.language,
    });
    if (res && res.errorCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Thành công");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Không thành công");
    }
  };
  render() {
    let {language} = this.props;

    let {dataPatient, isOpenRemedy, dataModal} = this.state;
    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading ...">
          <div className="manage-patient-container">
            <div className="manage-patient-title">
              <FormattedMessage id="manage-patient.title" />
            </div>
            <div className="manage-patient-body row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-patient.chooseDate" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleChangeDatePicker}
                  value={this.state.currentDate}
                  // minDate={yesterday}
                />
              </div>

              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ Tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Số điện thoại</th>
                      <th>Triệu chứng</th>
                      <th>Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>{item.patientData.phoneNumber}</td>
                            <td>{item.patientData.reason}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => this.handleBtn(item)}>
                                Gửi hoá đơn
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <img src={image} />
                            Không có lịch khám bệnh!
                          </div>
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModel
            isOpenModal={isOpenRemedy}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedyModal={this.sendRemedyModal}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {language: state.app.language, userInfo: state.user.userInfo};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
