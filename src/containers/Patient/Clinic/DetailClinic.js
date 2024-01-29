/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./DetailClinic.scss";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getAllDetailClinic, getAllCodeService} from "../../../services/userService";
import _ from "lodash";
import Select from "react-select";
import {Button, Card, Container, Row, Form, InputGroup} from "react-bootstrap";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataClinic: {},
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailClinic({
        id: id,
      });

      if (res && res.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.specialtyId}`);
    }
  };
  render() {
    let {language} = this.props;
    let {arrDoctorId, dataClinic} = this.state;

    console.log("statecl", this.state);
    console.log("dataClinic", dataClinic);

    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader banner={false} />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataClinic && !_.isEmpty(dataClinic) && (
                <>
                  <div className="name-clinic">{dataClinic.name}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
            </div>
            <div>
              <Card.Body className="textChuenKhoa">
                <h3 style={{fontWeight: "600", fontSize: "2rem", textTransform: "uppercase"}}>
                  Danh sách các chuyên khoa thuộc cơ sở y tế
                </h3>
              </Card.Body>
              {dataClinic.doctorClinic &&
                dataClinic.doctorClinic.length > 0 &&
                dataClinic.doctorClinic.map((item, index) => {
                  console.log("map", item);
                  let imagebase = "";
                  if (item.Specialty.image.data) {
                    imagebase = Buffer.from(item.Specialty.image.data, "base64").toString("binary");
                  }

                  return (
                    <>
                      <Card className="mb-3">
                        <Row className="g-0">
                          <div className="col-md-2" style={{height: "100px"}}>
                            <img
                              className="imgChuyenKhoa"
                              style={{height: "100%", cursor: "pointer"}}
                              src={imagebase}
                              onClick={() => this.handleViewDetailDoctor(item)}
                            />
                            ;
                          </div>
                          <div className="col-md-6">
                            <Card.Body className="textChuenKhoa" style={{fontWeight: "500", fontSize: "2rem"}}>
                              {item.Specialty.name}
                            </Card.Body>
                          </div>
                        </Row>
                      </Card>
                    </>
                  );
                })}
            </div>

            {/* {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="detail-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor doctorId={item} isShowDescriptionDoctor={true} isShowMore={true} />
                      </div>
                    </div>
                    <div className="detail-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-info">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })} */}
          </div>
          <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
