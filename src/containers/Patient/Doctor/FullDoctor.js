import React, {Component, useEffect, useState} from "react";

import {connect} from "react-redux";
import "./FullDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {getFullDoctors} from "../../../services/userService";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
import {Button, Card, Container, Row, Form, InputGroup} from "react-bootstrap";
import {ShimmerPostList} from "react-shimmer-effects";

class FullDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDoctor: {},
      selectedGenders: "",
      search: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {
    window.scrollTo(0, 0);
    let res = await getFullDoctors();

    if (res && res.errorCode === 0) {
      this.setState({
        fullDoctor: res.data,
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };

  handleChangeSelect = (e) => {
    this.setState({
      selectedGenders: e.target.value,
    });
  };
  search = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    let {fullDoctor, search} = this.state;

    return (
      <>
        <HomeHeader banner={false} />
        <Container>
          <Card.Body>
            <h3 style={{fontWeight: "600", textTransform: "uppercase"}}>Danh sách các bác sĩ</h3>
          </Card.Body>
          <Card.Body>
            <Form.Control onChange={this.search} placeholder="Tìm kiếm bác sĩ" />
          </Card.Body>
          <Row style={{gap: "1rem", justifyContent: "center", marginBottom: "1rem"}}>
            {fullDoctor && fullDoctor.length > 0 ? (
              fullDoctor
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.firstName.toLowerCase().includes(search) +
                        item.lastName.toLowerCase().includes(search) +
                        item.positionData.valueVi.toLowerCase().includes(search);
                })
                .map((item, index) => {
                  let imagebase = "";
                  if (item.image) {
                    imagebase = Buffer.from(item.image, "base64").toString("binary");
                  }
                  let nameVi = "";
                  if (item) {
                    nameVi = ` ${item.positionData.valueVi}: ${item.lastName} ${item.firstName}`;
                  }
                  return (
                    <>
                      <Card style={{width: "18rem"}} key={index}>
                        <Card.Img variant="top" src={imagebase} />
                        <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                          <Card.Title style={{fontSize: "1rem", fontWeight: "600"}}>{nameVi}</Card.Title>
                          <Card.Text className="suptitle-fulldoctor">
                            {"Số điện thoại: "} {item.phoneNumber}
                          </Card.Text>
                          <Card.Text className="suptitle-fulldoctor">
                            {"Địa chỉ: "} {item.address}
                          </Card.Text>
                          <Button variant="primary" onClick={() => this.handleViewDetailDoctor(item)}>
                            Xem chi tiết bác sĩ
                          </Button>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })
            ) : (
              <div>
                <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={1} gap={30} />;
              </div>
            )}
          </Row>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullDoctor);
