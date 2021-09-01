import React from "react";
import { useHistory } from "react-router-dom";
import { today, next, previous } from "../utils/date-time";
import Tables from "../tables/Tables";
import Reservations from "../reservations/Reservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();

  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };

  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const handleTodayClick = () => {
    history.push(`dashboard?date=${today(date)}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-secondary mr-2"
          onClick={() => handlePreviousDate(date)}
        >
          previous
        </button>
        <button
          className="btn btn-secondary mr-2"
          onClick={() => handleNextDate(date)}
        >
          next
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleTodayClick()}
        >
          today
        </button>
      </div>
      <Reservations date={date} />
      <Tables />
    </main>
  );
}

export default Dashboard;
