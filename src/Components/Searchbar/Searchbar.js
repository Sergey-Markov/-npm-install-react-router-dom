import { useState } from "react";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");

  function resset() {
    setImageName("");
  }

  const hadleAddInputValue = (e) => {
    setImageName(e.currentTarget.value.toLowerCase().trim());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(imageName);
    resset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={hadleAddInputValue}
          name="imageName"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
