import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount = () => {
    const { onCloseModal } = this.props;
    window.addEventListener('keydown', onCloseModal);
  };

  componentWillUnmount = () => {
    const { onCloseModal } = this.props;
    window.removeEventListener('keydown', onCloseModal);
  };

  render() {
    const { picture, onCloseModal } = this.props;
    return (
      <div className="Overlay" onClick={onCloseModal}>
        <div className="Modal">
          <img src={picture.largeImageURL} alt={picture.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  picture: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
};
