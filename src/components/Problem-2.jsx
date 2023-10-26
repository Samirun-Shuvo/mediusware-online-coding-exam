import React, { useEffect, useState } from "react";

const Problem2 = () => {
  //api fetch
  const [contacts, setContacts] = useState({});
  const [usCountrys, setUsCountrys] = useState({});
  useEffect(() => {
    fetch("https://contact.mediusware.com/api/contacts/")
      .then((res) => res.json())
      .then((data) => setContacts(data));
    fetch(
      "https://contact.mediusware.com/api/country-contacts/United%20States/"
    )
      .then((res) => res.json())
      .then((data) => setUsCountrys(data));
  }, []);

  // checkbox handler function
  const [contactChecked, setContactChecked] = useState(false);
  const [usCountryChecked, setUsCountryChecked] = useState(false);
  const [evenContacts, setEvenContacts] = useState([]);
  const [evenUsCountries, setEvenUsCountries] = useState([]);

  const handleContactCheckbox = () => {
    setContactChecked(!contactChecked);
    if (!contactChecked) {
      const filteredContacts = contacts?.results?.filter(
        (item) => item.id % 2 === 0
      );
      setEvenContacts(filteredContacts);
    }
  };
  const handleUsCountryCheckbox = () => {
    setUsCountryChecked(!usCountryChecked);
    if (!usCountryChecked) {
      const filteredUsCountries = usCountrys?.results?.filter(
        (item) => item.id % 2 === 0
      );
      setEvenUsCountries(filteredUsCountries);
    }
  };

  //handle details functionality by id
  const [detail, setDetail] = useState({});

  const handleContactDetail = (id) => {
    const contactDetail = contacts?.results?.find((item) => item.id === id);
    setDetail(contactDetail);
  };
  const handleUsCountryDetail = (id) => {
    const countryDetail = usCountrys?.results?.find((item) => item.id === id);
    setDetail(countryDetail);
  };

  //handle search functionality
//   const [filterByCountry, setFilterByCountry] = useState([]);
  const [filterByContactNum, setFilterByContactNum] = useState([]);
  const handleCountrySearch = (e) => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }

    // e.preventDefault();
    // setFilterByCountry(
    //   contacts?.results &&
    //     contacts?.results.filter((i) =>
    //       i.country.name.toLowerCase().includes(e.target.value.toLowerCase())
    //     )
    // );
    // console.log(filterByCountry);
  };
  const handleContactSearch = (e) => {
    e.preventDefault();
    setFilterByContactNum(
      usCountrys?.results &&
        usCountrys?.results.filter((i) => i.phone.includes(e.target.value))
    );
    console.log(filterByContactNum);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <a
            className="btn btn-lg btn-outline-primary"
            data-bs-toggle="modal"
            href="#exampleModalToggle"
            role="button"
          >
            All Contacts
          </a>
          <a
            className="btn btn-lg btn-outline-warning"
            data-bs-toggle="modal"
            href="#exampleModalToggle2"
            role="button"
          >
            US Contacts
          </a>
        </div>
      </div>

      {/* //modal-1 */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Modal A
              </h5>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary m-1"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  All Contact
                </button>
                <button
                  className="btn btn-warning m-1"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  US Contact
                </button>
              </div>
              <div>
                <div className="my-2">
                  <div className="input-group mb-3">
                    <input
                    id="myInput"
                      onChange={handleCountrySearch}
                      type="text"
                      className="form-control"
                      placeholder="Search By Country Name..."
                    />
                    <span className="input-group-text" id="basic-addon2">
                      Search
                    </span>
                  </div>
                </div>
                <table className="table table-striped" id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactChecked
                      ? evenContacts?.map((contact) => (
                          <tr
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleContactDetail(contact?.id)}
                            style={{ cursor: "pointer" }}
                            key={contact?.id}
                          >
                            <td>{contact?.id}</td>
                            <td>{contact?.phone}</td>
                            <td>{contact?.country?.name}</td>
                          </tr>
                        ))
                   
                      : contacts?.results?.map((contact) => (
                          <tr
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleContactDetail(contact?.id)}
                            style={{ cursor: "pointer" }}
                            key={contact?.id}
                          >
                            <td>{contact?.id}</td>
                            <td>{contact?.phone}</td>
                            <td>{contact?.country?.name}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer justify-content-between align-items-center">
              <div className="form-check">
                <input
                  checked={contactChecked}
                  onChange={handleContactCheckbox}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckIndeterminate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                  Only Even
                </label>
              </div>
              <button
                className="btn btn-danger"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //modal-2 */}
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Modal B
              </h5>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary m-1"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  All Contact
                </button>
                <button
                  className="btn btn-warning m-1"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  US Contact
                </button>
              </div>
              <div>
                <div className="my-2">
                  <div className="input-group mb-3">
                    <input
                      onChange={handleContactSearch}
                      type="text"
                      className="form-control"
                      placeholder="Search By Contact Number"
                    />
                    <span className="input-group-text" id="basic-addon2">
                      Search
                    </span>
                  </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usCountryChecked
                      ? evenUsCountries?.map((usCountry) => (
                          <tr
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleUsCountryDetail(usCountry?.id)}
                            style={{ cursor: "pointer" }}
                            key={usCountry?.id}
                          >
                            <td>{usCountry?.id}</td>
                            <td>{usCountry?.phone}</td>
                            <td>{usCountry?.country?.name}</td>
                          </tr>
                        ))
                 
                      : usCountrys?.results?.map((usCountry) => (
                          <tr
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleUsCountryDetail(usCountry?.id)}
                            style={{ cursor: "pointer" }}
                            key={usCountry?.id}
                          >
                            <td>{usCountry?.id}</td>
                            <td>{usCountry?.phone}</td>
                            <td>{usCountry?.country?.name}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer justify-content-between align-items-center">
              <div className="form-check">
                <input
                  checked={usCountryChecked}
                  onChange={handleUsCountryCheckbox}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckIndeterminate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
                >
                  Only Even
                </label>
              </div>
              <button
                className="btn btn-danger"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //modal-3 */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal C
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <h6>Id : {detail?.id}</h6>
                <h6>Name : {detail?.country?.name}</h6>
                <h6>Contact : {detail?.phone}</h6>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;