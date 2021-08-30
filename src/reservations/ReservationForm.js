import React from "react";

function ReservationForm({
  reservation,
  handleChange,
  handleSubmit,
  history,
  reservationError,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {reservationError &&
        reservationError.message.map((err, i) => (
          <p key={i} className="alert alert-danger">
            -{err}
          </p>
        ))}
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
        />
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
        />
      </div>
      <div classname="form-group">
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number:
        </label>
        <input
          id="mobile_number"
          name="mobile_number"
          maxLength="10"
          tabIndex="3"
          className="form-control"
          required={true}
          value={reservation.mobile_number}
          onChange={handleChange}
        />
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
        />
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
        />
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
        />
      </div>
      <button className="btn btn-danger" onClick={history.goBack}>
        cancel
      </button>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
}
export default ReservationForm;
