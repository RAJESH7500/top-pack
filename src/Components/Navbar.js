import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getReposText } from "../utils/api";

const Navbar = ({ setRepos, importedRepos }) => {
  const [searchText, setSearchText] = useState(null);

  const handleOnchange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getReposText(searchText);
    data.forEach((item) => {
      if (importedRepos.includes(item.id)) {
        item.isImported = true;
      }
      return item;
    });

    setRepos(data);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="top-packages">
              Top Packages
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Repositories"
            aria-label="Search"
            onChange={handleOnchange}
            value={searchText}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
