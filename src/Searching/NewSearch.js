import { React, useState } from "react";
import Reservations from "../reservations/Reservations";
import ErrorAlert from "../layout/ErrorAlert";

function NewSearch() {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [numberSearch, setNumberSearch] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNumberSearch(null);
    try {
      setNumberSearch(number);
    } catch (err) {
      setNumberError(err);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setNumber(value);
  };

  return (
    <div className="Search">
      <h5>Mobile Number Search</h5>
      <ErrorAlert error={numberError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobile_number" className="form-label">
            Number:
          </label>
          <input
            id="mobile_number"
            name="mobile_number"
            maxLength="10"
            tabIndex="1"
            placeholder="Enter a customer's phone number"
            className="form-control"
            required={true}
            value={number}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Find
        </button>
      </form>
      {numberSearch ? <Reservations number={numberSearch} /> : ""}
    </div>
  );
}

export default NewSearch;
