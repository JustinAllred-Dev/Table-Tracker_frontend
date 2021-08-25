import { React, useState } from "React";
import { Link, useHistory } from "react-router-dom";

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
  const handleSubmit = () => {};

  const onSubmit = () => {};

  const onFinished = () => {
    history.push("/dashboard");
  };
  const handleChange = ({ target }) => {
    setReservation((thisReservation) => ({
      ...thisReservation,
      [target.name]: target.value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div classname="form-group">
        <label htmlFor="first_name" className="form-label">
          First Name:{" "}
        </label>
        <input
          id="first_name"
          name="first_name"
          tabIndex="1"
          className="form-control"
          required={true}
          value={reservation.first_name}
          onChange={handleChange}
        ></input>
      </div>
      <div classname="form-group">
        <label htmlFor="last_name" className="form-label">
          Last Name:{" "}
        </label>
        <input
          id="last_name"
          name="last_name"
          tabIndex="2"
          className="form-control"
          required={true}
          value={reservation.last_name}
          onChange={handleChange}
        ></input>
      </div>
      <div classname="form-group">
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number:
        </label>
        <input
          id="mobile_number"
          name="mobile_number"
          type="number"
          maxLength="10"
          tabIndex="3"
          className="form-control"
          required={true}
          value={reservation.mobile_number}
          onChange={handleChange}
        ></input>
      </div>
      <div classname="form-group">
        <label htmlFor="people" className="form-label">
          Number of People:{" "}
        </label>
        <input
          id="people"
          name="people"
          type="number"
          tabIndex="4"
          className="form-control"
          required={true}
          value={reservation.people}
          onChange={handleChange}
        ></input>
      </div>
      <div classname="form-group">
        <label htmlFor="reservation_date" className="form-label">
          Date of Reservation:{" "}
        </label>
        <input
          id="reservation_date"
          name="reservation_date"
          type="date"
          tabIndex="5"
          className="form-control"
          required={true}
          value={reservation.reservation_date}
          onChange={handleChange}
        ></input>
      </div>
      <div classname="form-group">
        <label htmlFor="reservation_time" className="form-label">
          Time of Reservation:{" "}
        </label>
        <input
          id="reservation_time"
          name="reservation_time"
          type="time"
          tabIndex="6"
          className="form-control"
          required={true}
          value={reservation.reservation_time}
          onChange={handleChange}
        ></input>
      </div>
      <Link className="btn btn-secondary mr-2" to="/">
        Cancel
      </Link>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
export default NewReservation;
