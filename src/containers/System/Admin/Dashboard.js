/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import "./Dashboard.scss";
import TableManageUser from "./TableManageUser";
import {Button, Card, Container, Row, Form} from "react-bootstrap";
import {getFullDoctors} from "../../../services/userService";
import {getBooking} from "../../../services/userService";
import {getAllPatientForAdmin} from "../../../services/userService";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Bar} from "react-chartjs-2";
import Select from "react-select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const d = new Date();
let years = d.getFullYear();

const options = [
  {value: `${years}`, label: `${years}`},
  {value: `${years - 1}`, label: `${years - 1}`},
  {value: `${years - 2}`, label: `${years - 2}`},
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      roleArr: [],
      booking: [],
      numbooking: [],
      number: "",
      fullDoctor: [],
      fullPatient: [],
      isOpen: false,
      role: "",
    };
  }

  async componentDidMount() {
    this.props.getRoleStart();
    //lay dat lich
    let booking = await getBooking();
    if (booking && booking.errorCode === 0) {
      this.setState({
        booking: booking.data,
      });
    }
    //so benh nhan
    await this.getAllUsersFromReact();
    //so bac si
    let res = await getFullDoctors();
    if (res && res.errorCode === 0) {
      this.setState({
        fullDoctor: res.data,
      });
    }
    //LAY SO dat lich
    // let sodatlich = this.sodatlich(this.state.booking, this.state.select.value);
    // console.log("sodatlich", sodatlich);
    //tong so ca kham
    let dataSelect = this.buildDataInputSelect(this.state.fullDoctor);
    let data = this.sumArray(dataSelect);
    this.setState({number: data});
  }

  sodatlich = (dataInput, dataInput2) => {
    console.log("1", dataInput);
    console.log("2", dataInput2);
    const d = new Date();
    let year = dataInput2;
    let arrNumBooking = [];
    let num12 = dataInput.filter((item) => {
      if (item) {
        return `${year}/12/01` <= item.createdAt && item.createdAt < `${year + 1}/01/01`;
      } else {
        return true;
      }
    });
    let num11 = dataInput.filter((item) => {
      if (item) {
        return `${year}/11/01` <= item.createdAt && item.createdAt < `${year}/12/01`;
      } else {
        return true;
      }
    });
    let num10 = dataInput.filter((item) => {
      if (item) {
        return `${year}/10/01` <= item.createdAt && item.createdAt < `${year}/11/01`;
      } else {
        return true;
      }
    });
    let num09 = dataInput.filter((item) => {
      if (item) {
        return `${year}/09/01` <= item.createdAt && item.createdAt < `${year}/10/01`;
      } else {
        return true;
      }
    });
    let num08 = dataInput.filter((item) => {
      if (item) {
        return `${year}/08/01` <= item.createdAt && item.createdAt < `${year}/09/01`;
      } else {
        return true;
      }
    });
    let num07 = dataInput.filter((item) => {
      if (item) {
        return `${year}/07/01` <= item.createdAt && item.createdAt < `${year}/08/01`;
      } else {
        return true;
      }
    });
    let num06 = dataInput.filter((item) => {
      if (item) {
        return `${year}/06/01` <= item.createdAt && item.createdAt < `${year}/07/01`;
      } else {
        return true;
      }
    });
    let num05 = dataInput.filter((item) => {
      if (item) {
        return `${year}/05/01` <= item.createdAt && item.createdAt < `${year}/06/01`;
      } else {
        return true;
      }
    });
    let num04 = dataInput.filter((item) => {
      if (item) {
        return `${year}/04/01` <= item.createdAt && item.createdAt < `${year}/05/01`;
      } else {
        return true;
      }
    });
    let num03 = dataInput.filter((item) => {
      if (item) {
        return `${year}/03/01` <= item.createdAt && item.createdAt < `${year}/04/01`;
      } else {
        return true;
      }
    });
    let num02 = dataInput.filter((item) => {
      if (item) {
        return `${year}/02/01` <= item.createdAt && item.createdAt < `${year}/03/01`;
      } else {
        return true;
      }
    });
    let num01 = dataInput.filter((item) => {
      if (item) {
        return `${year}/01/01` <= item.createdAt && item.createdAt < `${year}/02/01`;
      } else {
        return true;
      }
    });
    arrNumBooking.push(
      num01.length,
      num02.length,
      num03.length,
      num04.length,
      num05.length,
      num06.length,
      num07.length,
      num08.length,
      num09.length,
      num10.length,
      num11.length,
      num12.length
    );
    console.log("arrNumBooking >>>", arrNumBooking);
    this.setState({
      numbooking: arrNumBooking,
    });
  };

  getAllUsersFromReact = async () => {
    let response = await getAllPatientForAdmin();
    if (response && response.errorCode === 0) {
      this.setState({
        fullPatient: response.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
  }
  sumArray = (dataSelect) => {
    let sum = 0;
    dataSelect.map((item) => {
      sum += item;
    });
    return sum;
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object = item.Doctor_Infor.count;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = (selectedOptions) => {
    this.sodatlich(this.state.booking, selectedOptions.value);
    this.setState({
      select: selectedOptions,
    });
  };
  render() {
    let roles = this.state.roleArr;
    let language = this.props.language;
    let {role} = this.state;

    console.log("state", this.state);
    console.log("value", this.state.select.value);
    console.log("props", this.props);

    let data = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Số ca đặt lịch",
          data: this.state.numbooking,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: ["rgb(201, 203, 207)"],
          borderWidth: 1,
        },
        // {
        //   label: "Số ca đã khám",
        //   data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        //   backgroundColor: "rgb(46, 213, 115)",
        //   borderColor: ["rgb(201, 203, 207)"],
        //   borderWidth: 1,
        // },
      ],
    };
    let option = {
      animation: false,
    };
    let myNums = this.state.numbooking;

    // create a variable for the sum and initialize it
    let sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < myNums.length; i++) {
      sum += myNums[i];
    }
    console.log("sum", sum);
    return (
      <>
        <Container>
          <Card.Title className="m-3" style={{fontSize: "2rem", fontWeight: "600", textAlign: "center"}}>
            Dashboard
          </Card.Title>

          <Row className="col-12" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Card bg="primary" text="light" style={{width: "18rem"}} className="mb-2">
              <Card.Header style={{textTransform: "uppercase"}}>Tổng số ca đặt lịch</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.booking.length}</Card.Title>
              </Card.Body>
            </Card>
            <Card bg="success" text="light" style={{width: "18rem"}} className="mb-2">
              <Card.Header style={{textTransform: "uppercase"}}>Tổng số ca đã khám</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.number}</Card.Title>
              </Card.Body>
            </Card>

            <Card bg="danger" text="light" style={{width: "18rem"}} className="mb-2">
              <Card.Header style={{textTransform: "uppercase"}}>Tổng số bệnh nhân</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.fullPatient.length}</Card.Title>
              </Card.Body>
            </Card>
            <Card bg="info" text="light" style={{width: "18rem"}} className="mb-2">
              <Card.Header style={{textTransform: "uppercase"}}>Tổng số bác sĩ</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.fullDoctor.length}</Card.Title>
              </Card.Body>
            </Card>
          </Row>
          {/* <label>
              <FormattedMessage id="manage-user.roleId" />
            </label>
            <select
              className="form-control"
              value={role}
              onChange={(event) => {
                this.onChangeInput(event, "role");
              }}
            >
              {roles &&
                roles.length > 0 &&
                roles.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
            <div className="col-12 mb-5">
              <TableManageUser action={this.state.action} />
            </div> */}

          <Row style={{alignItems: "center"}}>
            <Card.Body className="col-3">
              <Select options={options} onChange={this.handleChangeSelect} placeholder={"Chọn năm"} />
            </Card.Body>
            <Card.Body className="col-5">
              <Card.Title>Tổng số ca đặt lịch trong năm: {sum}</Card.Title>
            </Card.Body>
          </Row>
          <div className="chart">
            <Bar data={data} option={option} height={90} />
          </div>
          <TableManageUser />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    roleRedux: state.admin.roles,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
