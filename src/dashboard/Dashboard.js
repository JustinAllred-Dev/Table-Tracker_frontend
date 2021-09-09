import React from "react";
import { useHistory } from "react-router-dom";
import { today, next, previous, formatDate } from "../utils/date-time";
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

  const handleDateChange = (event) => {
    try {
      history.push(`dashboard?date=${event.target.value}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="text-center">
      <h1 className="m-3">{formatDate(date)}</h1>

      {/* <div className="mb-3"> */}
      <button
        className="btn btn-sm btn-light"
        onClick={() => handlePreviousDate(date)}
      >
        Previous Day
      </button>
      <button
        className="mx-3 btn btn-sm btn-light"
        onClick={() => handleTodayClick()}
      >
        Today
      </button>
      <button
        className="btn btn-sm btn-light"
        onClick={() => handleNextDate(date)}
      >
        Next Day
      </button>
      <br />
      <label htmlFor="reservation_date" className="form-label m-3"></label>
      <input
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        name="reservation_date"
        onChange={handleDateChange}
        value={date}
      />
      {/* </div> */}
      <Tables />

      <Reservations date={date} />
    </main>
  );
}

export default Dashboard;
