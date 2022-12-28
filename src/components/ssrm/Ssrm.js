import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const getCountryValuesAsync = async (params) => {
  const response = await fetch("http://localhost:4000/getAllCountries");

  console.log(response);

  // setTimeout(function () {
  //   params.success(countries);
  // }, 500);
};

function Ssrm() {
  const gridRef = useRef(null);

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: "agTextColumnFilter", checkboxSelection: true },
    {
      field: "country",
      rowGroup: true,
      hide: true,
      // checkboxSelection: true,
      filter: "agSetColumnFilter",
      filterParams: {
        values: (params) => {
          // simulating async delay
          setTimeout(
            () => params.success(["Australia", "China", "Sweden"]),
            500
          );
        },
      },
      menuTabs: ["filterMenuTab"],
    },
    { field: "sport", rowGroup: true, hide: true },
    {
      field: "year",
      filter: "number",
      // filterParams: { newRowsAction: "keep" },
    },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
    };
  }, []);

  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));

      fetch("http://localhost:4000/olympicWinners/", {
        method: "post",
        body: JSON.stringify(params.request),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          console.log(response);
          params.successCallback(response.rows, response.lastRow);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  const getServerSideGroupLevelParams = useCallback((params) => {
    var noGroupingActive = params.rowGroupColumns.length === 0;
    var res;
    if (noGroupingActive) {
      res = {
        infiniteScroll: true,
        cacheBlockSize: 100,
        maxBlocksInCache: 2,
      };
    } else {
      var topLevelRows = params.level === 0;
      if (topLevelRows) {
        res = {
          infiniteScroll: true,
          cacheBlockSize: 10,
          maxBlocksInCache: 2,
        };
      } else {
        res = {
          infiniteScroll: true,
          cacheBlockSize: params.level === 1 ? 5 : 10,
          maxBlocksInCache: -1,
        };
      }
    }

    return res;
  }, []);

  const isServerSideGroupOpenByDefault = useCallback((params) => {
    var route = params.rowNode.getRoute();

    // console.log(route);

    if (!route) {
      return false;
    }
    var routeAsString = route.join(",");
    var routesToOpenByDefault = [
      "United States",
      "Zimbabwe,Swimming",
      "United States,Swimming",
    ];
    return routesToOpenByDefault.indexOf(routeAsString) >= 0;
  }, []);

  const onBtExpandAll = useCallback(() => {
    gridRef.current.api.expandAll();
  }, []);

  const onBtCollapseAll = useCallback(() => {
    gridRef.current.api.collapseAll();
  }, []);

  const onBtExpandTopLevel = useCallback(() => {
    gridRef.current.api.forEachNode(function (node) {
      if (node.group && node.level === 0) {
        node.setExpanded(true);
      }
    });
  }, []);

  const getChildCount = useCallback((data) => {
    // console.log(data);

    return data ? data.childCount : undefined;
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Country",
      minWidth: 300,
      cellRendererParams: {
        //   suppressCount: true,
        checkbox: true,
      },
    };
  }, []);

  const getRowId = useMemo(() => {
    return (params) => params.data.country;
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.setServerSideDatasource(datasource);

    // params.api.ensureIndexVisible(5, "top");
  }, []);

  return (
    <>
      <div>
        <button onClick={onBtExpandAll}>Expand All</button>
        <button onClick={onBtCollapseAll}>Collapse All</button>
        <button onClick={onBtExpandTopLevel}>Expand Top Level Only</button>
      </div>

      <div className="ag-theme-alpine" style={{ width: 1200, height: 1000 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          // getRowId={getRowId}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
          animateRows={true}
          rowModelType={"serverSide"}
          serverSideInfiniteScroll={true}
          // cacheBlockSize={10}
          // maxBlocksInCache={3}
          getServerSideGroupLevelParams={getServerSideGroupLevelParams}
          blockLoadDebounceMillis={1000}
          // debug={true}
          isServerSideGroupOpenByDefault={isServerSideGroupOpenByDefault}
          getChildCount={getChildCount}
          // serverSideInitialRowCount={15}
          pagination={true}
          paginationAutoPageSize={true}
          paginateChildRows={true}
          groupSelectsChildren={true}
          autoGroupColumnDef={autoGroupColumnDef}
        ></AgGridReact>
      </div>
    </>
  );
}

export default Ssrm;
