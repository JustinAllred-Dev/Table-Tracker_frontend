import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import ReservationForm from "./ReservationForm";
import { useParams } from "react-router";

function EditOrCreateReservation() {
  const params = useParams();
  const originalResId = params.reservation_id;

  const history = useHistory();
  const [reservationError, setReservationError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  useEffect(() => {
    const loadReservation = async () => {
      const abortController = new AbortController();
      setReservationError(null);
      try {
        if (originalResId) {
          const loadedReservation = await readReservation(
            originalResId,
            abortController.signal
          );
          setReservation({
            first_name: loadedReservation.first_name,
            last_name: loadedReservation.last_name,
            mobile_number: loadedReservation.mobile_number,
            reservation_date: new Date(loadedReservation.reservation_date)
              .toISOString()
              .substr(0, 10),
            reservation_time: loadedReservation.reservation_time,
            people: loadedReservation.people,
          });
        }
      } catch (err) {
        setReservationError(err);
      }
      return () => abortController.abort();
    };
    loadReservation();
  }, [originalResId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (originalResId) {
        await updateReservation(reservation, originalResId);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } else {
        await createReservation(reservation);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      }
    } catch (err) {
      setReservationError(err);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "people") {
      value = Number(value);
    }
    setReservation((thisReservation) => ({
      ...thisReservation,
      [name]: value,
    }));
  };

  return (
    <div classname="reservation">
      <h5>New Reservation</h5>
      <ReservationForm
        reservation={reservation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        history={history}
        reservationError={reservationError}
      />
    </div>
  );
}
export default EditOrCreateReservation;
