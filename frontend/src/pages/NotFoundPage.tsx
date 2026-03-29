import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return <div>
        Oops, something went wrong!
        <Link to="/">Go back home</Link>
    </div>
};

export default NotFoundPage;
