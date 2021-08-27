import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createReservation(reservation);
    history.push(`/dashboard?date=${reservation.reservation_date}`);
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
    <>
      <ReservationForm
        reservation={reservation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        history={history}
      />
    </>
  );
}
export default NewReservation;
