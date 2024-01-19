import React, {Component} from "react";
import {connect} from "react-redux";
import "./FullClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import {getAllClinic} from "../../../services/userService";
import bgImage from "../../../assets/images/LOGO-SUC-KHOE.jpg";
import {Button, Card, Container, Row} from "react-bootstrap";
import {ShimmerPostList} from "react-shimmer-effects";

class FullClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDoctor: {},
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {
    window.scrollTo(0, 0);
    let res = await getAllClinic();

    if (res && res.errorCode === 0) {
      this.setState({
        fullDoctor: res.data,
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let {fullDoctor} = this.state;

    return (
      <>
        <HomeHeader banner={false} />
        <Container>
          <Card.Body>
            <h3 style={{fontWeight: "600", textTransform: "uppercase"}}>Danh sách các CƠ SỞ Y TẾ</h3>
          </Card.Body>
          <Row style={{gap: "1rem", justifyContent: "center", marginBottom: "1rem", flexDirection: "column"}}>
            {fullDoctor && fullDoctor.length > 0 ? (
              fullDoctor.map((item, index) => {
                return (
                  <>
                    <Card style={{width: "18rem"}} key={index}>
                      <Card.Img variant="top" src={item.image} style={{width: "80%", margin: "0 auto"}} />
                      <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                        <Card.Title style={{fontSize: "1rem", fontWeight: "600", textTransform: "uppercase"}}>{item.name}</Card.Title>

                        <Button variant="primary" onClick={() => this.handleViewDetailDoctor(item)}>
                          Xem chi tiết cơ sở y tế
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            ) : (
              <div>
                <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(FullClinic);
