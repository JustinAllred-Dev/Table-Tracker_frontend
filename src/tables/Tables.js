import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, clearTable } from "../utils/api";

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

  const handleFinish = async (i) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? \n \n \nThis cannot be undone."
      )
    ) {
      try {
        await clearTable(tables[i].table_id);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const tableContent = tables.map((table, i) => (
    <>
      {table.occupied ? (
        <div key={i} className="d-flex">
          <div className="col-2">
            <p>{table.table_name}</p>
          </div>
          <div className="col-2">
            <p>{table.capacity}</p>
          </div>
          <div className="col-2" data-table-id-status={table.table_id}>
            <p>occupied</p>
          </div>
          <button
            data-table-id-finish={table.table_id}
            onClick={() => handleFinish(i)}
          >
            finish
          </button>
        </div>
      ) : (
        <div key={i} className="d-flex">
          <div className="col-2">
            <p>{table.table_name}</p>
          </div>
          <div className="col-2">
            <p>{table.capacity}</p>
          </div>
          <div className="col-2" data-table-id-status={table.table_id}>
            <p>free</p>
          </div>
        </div>
      )}
    </>
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
    </>
  );
}

export default Tables;
