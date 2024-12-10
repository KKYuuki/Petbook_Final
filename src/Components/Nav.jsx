import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Nav.css";

function Nav() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleLogoutClick = () => {
    setShowModal(true); // Show the logout modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without logging out
  };

  const handleConfirmLogout = () => {
    // Perform actual logout action here (e.g., clear session or redirect)
    console.log("Logging out...");
    setShowModal(false); // Close the modal after confirming logout
  };

  return (
    <div className="Sticky">
      {/* Wrap the logo in a Link to navigate back to the home page */}
      <Link to="/home" className="AppName">
        <h1>
          <img className="AppName2" src="/src/assets/img/icon.png" alt="Logo" />
          Pet<span className="petBook">Book</span>
        </h1>
      </Link>

      <Stack gap={3}>
        <Link to="/home" className="NavButtons">
          <div className="p-1">
            <img className="ButtonIcon" src="/src/assets/pet.svg" alt="Home" />
            Home
          </div>
        </Link>
        <Link to="/search" className="NavButtons">
          <div className="p-1">
            <img className="ButtonIcon" src="/src/assets/SearchSvg.svg" alt="Search" />
            SEARCH
          </div>
        </Link>
        <Link to="/notifications" className="NavButtons">
          <div className="p-1">
            <img className="ButtonIcon" src="/src/assets/NotificationSvg.svg" alt="Notifications" />
            NOTIFICATIONS
          </div>
        </Link>
        <Link to="/create" className="NavButtons">
          <div className="p-1">
            <img className="ButtonIcon" src="/src/assets/CreateSvg.svg" alt="Create" />
            CREATE
          </div>
        </Link>
        <Link to="/profile" className="NavButtons">
          <div className="p-1">
            <img className="ButtonIconProfile" src="/src/assets/img/R.jfif" alt="Profile" />
            PROFILE
          </div>
        </Link>

        {/* Logout Button */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogoutClick}
          style={{
            background: 'linear-gradient(151deg, rgba(255,255,255,1) 15%, rgba(101,251,255,0.76) 100%)',
            color: 'black',
            fontWeight: 'Bold',
            fontFamily: '"Concert One", sans-serif',
            borderStyle: 'solid',
          }}
        >
          LOGOUT
        </button>

        {/* Modal for Logout Confirmation */}
        {showModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1050, // Ensure modal is on top
              position: "fixed", // Fix position to overlay content
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="false"
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content"
                style={{
                  background:
                    "linear-gradient(151deg, rgba(255,255,255,1) 15%, rgba(101,251,255,0.76) 100%)",
                  color: "black",
                  fontWeight: "Bold",
                  fontFamily: '"Concert One", sans-serif',
                  borderStyle: "solid",
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Logout Petbook
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Are you sure you want to Logout?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    CANCEL
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirmLogout}>
                    LOGOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Stack>
    </div>
  );
}

export default Nav;
