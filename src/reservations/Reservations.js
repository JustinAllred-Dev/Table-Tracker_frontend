import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

function Reservations({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      const abortController = new AbortController();
      setReservationsError(null);
      try {
        const loadedReservations = await listReservations(
          { date },
          abortController.signal
        );
        setReservations(loadedReservations);
      } catch (err) {
        setReservationsError(err);
      }
      return () => abortController.abort();
    };
    loadReservations();
  }, [date]);

  const reservationContent = reservations.map((reservation, i) => (
    <>
      {reservation.status === "finished" ? (
        ""
      ) : (
        <div key={reservation.reservation_id} className="d-flex">
          <div className="col-2 ">
            <p>{reservation.first_name}</p>
          </div>
          <div className="col-2">
            <p>{reservation.last_name}</p>
          </div>
          <div className="col-2">
            <p>{reservation.mobile_number}</p>
          </div>
          <div className="col-2">
            <p>{reservation.reservation_time}</p>
          </div>
          <div className="col-2">
            <p>{reservation.people}</p>
          </div>
          {reservation.status === "booked" && (
            <>
              {" "}
              <div className="col-2">
                <p data-reservation-id-status={reservation.reservation_id}>
                  booked
                </p>
              </div>
              <button className="btn btn-primary btn-sm">
                <a
                  href={`/reservations/${reservations[i].reservation_id}/seat`}
                >
                  Seat
                </a>
              </button>
            </>
          )}
          {reservation.status === "seated" && (
            <p data-reservation-id-status={reservation.reservation_id}>
              seated
            </p>
          )}
        </div>
      )}
    </>
  ));

  return (
    <>
      <ErrorAlert error={reservationsError} />
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
        <div className="col-2">
          <h5>Status</h5>
        </div>
      </div>
      <div>{reservationContent}</div>
      <br></br>
    </>
  );
}

export default Reservations;
