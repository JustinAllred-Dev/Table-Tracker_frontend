import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

function Tables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(() => {
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
    loadTables();
  }, []);

  const tableContent = tables.map((table, i) => (
    <div key={i} className="d-flex">
      <div className="col-2">
        <p>{table.table_name}</p>
      </div>
      <div className="col-2">
        <p>{table.capacity}</p>
      </div>
      <div className="col-2" data-table-id-status={table.table_id}>
        {table.occupied ? <p>occupied</p> : <p>free</p>}
      </div>
    </div>
  ));

  return (
    <>
      <ErrorAlert error={tablesError} />
      <div className="d-flex">
        <div className="col-2">
          <h5>Table Name</h5>
        </div>
        <div className="col-2">
          <h5>Capacity</h5>
        </div>
        <div className="col-2">
          <h5>occupied</h5>
        </div>
      </div>
      <div>{tableContent}</div>
      {/* {JSON.stringify(reservations)} */}
    </>
  );
}

export default Tables;
