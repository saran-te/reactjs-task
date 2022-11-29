import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';

// creates a unique symbol, eg 'ADG' or 'ZJD'
function createUniqueRandomSymbol(data) {
  let symbol;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let isUnique = false;
  while (!isUnique) {
    symbol = '';
    // create symbol
    for (let i = 0; i < 3; i++) {
      symbol += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // check uniqueness
    isUnique = true;
    data.forEach(function (oldItem) {
      if (oldItem.symbol === symbol) {
        isUnique = false;
      }
    });
  }
  return symbol;
}

function getInitialData() {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(createItem(data));
  }
  return data;
}

function createItem(data) {
  const item = {
    group: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    symbol: createUniqueRandomSymbol(data),
    price: Math.floor(Math.random() * 100),
  };
  return item;
}

// function setGroupingEnabled(enabled, columnApi) {
//   if (enabled) {
//     columnApi.applyColumnState({
//       state: [
//         { colId: 'group', rowGroup: true, hide: true },
//         { colId: 'symbol', hide: true },
//       ],
//     });
//   } else {
//     columnApi.applyColumnState({
//       state: [
//         { colId: 'group', rowGroup: false, hide: false },
//         { colId: 'symbol', hide: false },
//       ],
//     });
//   }
//   setItemVisible('groupingOn', !enabled);
//   setItemVisible('groupingOff', enabled);
// }

// function setItemVisible(id, visible) {
//   const element = document.querySelector('#' + id);
//   element.style.display = visible ? 'inline' : 'none';
// }

const GridDataUpdate = () => {
  const gridRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getInitialData());

    // console.log(rowData)

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Group', field: 'group' , editable: false},
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 250,
      sortable: true,
      resizable: true,
      editable: true,
      enableCellChangeFlash: true,
    };
  }, []);
//   const autoGroupColumnDef = useMemo(() => {
//     return {
//       headerName: 'Symbol',
//       cellRenderer: 'agGroupCellRenderer',
//       field: 'symbol',
//     };
//   }, []);
//   const statusBar = useMemo(() => {
//     return {
//       statusPanels: [{ statusPanel: 'agAggregationComponent', align: 'right' }],
//     };
//   }, []);
  const getRowId = useCallback(function (params) {
    return params.data.symbol;
  }, []);

//   const onGridReady = useCallback((params) => {
//     setGroupingEnabled(false, params.columnApi);
//   }, []);

  const addFiveItems = useCallback(
    (append) => {
      const newStore = rowData.slice();
      for (let i = 0; i < 5; i++) {
        const newItem = createItem(newStore);
        if (append) {
          newStore.push(newItem);
        } else {
          newStore.splice(0, 0, newItem);
        }
      }
      setRowData(newStore);
    },
    [rowData]
  );

  const removeSelected = useCallback(() => {
    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
      return rowNode.id;
    });

    console.log(selectedIds);

    const filteredData = rowData.filter(function (dataItem) {
      return selectedIds.indexOf(dataItem.symbol) < 0;
    });
    setRowData(filteredData);
  }, [rowData]);



  const setSelectedToGroup = useCallback(
    (newGroup) => {
      const selectedRowNodes = gridRef.current.api.getSelectedNodes();
      const selectedIds = selectedRowNodes.map(function (rowNode) {
        return rowNode.id;
      });
      const newData = rowData.map(function (dataItem) {
        const itemSelected = selectedIds.indexOf(dataItem.symbol) >= 0;
        if (itemSelected) {
          return {
            // symbol and price stay the same
            symbol: dataItem.symbol,
            price: dataItem.price,
            // group gets the group
            group: newGroup,
          };
        } else {
          return dataItem;
        }
      });
      setRowData(newData);
    },
    [rowData]
  );

  const updatePrices = useCallback(() => {
    const newStore = [];
    rowData.forEach(function (item) {
      newStore.push({
        // use same symbol as last time, this is the unique id
        symbol: item.symbol,
        // group also stays the same
        group: item.group,
        // add random price
        price: Math.floor(Math.random() * 100),
      });
    });
    setRowData(newStore);
  }, [rowData]);

//   const onGroupingEnabled = useCallback((enabled) => {
//     setGroupingEnabled(enabled, gridRef.current.columnApi);
//   }, []);

  const reverseItems = useCallback(() => {
    const reversedData = rowData.slice().reverse();
    setRowData(reversedData);
  }, [rowData]);

  const priceUpdateForOne = useCallback(() => {
    var rowNode = gridRef.current.api.getRowNode(rowData[0].symbol);
    rowNode.setDataValue('price', Math.floor(Math.random() * 100000))
  }, [rowData]);

  const dataUpdateForOne = useCallback(() => {
    var rowNode = gridRef.current.api.getRowNode(rowData[0].symbol);
    rowNode.setData({
        symbol: rowData[0].symbol,
        price: Math.floor(Math.random() * 100000),
        group: 'C'
    })

    gridRef.current.api.flashCells({ rowNodes: [rowNode], flashDelay: 3000,
        fadeDelay: 100,});
  }, [rowData]);


  const onCellValueChanged = useCallback((params) => {
    var undoSize = gridRef.current.api.getCurrentUndoSize();
    document.querySelector('#undoInput').value = undoSize;
    document.querySelector('#undoBtn').disabled = undoSize < 1;
    var redoSize = gridRef.current.api.getCurrentRedoSize();
    document.querySelector('#redoInput').value = redoSize;
    document.querySelector('#redoBtn').disabled = redoSize < 1;
  }, []);



  const undo = useCallback(() => {
    gridRef.current.api.undoCellEditing();
  }, []);

  const redo = useCallback(() => {
    gridRef.current.api.redoCellEditing();
  }, []);


  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(value);
  }, []);

  const goToPageNumber = useCallback(() => {
    var value = document.getElementById('page-number').value;
    gridRef.current.api.paginationGoToPage(value - 1);
  }, []);

  return (
    <div style={containerStyle}>
      {/* <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      > */}
        {/* <div style={{ marginBottom: '5px', minHeight: '30px' }}> */}
          <button onClick={reverseItems}>Reverse</button>
          <button onClick={() => addFiveItems(true)}>Append</button>
          <button onClick={() => addFiveItems(false)}>Prepend</button>
          <button onClick={removeSelected}>Remove Selected</button>
          <button onClick={updatePrices}>Update Prices</button>
          <button onClick={priceUpdateForOne}>Set Price for 1st Data</button>
          <button onClick={dataUpdateForOne}>Set Data for 1st Data</button>

          {/* <button id="groupingOn" onClick={() => onGroupingEnabled(true)}>
            Grouping On
          </button>
          <button id="groupingOff" onClick={() => onGroupingEnabled(false)}>
            Grouping Off
          </button> */}
          <span
            style={{
              border: '1px solid lightgrey',
              marginLeft: '20px',
              padding: '8px',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            Move to Group:
            <button onClick={() => setSelectedToGroup('A')}>A</button>
            <button onClick={() => setSelectedToGroup('B')}>B</button>
            <button onClick={() => setSelectedToGroup('C')}>C</button>
          </span>

          <label>Available Undo's</label>
            <input id="undoInput" className="undo-redo-input" />
            <label>Available Redo's</label>
            <input id="redoInput" className="undo-redo-input" />
            <button id="undoBtn" className="undo-btn" onClick={undo}>
              Undo
            </button>
            <button id="redoBtn" className="redo-btn" onClick={redo}>
              Redo
            </button>


            <input type="number" id="page-size" placeholder="Page Size" onChange={onPageSizeChanged}/>
            <input type="number" id="page-number" placeholder="Go To Page" onChange={goToPageNumber}/>
        {/* </div> */}
        {/* <div> */}
          <div style={{width: 1200, height: 500}} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection={'multiple'}
              enterMovesDown={true}
              enterMovesDownAfterEdit={true}
              undoRedoCellEditing={true}
              undoRedoCellEditingLimit={5}
              enableCellChangeFlash={true}
              onCellValueChanged={onCellValueChanged}
              editType={'fullRow'}
              paginationAutoPageSize={true}
              pagination={true}
              paginationPageSize={10}
            //   autoGroupColumnDef={autoGroupColumnDef}
            //   statusBar={statusBar}
            //   groupDefaultExpanded={1}
              getRowId={getRowId}
            //   cellFlashDelay={2000}
            //   cellFadeDelay={500}
            //   onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};



export default GridDataUpdate;