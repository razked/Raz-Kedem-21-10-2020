import React from "react";
import moment from "moment";
import "./Forcast.scss";

const Forcast = (props) => {

  let output = null;
  if (props.data) {
    output = props.data.map((item, idx) => {
      let date = moment(item.date).format("DD.MM");
      let today = new Date().getDate();

      return (
        <div key={idx} className={new Date(item.date).getDate() === today ? "day today" : "day"}>
          <span className="date">{date}</span>
          <span className="weather-text">{item.weatherText}</span>
        </div>
      );
    });
  }

  return <div className="Forcast">{output}</div>;
};

export default Forcast;
