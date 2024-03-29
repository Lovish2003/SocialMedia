import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import "./App.css"

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div className="header">
      <header className="header">
        <Link to="/" className="logo">
          BLOG APP
        </Link>
        <nav className="nav">
          {username && (
            <>
              <Link to="/create" className="nav-link">
                Create new post
              </Link>
              <a className="nav-link" onClick={logout}>
                Logout ({username})
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
