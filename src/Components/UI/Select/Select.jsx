import React from "react";
import styled from "styled-components";

import "./Select.scss";

// styled
const OptionSelect = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  z-index: 98;

  .option-select-main {
    background-color: ${({ theme }) => theme.body};
  }
`;

const Select = (props) => {
  console.log(props);
  return (
    <OptionSelect>
      <div className="option-select-main">
        {props.data.map((item, idx) => (
          <div
            className="single-option"
            key={idx}
            onMouseDown={() => {
              props.selected(item);
            }}
          >
            <span>{item.LocalizedName},</span>
            <span>{item.Country.LocalizedName}</span>
          </div>
        ))}
      </div>
    </OptionSelect>
  );
};

export default Select;
