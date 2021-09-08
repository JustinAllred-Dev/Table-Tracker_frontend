import React from "react";

function SeatForm({ handleChange, handleSubmit, tables, history }) {
  const options = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
      {`${table.table_name} - ${table.capacity}`}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <div classname="form-group">
        <label htmlFor="table_name" className="form-label">
          Table Name:
        </label>
        <select name="table_id" required={true} onChange={handleChange}>
          {/* <option value=""></option> */}
          {options}
        </select>
        <br />
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={history.goBack}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </div>
    </form>
  );
}

export default SeatForm;
