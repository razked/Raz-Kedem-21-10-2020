import React from "react";
import styled from "styled-components";
import "./Hamburger.css";

const Button = styled.div`
  z-index: 100;
  display: none;

  .hamburger-inner {
    background-color: ${({ theme }) => theme.text};
    &::before {
      background-color: ${({ theme }) => theme.text};
    }
    &::after {
      background-color: ${({ theme }) => theme.text};
    }
  }

  .is-active {
    .hamburger-inner {
      background-color: ${({ theme }) => theme.text};
      &::before {
        background-color: ${({ theme }) => theme.text};
      }
      &::after {
        background-color: ${({ theme }) => theme.text};
      }
    }
  }

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const Hamburger = (props) => {
  return (
    <Button>
      <button
        className={`hamburger hamburger--collapse ${
          props.active ? "is-active" : null
        }`}
        type="button"
        onClick={props.onClick}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </Button>
  );
};

export default Hamburger;
