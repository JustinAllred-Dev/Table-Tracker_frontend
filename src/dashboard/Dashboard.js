import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { today, next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  const loadDashboard = async () => {
    const abortController = new AbortController();
    setReservationsError(null);
    // if (date) {
    try {
      const loadedReservations = await listReservations(
        { date },
        abortController.signal
      );
      setReservations(loadedReservations);
    } catch (err) {
      setReservationsError(err);
    }
    // }
    //  else {
    //   try {
    //     const loadedReservations = await listReservations(
    //       abortController.signal
    //     );
    //     setReservations(loadedReservations);
    //   } catch (err) {
    //     setReservationsError(err);
    //   }
    // }
    try {
      const loadedTables = await listTables(abortController.signal);
      setTables(loadedTables);
    } catch (err) {
      setTablesError(err);
    }
    return () => abortController.abort();
  };
  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };

  useEffect(loadDashboard, [date]);

  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const handleTodayClick = () => {
    history.push(`dashboard?date=${today(date)}`);
  };

  const reservationContent = reservations.map((res, i) => (
    <div key={i} className="d-flex">
      <div className="col-2 ">
        <p>{res.first_name}</p>
      </div>
      <div className="col-2">
        <p>{res.last_name}</p>
      </div>
      <div className="col-2">
        <p>{res.mobile_number}</p>
      </div>
      <div className="col-2">
        <p>{res.reservation_time}</p>
      </div>
      <div className="col-2">
        <p>{res.people}</p>
      </div>
      {/* {!date ? (
        <div className="col-2">
          <p>{res.reservation_date}</p>
        </div>
      ) : null} */}
      <button className="btn btn-primary btn-sm">Seat</button>
    </div>
  ));

  const tableContent = tables.map((table, i) => (
    <>
      <div key={i} className="d-flex">
        <div className="col-2">
          <p>{table.table_name}</p>
        </div>
        <div className="col-2">
          <p>{table.capacity}</p>
        </div>
      </div>
      <br></br>
    </>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        {/* {date ? <h4 className="mb-0">Reservations for date: {date}</h4> : null} */}
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
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div className="d-flex">
        <div className="col-2">
          <h5>First Name</h5>
        </div>
        <div className="col-2">
          <h5>Last Name</h5>
        </div>
        <div className="col-2">
          <h5>Mobile number</h5>
        </div>
        <div className="col-2">
          <h5>Reservation Time</h5>
        </div>
        <div className="col-2">
          <h5>Party Size</h5>
        </div>
        {/* {!date ? (
          <div className="col-2">
            <h5>Reservation Date</h5>
          </div>
        ) : null} */}
      </div>
      <div>{reservationContent}</div>
      <br></br>
      <div className="d-flex">
        <div className="col-2">
          <h5>Table Name</h5>
        </div>
        <div className="col-2">
          <h5>Capacity</h5>
        </div>
      </div>
      <div>{tableContent}</div>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
