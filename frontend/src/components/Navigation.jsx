import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="Navigation-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Wallet">My Wallet</Link>
        </li>
        <li>
          <Link to="/Explorer">Explorer</Link>
        </li>
        <li>
          <Link to="/Transaction">Send Transaction</Link>
        </li>
      </ul>
    </nav>
  );
};