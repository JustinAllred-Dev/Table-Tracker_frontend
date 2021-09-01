import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateTable, listTables } from "../utils/api";
import SeatForm from "./SeatForm";

function NewSeat({ resId }) {
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

  useEffect(loadTables);
}

export default NewSeat;
