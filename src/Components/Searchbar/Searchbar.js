import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  resset() {
    this.setState({ imageName: '' });
  }

  hadleAddInputValue = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase().trim() });
  };
  handleSubmit = e => {
    const { imageName } = this.state;
    e.preventDefault();
    this.props.onSubmit(imageName);
    this.resset();
  };

  render() {
    const { imageName } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.hadleAddInputValue}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
