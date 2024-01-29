import React, {Component} from "react";
import {connect} from "react-redux";
import "./FullSpectialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {getFullSpecialty} from "../../../services/userService";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
import {Button, Card, Container, Row, Form} from "react-bootstrap";
import {ShimmerPostList} from "react-shimmer-effects";

class FullSpectialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDoctor: {},
      search: "",
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {
    window.scrollTo(0, 0);
    let res = await getFullSpecialty();

    if (res && res.errorCode === 0) {
      this.setState({
        fullDoctor: res.data,
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  search = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  render() {
    let {fullDoctor} = this.state;
    let {search} = this.state;

    return (
      <>
        <HomeHeader banner={false} />
        <Container>
          <Card.Body>
            <h3 style={{fontWeight: "600", textTransform: "uppercase"}}>Danh sách các chuyên khoa</h3>
          </Card.Body>
          <Card.Body>
            <Form.Control onChange={this.search} placeholder="Tìm kiếm cơ sở y tế" />
          </Card.Body>
          <Row style={{gap: "1rem", justifyContent: "center", marginBottom: "1rem"}}>
            {fullDoctor && fullDoctor.length > 0 ? (
              fullDoctor
                .filter((item) => {
                  return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search);
                })
                .map((item, index) => {
                  return (
                    <>
                      <Card style={{width: "18rem"}} key={index}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                          <Card.Title style={{fontSize: "1rem", fontWeight: "600", textTransform: "uppercase"}}>{item.name}</Card.Title>

                          <Button variant="primary" onClick={() => this.handleViewDetailDoctor(item)}>
                            Xem chi tiết chuyên khoa
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

export default connect(mapStateToProps, mapDispatchToProps)(FullSpectialty);
