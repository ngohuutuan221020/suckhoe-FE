/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getAllClinic} from "../../../services/userService";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {FormattedMessage} from "react-intl";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errorCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let {dataClinic} = this.state;
    return (
      <React.Fragment>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homePage.cosoyte" />
              </span>
              <button className="btn-section btn btn-light" onClick={() => this.props.history.push(`/full-clinic`)}>
                <FormattedMessage id="homePage.moreInfo" />
              </button>
            </div>
            <div className="section-body">
              {dataClinic && dataClinic.length > 0 ? (
                <Slider {...this.props.settings}>
                  {dataClinic &&
                    dataClinic.length > 0 &&
                    dataClinic &&
                    dataClinic.map((item, index) => {
                      return (
                        <div className="specialty-custimize" key={index}>
                          <div className="outer-background">
                            <img
                              src={item.image ? item.image : bgImage}
                              className="background image-clinic"
                              onClick={() => this.handleViewDetailClinic(item)}
                            />
                            <h3 className="text-clinic">{item.name}</h3>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                <Slider {...this.props.settings}>
                  <div className="specialty-custimize">
                    <div className="outer-background">
                      <img src={bgImage} className="background image-clinic" />
                      {/* <h3 className="text-clinic">CƠ SỞ Y TẾ</h3> */}
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
