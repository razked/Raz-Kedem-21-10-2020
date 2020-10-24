import React from "react";
import styled from "styled-components";

import "./Select.scss";

const Select = (props) => {
    console.log(props);
  return (
    <div className="option-select">
      <div className="option-select-main">
        {props.data.map((item, idx) => (
          <div
            className="single-option"
            key={idx}
            onMouseDown={() => {
              props.selected(item);
            }}
          >
            {item.LocalizedName}
            {item.Country.LocalizedName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
