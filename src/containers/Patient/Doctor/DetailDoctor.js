import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {getDetailInforDoctor} from "../../../services/userService";
import {LANGUAGES} from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import Comment from "../Facebook/Comment";
import LikeShare from "../Facebook/LikeShare";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
import Image from "../../../assets/avata.jpg";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currenDoctorId: -1,
      name: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currenDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      console.log("DATAAA", res.data.Doctor_Infor.Specialty.name);
      if (res && res.errorCode === 0) {
        this.setState({
          detailDoctor: res.data,
          name: res.data.Doctor_Infor.Specialty.name,
        });
      }
    }
  }
  render() {
    let {detailDoctor, name} = this.state;
    let {language} = this.props;

    console.log("state", this.state);
    console.log("props", this.props);

    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "http://localhost" : window.location.href;

    console.log("Doctor_Infor", this.state.name);
    return (
      <>
        <HomeHeader banner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img className="image-avata " src={detailDoctor && detailDoctor.image ? detailDoctor.image : Image} alt="" />
            </div>
            <div className="content-right">
              <div className="chuyenkhoa">Chuyên khoa: {this.state.name ? this.state.name : " "}</div>
              <div className="top">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="bottom">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown && detailDoctor.Markdown.description}</span>
                )}
              </div>
              <div className="like-share">
                <LikeShare dataHref={currentURL} />
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currenDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorIdFromParent={this.state.currenDoctorId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor">
            <Comment dataHref={currentURL} width={"100%"} />
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
