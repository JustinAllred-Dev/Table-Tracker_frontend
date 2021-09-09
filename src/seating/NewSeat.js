import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateTable, listTables, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatForm from "./SeatForm";

function NewSeat() {
  const history = useHistory();
  const params = useParams();
  const resId = params.reservation_id;

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [seatTable, setSeatTable] = useState({ table_id: null });
  const [seatTableError, setSeatTableError] = useState(null);

  useEffect(() => {
    const loadTables = async () => {
      const abortController = new AbortController();
      try {
        setTablesError(null);
        const loadedTables = await listTables(abortController.signal);
        setTables(loadedTables);
      } catch (err) {
        setTablesError(err);
      }
      return () => abortController.abort();
    };
    loadTables();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTable(seatTable.table_id, resId);
      await updateStatus(resId, "seated");
      history.push("/");
    } catch (err) {
      setSeatTableError(err);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setSeatTable({ table_id: value });
  };

  return (
    <div className="seating">
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
