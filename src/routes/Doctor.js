/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom/";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManagePatientDoctor from "../containers/System/Doctor/ManagePatientDoctor";
import Header from "../containers/Header/Header";
class Doctor extends Component {
  render() {
    const {isLoggedIn} = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/doctor/manage-schedule" component={ManageSchedule} />
              <Route path="/doctor/manage-patient" component={ManagePatient} />
              <Route path="/doctor/manage-patient-doctor" component={ManagePatientDoctor} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
