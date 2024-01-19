/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./ProfileDoctor.scss";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import {getProfileDoctorById} from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getDoctorInfor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getDoctorInfor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errorCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }
  renderTimeBooking = (dataScheduleTimeModal) => {
    let {language} = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataScheduleTimeModal.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div className="time-day">
            {time} - {date}
          </div>
          <FormattedMessage id="patient.detail-doctor.booking-free" />
        </>
      );
    }
    return <></>;
  };
  render() {
    let {dataProfile} = this.state;

    let {language, isShowDescriptionDoctor, dataScheduleTimeModal, isShowMore, doctorId} = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img className="image-avata " src={dataProfile && dataProfile.image ? dataProfile.image : ""} alt="" />
            </div>
            <div className="content-right">
              <div className="top">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="bottom">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown && dataProfile.Markdown.description}</span>
                    )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                )}
              </div>
            </div>

            <div className="content-right-price">
              <div className="price">
                <FormattedMessage id={"admin.manage-doctor.price"} />
                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                    displayType="text"
                    thousandSeparator={true}
                    suffix="VND"
                  />
                ) : (
                  ""
                )}
                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ? (
                  <NumberFormat
                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                    displayType="text"
                    thousandSeparator={true}
                    suffix="$"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {isShowMore === true && (
            <div>
              <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {language: state.app.language};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
