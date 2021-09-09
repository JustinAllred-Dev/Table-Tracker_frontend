import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, clearTable, updateStatus } from "../utils/api";

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
        await updateStatus(table.reservation_id, "finished");
      } catch (err) {
        setTablesError(err);
      }
    }
  };

  const tableContent = tables.map((table) => (
    <>
      <div
        className="card m-3 bg-light"
        key={table.table_id}
        style={{ width: "10rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">Table {table.table_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <span className="oi oi-people m-2"> </span> {table.capacity}
          </h6>
          {table.reservation_id ? (
            <h6 data-table-id-status={table.table_id}>occupied</h6>
          ) : (
            <h6 data-table-id-status={table.table_id}>free</h6>
          )}
          {table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              onClick={handleFinish}
            >
              Finish
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  ));

  return (
    <div className="tablesList">
      <h3>Tables</h3>
      <ErrorAlert error={tablesError} />
      <div className="d-flex justify-content-center flex-wrap">
        <>{tableContent}</>
      </div>
    </div>
  );
}

export default Tables;
