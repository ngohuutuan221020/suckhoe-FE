import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter as Router} from "connected-react-router";
import {history} from "../redux";
import {ToastContainer} from "react-toastify";
import {userIsAuthenticated, userIsNotAuthenticated} from "../hoc/authentication";
import {path} from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import CustomScrollBar from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import FullDoctor from "./Patient/Doctor/FullDoctor";
import FullSpectialty from "./Patient/Doctor/FullSpectialty";
import FullClinic from "./Patient/Doctor/FullClinic";
import Doctor from "../routes/Doctor";
import VerifyEmailBooking from "./Patient/VerifyEmailBooking";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import ScrollToTop from "react-scroll-to-top";

class App extends Component {
  handlePersistorState = () => {
    const {persistor} = this.props;
    let {bootstrapped} = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({bootstrapped: true}))
          .catch(() => this.setState({bootstrapped: true}));
      } else {
        this.setState({bootstrapped: true});
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <ScrollToTop smooth />

              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route path={path.HOMEPAGE} component={HomePage} />

                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />

                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />

                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route path={path.FULLDOCTOR} component={FullDoctor} />
                <Route path={path.FULLSPECTIALTY} component={FullSpectialty} />
                <Route path={path.FULLCLINIC} component={FullClinic} />
                <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />

                <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmailBooking} />
              </Switch>
              {/* </CustomScrollBar> */}
            </div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
