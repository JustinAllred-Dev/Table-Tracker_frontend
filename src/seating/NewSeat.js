import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "./SeatForm";

function NewSeat() {
  const history = useHistory();
  const params = useParams();
  const resId = Number(params.reservationId);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [seatTable, setSeatTable] = useState(null);
  const [seatTableError, setSeatTableError] = useState(null);

  const loadTables = async () => {
    const abortController = new AbortController();
    setTablesError(null);
    try {
      const loadedTables = await listTables(abortController.signal);
      setTables(loadedTables);
    } catch (err) {
      setTablesError(err);
    }
    return () => abortController.abort();
  };

  useEffect(loadTables, []);

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    try {
      event.preventDefault();
      await updateTable(
        Number(seatTable.table_id),
        resId,
        abortController.signal
      );
      history.push("/");
    } catch (err) {
      setSeatTableError(err);
    }
    return () => abortController.abort();
  };

  const handleChange = ({ target: { name, value } }) => {
    setSeatTable((thisTable) => ({
      ...thisTable,
      [name]: value,
    }));
  };

  return (
    <div className="main">
      <h5>Seat Reservation</h5>
      <ErrorAlert error={seatTableError} />
      <ErrorAlert error={tablesError} />
      <SeatForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        tables={tables}
        seatTableError={seatTableError}
        tablesError={tablesError}
        history={history}
      />
    </div>
  );
}

export default NewSeat;
