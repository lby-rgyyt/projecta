import { Link } from "react-router-dom";

import { FiAlertCircle } from "react-icons/fi";
import "../styles/NotFound.css";

const NotFoundPage = () => {
    return (
        <div className="notfound-page">
          <div className="notfound-card">
            <FiAlertCircle className="notfound-icon" size={56} color="#5048e5" />
            <h2 className="notfound-title">Oops, something went wrong!</h2>
            <Link className="notfound-btn" to="/">Go Home</Link>
          </div>
        </div>
      );
};

export default NotFoundPage;
