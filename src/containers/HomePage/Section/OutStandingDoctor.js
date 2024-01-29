/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
require("dotenv").config();
const REACT_APP_IS_LOCALHOST = process.env.REACT_APP_IS_LOCALHOST;

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    let {language} = this.props;
    console.log("state", this.state);
    console.log("arrDoctors", arrDoctors);
    console.log("props", this.props);
    return (
      <React.Fragment>
        <div className="section-share section-outStanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homePage.outStandingDoctor" />
              </span>
              <button className="btn-section btn btn-light" onClick={() => this.props.history.push(`/full-doctor`)}>
                <FormattedMessage id="homePage.moreInfo" />
              </button>
            </div>
            <div className="section-body">
              {arrDoctors && arrDoctors.length > 0 ? (
                <Slider {...this.props.settings}>
                  {arrDoctors &&
                    arrDoctors.length > 0 &&
                    arrDoctors.map((item, index) => {
                      let imagebase = "";
                      if (item.image) {
                        imagebase = Buffer.from(item.image, "base64").toString("binary");
                      }
                      let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                      let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                      return (
                        <div className="specialty-custimize" key={index}>
                          <div className="outer-background">
                            <img
                              className="background avata-doctor"
                              src={imagebase ? imagebase : bgImage}
                              onClick={() => this.handleViewDetailDoctor(item)}
                            />
                            <div className="position text-center">
                              <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                              {+REACT_APP_IS_LOCALHOST === 1 ? (
                                <div style={{color: "#167ac6"}}>Tổng số ca khám: {item.Doctor_Infor.count}</div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                <Slider {...this.props.settings}>
                  <div className="specialty-custimize">
                    <div className="outer-background">
                      <img className="background avata-doctor" src={bgImage} />
                      <div className="position text-center">{/* <div>BÁC SĨ NỔI BẬT</div> */}</div>
                    </div>
                  </div>
                </Slider>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
