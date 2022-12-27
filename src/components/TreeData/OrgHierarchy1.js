import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import getData from "../../Datas/orgData1";

const OrgHierarchy1 = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: 1200, height: 200 }), []);
  const gridStyle = useMemo(() => ({ width: 1200, height: 1000 }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    // we're using the auto group column by default!
    { field: "jobTitle" },
    { field: "employmentType" },
    { headerName: "Sum(Salary)", field: "salary", aggFunc: "sum" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Organisation Hierarchy",
      minWidth: 300,
      cellRendererParams: {
        //   suppressCount: true,
        checkbox: true,
      },
    };
  }, []);

  const getDataPath = useMemo(() => {
    return (data) => {
      return data.orgHierarchy;
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onChange={onFilterTextBoxChanged}
          />
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={-1}
            getDataPath={getDataPath}
            xcludeChildrenWhenTreeDataFiltering={true}
            suppressRowClickSelection={true}
            rowSelection={"multiple"}
            groupSelectsChildren={true}
            suppressAggFilteredOnly={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default OrgHierarchy1;
