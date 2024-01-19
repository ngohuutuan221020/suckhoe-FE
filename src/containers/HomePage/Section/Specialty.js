/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getAllSpecialty} from "../../../services/userService";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {
    let res = await getAllSpecialty();

    if (res && res.errorCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetail = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let {dataSpecialty} = this.state;
    return (
      <React.Fragment>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homePage.chuyenkhoaphobien" />
              </span>
              <button className="btn-section btn btn-light" onClick={() => this.props.history.push(`/full-specialty`)}>
                <FormattedMessage id="homePage.moreInfo" />
              </button>
            </div>
            <div className="section-body">
              {dataSpecialty && dataSpecialty.length > 0 ? (
                <Slider {...this.props.settings}>
                  {dataSpecialty &&
                    dataSpecialty.length > 0 &&
                    dataSpecialty.map((item, index) => {
                      return (
                        <div className="specialty-custimize" key={index}>
                          <div className="outer-background">
                            <img
                              className="background"
                              src={item.image ? item.image : bgImage}
                              onClick={() => this.handleViewDetail(item)}
                            />
                            <h4 className="position">{item.name}</h4>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                <Slider {...this.props.settings}>
                  <div className="specialty-custimize">
                    <div className="outer-background">
                      <img className="background" src={bgImage} />
                      {/* <h4 className="position">CHUYÊN KHOA PHỔ BIẾN</h4> */}
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
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
