import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";

function NewTable() {
  const history = useHistory();
  const [tableError, setTableError] = useState({ message: [] });
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
      if (Array.isArray(err.message)) {
        setTableError(err);
      } else {
        setTableError({ message: [err.message] });
      }
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
    <>
      <TableForm
        table={table}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        history={history}
        tableError={tableError}
      />
    </>
  );
}

export default NewTable;
