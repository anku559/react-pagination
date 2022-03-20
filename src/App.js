import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Button";
import "./App.css";
import { TableData } from "./TableJson/TableData";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [allData, setAllData] = useState({
    alluser: [],
    currentPage: 1,
    totalPages: TableData.length,
    pageLimit: 10,
  });

  useEffect(() => {
    const { currentPage, pageLimit, alluser } = allData;

    const offset = (currentPage - 1) * pageLimit;
    const currentUser = TableData.slice(offset, offset + pageLimit);

    setAllData({
      ...allData,
      alluser: currentUser,
    });
  }, []);

  const onPageChangeEvent = (selectedObject) => {
    const { currentPage, pageLimit, alluser } = allData;

    const offset = (currentPage - 1) * pageLimit;
    const currentUser = TableData.slice(offset, offset + pageLimit);
    setAllData({
      ...allData,
      currentPage: selectedObject.selected + 1,
      alluser: currentUser,
    });
  };

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.alluser.length >= 0 &&
            allData.alluser.map((item, key) => {
              return (
                <tr key={key}>
                  <td>
                    {(allData.currentPage - 1) * allData.pageLimit + (key + 1)}
                  </td>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.address}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {TableData.length > 0 && allData.totalPages > allData.pageLimit && (
        <ReactPaginate
          previousLabel={"previous"}
          initialPage={allData.currentPage - 1}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(allData.totalPages / allData.pageLimit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={onPageChangeEvent}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default App;
