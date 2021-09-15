import PropTypes from "prop-types";
import { useEffect } from "react";

export default function Modal ({picture,onCloseModal, statusModal}) {

  useEffect(() => {
    if(statusModal) window.addEventListener("keydown", onCloseModal);
    if(!statusModal)window.removeEventListener("keydown", onCloseModal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusModal]);

    return (
      <div className="Overlay" onClick={onCloseModal}>
        <div className="Modal">
          <img src={picture.largeImageURL} alt={picture.tags} />
        </div>
      </div>
    );
  
}

Modal.propTypes = {
  picture: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
  statusModal:PropTypes.bool.isRequired,
};
