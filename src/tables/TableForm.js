function TableForm({ table, handleChange, handleSubmit, history, tableError }) {
  return (
    <form onSubmit={handleSubmit}>
      {tableError &&
        tableError.message.map((err, i) => (
          <p key={i} className="alert alert-danger">
            -{err}
          </p>
        ))}
      <div classname="form-group">
        <label htmlFor="table_name" className="form-label">
          Table Name:{" "}
        </label>
        <input
          id="table_name"
          name="table_name"
          tabIndex="1"
          className="form-control"
          required={true}
          value={table.table_name}
          onChange={handleChange}
        />
      </div>
      <div classname="form-group">
        <label htmlFor="capacity" className="form-label">
          Capacity:{" "}
        </label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          tabIndex="2"
          className="form-control"
          required={true}
          value={table.capacity}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-danger" onClick={history.goBack}>
        cancel
      </button>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
}

export default TableForm;
