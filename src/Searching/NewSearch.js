import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Reservations from "../reservations/Reservations";
import ErrorAlert from "../layout/ErrorAlert";

function NewSearch() {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [numberSearch, setNumberSearch] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setNumberSearch(true);
    } catch (err) {
      setNumberError(err);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setNumber(Number(value));
  };

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <div className="form-group"></div>
      </form>
    </div>
  );
}

export default NewSearch;
