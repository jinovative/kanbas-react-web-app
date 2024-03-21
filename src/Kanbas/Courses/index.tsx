import { courses } from '../../Kanbas/Database';
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { HiMiniBars3 } from 'react-icons/hi2';
import CourseNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import Grades from './Grades';
import './index.css';

function Courses({ courses }: { courses: any[] }) {
    const { courseId } = useParams();
    const location = useLocation();
    const course = courses.find((course) => course._id === courseId);
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentSection = pathSegments.pop() || 'home';
    const formattedSection = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);

    return (
        <div className="container">
            <div className="d-flex justify-content-between w-100">
                <nav
                    className="col-auto d-flex justify-content-center breadcrumb-custom"
                    aria-label="breadcrumb"
                    style={{
                        backgroundColor: 'transparent',
                    }}
                >
                    <ol
                        className="breadcrumb d-flex justify-content-center align-items-center"
                        style={{ fontSize: 'larger', backgroundColor: 'transparent' }}
                    >
                        <li>
                            <button
                                className="menu-toggle btn btn-link"
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: 'red',
                                }}
                            >
                                <HiMiniBars3 size="1.5em" />
                            </button>
                        </li>
                        <li
                            className="breadcrumb-item"
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: 'red',
                            }}
                        >
                            {course?.name}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {formattedSection}
                        </li>
                    </ol>
                </nav>
                <div className="col-auto d-flex justify-content-center btn pt-2 pb-4 pl-3 pr-3">
                    <button className="btn btn-outline-secondary">
                        <i className="fa-solid fa-glasses"></i> Student View
                    </button>
                </div>
            </div>
            <hr className="separator-line second-nav-bar" />
            <CourseNavigation />
            <div>
                <div className="overflow-y-scroll position-fixed bottom-0 end-0" style={{ left: '320px', top: '50px' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default Courses;
