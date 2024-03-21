import ModuleList from "../Modules/List";

import {
  FaBan,
  FaCloud,
  FaCloudDownloadAlt,
  FaHome,
  FaStream,
  FaBullhorn,
  FaChartBar,
  FaBell,
  FaCalendar,
} from "react-icons/fa";

function Home() {
  return (
    <div
      className="home-flex-container"
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <div className="container">
        <div className="row">
          <ModuleList />
          <div className="home-flex-container col-4" style={{}}>
            <div
              className="flex-grow-0 me-2 d-none d-lg-block"
              style={{ width: "250px" }}
            >
              <div className="button-group">
                <button type="button">
                  <FaCloud />
                  Import Existing Content
                </button>
                <button type="button">
                  <FaCloudDownloadAlt />
                  Import from Commons
                </button>
                <button type="button">
                  <FaHome />
                  Choose Home Page
                </button>
                <button type="button">
                  <FaStream />
                  View Course Stream
                </button>
                <button type="button">
                  <FaBullhorn />
                  New Announcement
                </button>
                <button type="button">
                  <FaChartBar />
                  New Analytics
                </button>
                <button type="button">
                  <FaBell />
                  View Course Notifications
                </button>
              </div>

              <ul className="status-list">{/* ... status items ... */}</ul>
            </div>

            {/* To Do Section */}
            <div className="header-section" style={{ width: "260px" }}>
              <h5>To Do</h5>
              <hr className="separator-line second-nav-bar" />
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="lecture-title">
                    <i className="fa fa-calendar"></i>
                    <span>
                      <a href="#">Lecture</a>
                    </span>
                  </div>
                  <div className="lecture-info">
                    <span className="lecture-course">CS4550.12631.202410</span>
                    <span className="date-time">Sep 11 at 11:45am</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="lecture-title">
                    <i className="fa fa-calendar"></i>
                    <span>
                      <a href="#">CS5610 06 SP23 Lecture</a>
                    </span>
                  </div>
                  <div className="lecture-info">
                    <span className="lecture-course">CS4550.12631.202410</span>
                    <span className="date-time">Sep 11 at 6pm</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="lecture-title">
                    <i className="fa fa-calendar"></i>
                    <span>
                      <a href="#">
                        CS5610 Web Development
                        <br />
                        Summer 1 2023 - LECTURE
                      </a>
                    </span>
                  </div>
                  <div className="lecture-info">
                    <span className="lecture-course">CS4550.12631.202410</span>
                    <span className="date-time">Sep 11 at 7pm</span>
                  </div>
                </li>
              </ul>
              <div>
                <a href="#">12 more in the next week...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
