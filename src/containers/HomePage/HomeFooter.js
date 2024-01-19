/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
class HomeFooter extends Component {
  render() {
    const d = new Date();
    let year = d.getFullYear();

    return (
      <React.Fragment>
        <section class="">
          <footer class="text-center text-white" style={{backgroundColor: "#0a4275"}}>
            {/* <div class="container pt-4 pb-0">
              <section class="">
                <p class="d-flex justify-content-center align-items-center">
                  <span class="me-3">Register for free</span>
                  <button data-mdb-ripple-init type="button" class="btn btn-outline-light btn-rounded">
                    Sign up!
                  </button>
                </p>
              </section>
            </div> */}
            <div class="container pt-4 pb-0">
              <section class="mb-4">
                <a
                  data-mdb-ripple-init
                  class="btn text-white btn-floating m-1"
                  style={{backgroundColor: "#3b5998"}}
                  href="https://www.facebook.com/botsuckhoevietnam/"
                  role="button"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  data-mdb-ripple-init
                  class="btn text-white btn-floating m-1"
                  style={{backgroundColor: "#333333"}}
                  href="https://github.com/ngohuutuan221020"
                  role="button"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i class="fab fa-github"></i>
                </a>
              </section>
            </div>

            <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
              © {year} Copyright:{" "}
              <a class="text-white" href="/login">
                DoAnTotNghiep | Created by Ngo Huu Tuan
              </a>
              <br />
              <a class="text-white" href="/home">
                Contact | Email | ngohuutuan221020@gmail.com
              </a>
            </div>
          </footer>
        </section>
        {/* <div className="Home-Footer">
          <div className="container-footer">
            &copy; {year} Sức khoẻ VIỆT NAM{"  "}
            <a href="./login" target="_blank" style={{color: "white"}}>
              Đồ án tôt nghiệp
            </a>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
