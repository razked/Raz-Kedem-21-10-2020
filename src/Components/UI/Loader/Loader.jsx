import React from "react";
import styled from "styled-components";

import "./Loader.scss";

// styled
const LoaderWrapper = styled.div`
  .loader-wrapper {
    .lds-ellipsis {
      div {
        background: ${({ theme }) => theme.text};
      }
    }
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="loader-wrapper">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </LoaderWrapper>
  );
};

export default Loader;
