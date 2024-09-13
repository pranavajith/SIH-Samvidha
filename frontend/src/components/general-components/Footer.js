import "./../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Samvidha. All rights reserved.</p>
      <ul className="footer-menu">
        <li>
          <a href="#privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="#terms">Terms of Service</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
    </footer>
  );
};

export { Footer };
