import { FaYoutube, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>©2022 All Rights Reserved.</p>
      <div className="footer-socials">
        <a href="https://youtube.com" target="_blank">
          <FaYoutube size={20} />
        </a>
        <a href="https://twitter.com" target="_blank">
          <FaTwitter size={20} />
        </a>
        <a href="https://facebook.com" target="_blank">
          <FaFacebookSquare size={20} />
        </a>
      </div>

      <nav>
        <a href="#">Contact us</a>
        <a href="#">Privacy Policies</a>
        <a href="#">Help</a>
      </nav>
    </footer>
  );
};
export default Footer;
