/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./ManagePatientDoctor.scss";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {getAllPatient, postSendRemedy} from "../../../services/userService";
import moment from "moment";
import FullThongTin from "./FullThongTin";
import {toast} from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import image from "../../../assets/Comprehensive-service/161350-iconkham-tong-quan.png";
import Select from "react-select";
import {MDBDataTable} from "mdbreact";
import "./custombootstrap.scss";
import {getFullDoctors} from "../../../services/userService";

const options = [
  {value: "New", label: "Lịch hẹn mới"},
  {value: "Confirmed", label: "Đã xác nhận"},
  {value: "Done", label: "Đã khám xong"},
];
class ManagePatientDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedy: false,
      isShowLoading: false,
      dataModal: {},
      selectedGenders: "",
      listDoctor: [],
      selectedDoctor: {},
    };
  }
  async componentDidMount() {
    this.getDataPatient();
    let res = await getFullDoctors();
    if (res && res.errorCode === 0) {
      this.setState({
        listDoctor: res.data,
      });
    }
  }
  getDataPatient = async () => {
    // let {userInfo} = this.props;
    let {currentDate} = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatient({
      // doctorId: userInfo.id,
      date: formatedDate,
    });
    if (res && res.errorCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

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
      tenDoctor: item.doctorData.firstName,
      hoDoctor: item.doctorData.lastName,
      emailDoctor: item.doctorData.email,
      phoneNumberDoctor: item.doctorData.phoneNumber,
      addressDoctor: item.doctorData.address,
      genderDoctor: item.doctorData.genderData.valueVi,
      namePatient: item.patientData === null ? " " : item.patientData.firstName,
      emailPatient: item.patientData === null ? " " : item.patientData.email,
      addressPatient: item.patientData === null ? " " : item.patientData.address,
      genderPatient: item.patientData === null ? " " : item.patientData.genderData.valueVi,
      phonePatient: item.patientData === null ? " " : item.patientData.phoneNumber,
      reasonPatient: item.patientData === null ? " " : item.patientData.reason,
      statusIdDataPatient: item.statusIdDataPatient.valueVi,
      timeTypeDataPatient: item.timeTypeDataPatient.valueVi,
      updatedAt: item.updatedAt,
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
  handleChangeSelect = async (selectedDoctors) => {
    this.setState({
      selectedDoctor: selectedDoctors,
    });
  };
  render() {
    let {language} = this.props;
    let {dataPatient, isOpenRemedy, dataModal, listDoctor, selectedDoctor} = this.state;
    //////////////////////////
    const Getdata = [];

    if (dataPatient && dataPatient.length > 0) {
      dataPatient
        .filter((value) => {
          if (this.state.selectedDoctor.value) {
            return value.doctorId === this.state.selectedDoctor.value;
          } else {
            return true;
          }
        })
        .forEach((item, index) => {
          Getdata.push({
            stt: index,
            trangthai: item.statusIdDataPatient.valueVi,
            thoigian: item.timeTypeDataPatient.valueVi,
            bacsi: item.doctorData.lastName + " " + item.doctorData.firstName,
            tenbenhnhan: item.patientData === null ? " " : item.patientData.firstName,
            trieuchung: item.patientData === null ? " " : item.patientData.reason,
            action: [
              <button className="btn btn-primary" onClick={() => this.handleBtn(item)}>
                Xem chi tiết
              </button>,
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
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "trangthai",
          sort: "asc",
        },
        {
          label: "Thời gian",
          field: "thoigian",
          sort: "asc",
        },
        {
          label: "Bác sĩ",
          field: "bacsi",
          sort: "asc",
        },
        {
          label: "Tên bệnh nhân",
          field: "tenbenhnhan",
          sort: "asc",
        },
        {
          label: "Triệu chứng",
          field: "trieuchung",
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
    const GetDataDoctor = [];
    if (listDoctor && listDoctor.length > 0) {
      listDoctor.forEach((item, index) => {
        GetDataDoctor.push({
          label: `${item.lastName} ${item.firstName}`,
          value: item.id,
        });
      });
    }
    GetDataDoctor.unshift({
      label: "Tất cả",
      value: null,
    });
    const options = GetDataDoctor;
    //////////////////////

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
                <DatePicker className="form-control" onChange={this.handleChangeDatePicker} value={this.state.currentDate} />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-patient.chooseDoctor" />
                </label>

                <Select value={this.state.selectedDoctor} onChange={this.handleChangeSelect} options={options} />
              </div>

              <div className="col-12 table-manage-patient">
                <MDBDataTable striped bordered small data={data} />
              </div>
            </div>
          </div>
          <FullThongTin
            isOpenModal={isOpenRemedy}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            // sendRemedyModal={this.sendRemedyModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatientDoctor);
