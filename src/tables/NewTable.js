import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [tableError, setTableError] = useState(null);
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await createTable(table);
      history.push("/");
    } catch (err) {
      setTableError(err);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "capacity") {
      value = Number(value);
    }
    setTable((thisTable) => ({
      ...thisTable,
      [name]: value,
    }));
  };

  return (
    <div className="main">
      <h5>New Table</h5>
      <ErrorAlert error={tableError} />
      <TableForm
        table={table}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        history={history}
      />
    </div>
  );
}

export default NewTable;
