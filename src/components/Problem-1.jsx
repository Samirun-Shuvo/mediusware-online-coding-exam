import React, { useState } from "react";

const Problem1 = () => {
  const [showDatas, setShowDatas] = useState([]);
  const [submited, setSubmited] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.name.value) {
      const newData = {
        name: e.target.name.value,
        status: e.target.status.value,
      };

      setShowDatas((allData) => [...showDatas, newData]);
      setSubmited(true);
      e.target.name.value = "";
      e.target.status.value = "";
    }
  };

  //handle click filter function
  const [allData, setAllData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const handleClick = (e) => {
    if (e === "all") {
      const statusOrder = { Active: 0, active: 0, Completed: 1, completed: 1 };
      const sortingData = showDatas.sort(
        ({ status: s1 }, { status: s2 }) =>
          (statusOrder[s1] ?? Infinity) - (statusOrder[s2] ?? Infinity)
      );

      setAllData(sortingData);
      setActiveData("");
      setCompletedData("");
      setSubmited(false);
    }
    if (e === "active") {
      const newActiveDatas = showDatas.filter(
        (item) => item.status.toLowerCase() === "active"
      );
      setActiveData(newActiveDatas);
      setAllData("");
      setCompletedData("");
      setSubmited(false);
    }
    if (e === "completed") {
      const newCompletedDatas = showDatas.filter(
        (item) => item.status.toLowerCase() === "completed"
      );
      setCompletedData(newCompletedDatas);
      setAllData("");
      setActiveData("");
      setSubmited(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={onSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className="btn btn-primary m-1"
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary m-1"
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary m-1"
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>

          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {submited === true ? (
              <tbody>
                {showDatas?.map((data, i) => (
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {allData.length
                  ? allData.map((data, i) => (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))
                  : activeData.length
                  ? activeData.map((data, i) => (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))
                  : completedData.length
                  ? completedData.map((data, i) => (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))
                  : showDatas?.map((data, i) => (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
