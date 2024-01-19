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
    };
  }
  async componentDidMount() {
    this.getDataPatient();
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
      tenDoctor: item.doctorData.firstName,
      hoDoctor: item.doctorData.lastName,
      emailDoctor: item.doctorData.email,
      phoneNumberDoctor: item.doctorData.phoneNumber,
      addressDoctor: item.doctorData.address,
      genderDoctor: item.doctorData.genderData.valueVi,
      namePatient: item.patientData.firstName,
      emailPatient: item.patientData.email,
      addressPatient: item.patientData.address,
      genderPatient: item.patientData.genderData.valueVi,
      phonePatient: item.patientData.phoneNumber,
      reasonPatient: item.patientData.reason,
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

  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGenders: this.state.selectedOption,
    });
    console.log("selectedGenders", this.state.selectedGenders);
    this.setState({selectedOption}, () => console.log(`Option selected:`, this.state.selectedOption));
  };

  // sendRemedyModal = async (dataChild) => {
  //   let {dataModal} = this.state;
  //   this.setState({
  //     isShowLoading: true,
  //   });
  //   let res = await postSendRemedy({
  //     email: dataChild.email,
  //     imgBase64: dataChild.imgBase64,
  //     doctorId: dataModal.doctorId,
  //     patientId: dataModal.patientId,
  //     timeType: dataModal.timeType,
  //     patientName: dataModal.patientName,
  //     language: this.props.language,
  //   });
  //   if (res && res.errorCode === 0) {
  //     this.setState({
  //       isShowLoading: false,
  //     });
  //     toast.success("Thành công");
  //     this.closeRemedyModal();
  //     await this.getDataPatient();
  //   } else {
  //     this.setState({
  //       isShowLoading: false,
  //     });
  //     toast.error("Không thành công");
  //   }
  // };
  render() {
    let {language} = this.props;
    let {dataPatient, isOpenRemedy, dataModal} = this.state;

    const Getdata = [];
    if (dataPatient && dataPatient.length > 0) {
      dataPatient.forEach((item, index) => {
        Getdata.push({
          stt: index,
          trangthai: item.statusIdDataPatient.valueVi,
          thoigian: item.timeTypeDataPatient.valueVi,
          bacsi: item.doctorData.lastName + " " + item.doctorData.firstName,
          tenbenhnhan: item.patientData.firstName,
          trieuchung: item.patientData.reason,
          action: [
            <button className="btn btn-primary" onClick={() => this.handleBtn(item)}>
              Xem chi tiết
            </button>,
          ],
        });
      });
    } else {
      console.log("eror:", dataPatient);
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
    console.log(dataPatient);
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

              <div className="col-12 table-manage-patient">
                {/* <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Trạng thái</th>
                      <th>Thời gian</th>
                      <th>Bác sĩ</th>
                      <th>Tên bệnh nhân</th>
                      <th>Triệu chứng</th>
                      <th>Hành động</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.statusIdDataPatient.valueVi}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>
                              {item.doctorData.lastName} {item.doctorData.firstName}
                            </td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.reason}</td>
                            <td>
                              <button className="" onClick={() => this.handleBtn(item)}>
                                Xem chi tiết
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
                </table> */}
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
