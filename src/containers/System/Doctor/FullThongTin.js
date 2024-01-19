/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./FullThongTin.scss";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import _ from "lodash";
import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";

class FullThongTin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    if (this.props.dataModal) {
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
    }
  }

  render() {
    let {isOpenModal, dataModal, closeRemedyModal} = this.props;
    let fullname = `${dataModal.hoDoctor} ${dataModal.tenDoctor} `;
    return (
      <>
        <Modal className="remedy-modal-container" isOpen={isOpenModal} size="lg" centered={false}>
          <ModalHeader className="remedy-modal-header">
            <div>Thông tin lịch khám bệnh</div>
          </ModalHeader>
          <ModalBody className="remedy-modal-body">
            <div className="row">
              <div className="col-4 form-group">
                <label>Email bác sĩ</label>
                <input className="form-control" type="email" value={dataModal.emailDoctor} />
              </div>
              <div className="col-4 form-group">
                <label>Tên bác sĩ</label>
                <input className="form-control" type="email" value={fullname} />
              </div>
              <div className="col-4 form-group">
                <label>SĐT bác sĩ</label>
                <input className="form-control" type="email" value={dataModal.phoneNumberDoctor} />
              </div>
              <div className="col-4 form-group">
                <label>Email bệnh nhân</label>
                <input className="form-control" type="email" value={dataModal.emailPatient} />
              </div>
              <div className="col-4 form-group">
                <label>Tên bệnh nhân</label>
                <input className="form-control" type="email" value={dataModal.namePatient} />
              </div>
              <div className="col-4 form-group">
                <label>Địa chỉ bệnh nhân</label>
                <input className="form-control" type="email" value={dataModal.addressPatient} />
              </div>
              <div className="col-4 form-group">
                <label>Giới tính bệnh nhân</label>
                <input className="form-control" type="email" value={dataModal.genderPatient} />
              </div>
              <div className="col-4 form-group">
                <label>SĐT bệnh nhân</label>
                <input className="form-control" type="email" value={dataModal.phonePatient} />
              </div>
              <div className="col-4 form-group">
                <label>Lý do khám bệnh</label>
                <input className="form-control" type="email" value={dataModal.reasonPatient} />
              </div>
              <div className="col-4 form-group">
                <label>Trạng thái lịch khám</label>
                <input className="form-control" type="email" value={dataModal.statusIdDataPatient} />
              </div>
              <div className="col-4 form-group">
                <label>Thời gian khám bệnh</label>
                <input className="form-control" type="email" value={dataModal.timeTypeDataPatient} />
              </div>
              <div className="col-4 form-group">
                <label>Ngày tạo</label>
                <input className="form-control" type="email" value={dataModal.updatedAt} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="remedy-modal-footer">
            <Button className="px-3" color="secondary" onClick={closeRemedyModal}>
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {language: state.app.language, genders: state.admin.genders};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FullThongTin);
