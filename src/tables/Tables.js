import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, clearTable, updateReservation } from "../utils/api";

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

  const handleFinish = async (table) => {
    if (window.confirm("Is this table ready to seat new guests?")) {
      try {
        await clearTable(table.table_id);
        window.location.reload();
        await updateReservation(table.reservation_id, "finished");
      } catch (err) {
        setTablesError(err);
      }
    }
  };

  const tableContent = tables.map((table) => (
    <>
      {/* {console.log(table, table.table_id)} */}
      {table.reservation_id ? (
        <div key={table.table_id} className="d-flex">
          <div className="col-2">
            <p>{table.table_name}</p>
          </div>
          <div className="col-2">
            <p>{table.capacity}</p>
          </div>
          <div className="col-2">
            <h6 data-table-id-status={table.table_id}>occupied</h6>
          </div>
          <button
            className="btn btn-primary btn-sm"
            data-table-id-finish={table.table_id}
            onClick={() => handleFinish(table)}
          >
            Finish
          </button>
        </div>
      ) : (
        <div key={table.table_id} className="d-flex">
          <div className="col-2">
            <p>{table.table_name}</p>
          </div>
          <div className="col-2">
            <p>{table.capacity}</p>
          </div>
          <div className="col-2">
            <h6 data-table-id-status={table.table_id}>free</h6>
          </div>
        </div>
      )}
    </>
  ));

  return (
    <main>
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
    </main>
  );
}

export default Tables;
