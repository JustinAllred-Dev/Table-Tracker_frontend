import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {
  listReservations,
  listReservationsByNumber,
  updateStatus,
} from "../utils/api";
import { formatDate, formatTime, formatPhone } from "../utils/date-time";

function Reservations({ date, number }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      const abortController = new AbortController();
      setReservationsError(null);
      try {
        if (number) {
          const loadedReservations = await listReservationsByNumber(
            number,
            abortController.signal
          );
          setReservations(loadedReservations);
        } else {
          const loadedReservations = await listReservations(
            { date },
            abortController.signal
          );
          setReservations(loadedReservations);
        }
      } catch (err) {
        setReservationsError(err);
      }
      return () => abortController.abort();
    };
    loadReservations();
  }, [date, number]);

  const handleCancel = async (resId) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try {
        await updateStatus(resId, "cancelled");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const reservationsList = reservations.map((reservation) => (
    <>
      {reservation.status === "finished" ||
      reservation.status === "cancelled" ? null : (
        <div
          key={reservation.reservation_id}
          className="card m-3 bg-light"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h4 className="card-title">
                {reservation.first_name} {reservation.last_name}
              </h4>
              <h6>
                <span className="oi oi-people m-2"> </span>
                {reservation.people}
              </h6>
            </div>

            <div className="d-flex justify-content-between">
              <h6>{formatDate(reservation.reservation_date)}</h6>
              <h6>{formatTime(reservation.reservation_time)}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>{formatPhone(reservation.mobile_number)}</h6>

              <h5 data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}
              </h5>
            </div>

            {reservation.status === "booked" && !number ? (
              <>
                <Link
                  to={`/reservations/${reservation.reservation_id}/seat`}
                  className="btn btn-info btn-sm"
                >
                  Seat
                </Link>
              </>
            ) : null}
            <button
              data-reservation-id-cancel={reservation.reservation_id}
              className="mx-3 btn btn-danger btn-sm"
              onClick={() => handleCancel(reservation.reservation_id)}
            >
              Cancel
            </button>
            <Link
              to={`/reservations/${reservation.reservation_id}/edit`}
              className="btn btn-warning btn-sm"
            >
              Edit
            </Link>
          </div>
        </div>
      )}
    </>
  ));
  // }

  return (
    <div className="reservationsList">
      <h2>Reservations</h2>
      <ErrorAlert error={reservationsError} />
      {!reservations.length && number ? (
        <ErrorAlert error={{ message: "No reservations found" }} />
      ) : null}
      {!reservations.length && !number ? (
        <ErrorAlert error={{ message: `No reservations found for ${date}` }} />
      ) : null}
      <div className="d-flex justify-content-center mb-1 flex-wrap">
        <>{reservationsList}</>
      </div>
      <br />
    </div>
  );
}

export default Reservations;
