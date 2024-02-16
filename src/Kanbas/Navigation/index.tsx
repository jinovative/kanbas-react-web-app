import { Link, useLocation } from 'react-router-dom';
import './index.css';
import {
    FaTachometerAlt,
    FaRegUserCircle,
    FaBook,
    FaRegCalendarAlt,
    FaEnvelope,
    FaHistory,
    FaTv,
    FaUsers,
    FaQuestion,
} from 'react-icons/fa';
import homepageImage from '../NEUlogo.jpg';

function KanbasNavigation() {
    const links = [
        { label: ' ', icon: <img src={homepageImage} alt="Homepage" className="custom-icon" /> },
        { label: 'Account', icon: <FaRegUserCircle className="fs-2" /> },
        { label: 'Dashboard', icon: <FaTachometerAlt className="fs-2" /> },
        { label: 'Courses', icon: <FaBook className="fs-2" /> },
        { label: 'Calendar', icon: <FaRegCalendarAlt className="fs-2" /> },
        { label: 'Inbox', icon: <FaEnvelope className="fs-2" /> },
        { label: 'History', icon: <FaHistory className="fs-2" /> },
        { label: 'Studio', icon: <FaTv className="fs-2" /> },
        { label: 'Commons', icon: <FaUsers className="fs-2" /> },
        { label: 'Help', icon: <FaQuestion className="fs-1" /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? 'wd-active' : ''}>
                    <Link to={`/Kanbas/${link.label}`}>
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default KanbasNavigation;
