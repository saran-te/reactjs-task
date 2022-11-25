import { useState, useEffect, useMemo, useRef } from 'react';
// import { useSelector, connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
// import { fetchData, fetchDataWithAxios } from '../../redux/usersData/userReducer';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import store from '../../redux/store';
import axios from 'axios';


const simpleComp = p => {
  console.log(p.btnName)
  return(
    <>
    <button onClick={() => alert(`${p.value}`)}>{p.btnName}</button>
    </>
  )
}

// const simpleComp1 = p => {
//   console.log(p.btnName)
//   return(
//     <>
//     <button onClick={() => alert(`${p.value}`)}>{p.btnName}</button>
//     <p>{p.value}</p>
//     </>
//   )
// }


const GridDisplay = (props) => {
  // const users = useSelector((state) => state.user);
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const headerHeight = 100;
  const groupHeaderHeight = 25;
  const floatingFiltersHeight = 70;

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Row ID', field: 'id', valueGetter: 'node.id' },
    {field: 'name', width: 150, resizable: true, pinned: 'left', lockPinned: true, filter: 'agTextColumnFilter',  rowDrag: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,},
    {field: 'username', colSpan: p => p.data.username === "Bret" ? 2 : 1},
    {field: 'email', cellRenderer: simpleComp, cellRendererParams: {btnName: 'See'}},
    {field: 'website', rowSpan: p => p.data.id === 7 ? 2 : 1},
    {headerName: 'Address',
      colId: 'address',
      children: [
        {headerName: 'Street',field: 'address.street', colId:"street"},
        {headerName: 'City',field: 'address.city', colId:"city"},
        {headerName: 'Zipcode',field: 'address.zipcode', colId:"zipcode", filter: 'agNumberColumnFilter'}
      ]
    }
    
  ]);

  // const Sidebar = useMemo(() => {
  //   return {
  //     toolPanels: ['column'],
  //   }
  // }, [])

  // useEffect(() => {
  //  props.fetchData();
  //  console.log(props.data.user)
  //  setRowData(props.data)
  // }, []);

  // useEffect(() => {
  //   async function fetchUser() {
  //     await props.fetchDataWithAxios();
  //     console.log(store.getState());
  //     console.log(props.data);
  //         setRowData(props.data)
  //   }

  //   fetchUser();
  
  //  }, []);


  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);


  useEffect(() => {
    fetchDataWithAxios();
  }, [])

  const fetchDataWithAxios = async() => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            setRowData(res.data);
          } catch(err) {
            console.log(err.message);
          }
    }
   

  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    editable: true,
    // flex: 1,
    filterParams: {
      buttons: ['reset', 'apply'],
      debounceMs: 0
    },
    floatingFilter: true,
    enableRowGroup: true
  }), []);

  const isRowSelectable = useMemo(() => {
    return (params) => {
      return params.data.id % 2 === 0;
    };
  }, []);

  const savedFilterState = useRef();

  const onSaveBtn = () => {
    const filterModel = gridRef.current.api.getFilterModel();
    console.log(filterModel);
    savedFilterState.current = filterModel;
  }

  const onApplyBtn = () => {
    const filterModel = savedFilterState.current;
    gridRef.current.api.setFilterModel(filterModel);
  }

  const onDeselectBtn = () => {
    gridRef.current.api.deselectAll();
  }

  // const onBtnGrpEmailWebsite = () => {
  //   gridRef.current.columnApi.applyColumnState({
  //     state: [
  //       { colId: 'email', rowGroupIndex: 0 },
  //       { colId: 'website', rowGroupIndex: 1 },
  //     ],
  //     defaultState: { rowGroup: false },
  //   });
  // }

  const removeEmailBtn = () => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        {colId: 'email', hide: true}
      ]
    });
  }

  const showEmailBtn = () => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        {colId: 'email', hide: false}
      ]
    });
  }


  const saveState = () => {
    window.colState = gridRef.current.columnApi.getColumnState();
    console.log('column state saved');
  }

  const restoreState = () => {
    gridRef.current.columnApi.applyColumnState({
      state: window.colState,
      applyOrder: true
    });
  }

  const resetState = () => {
    gridRef.current.columnApi.resetColumnState();
  }

  const idToLastBtn = () => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        {colId: 'name'},
        {colId: 'username'},
        {colId: 'email'},
        {colId: 'website'},
        {colId: 'street'},
        {colId: 'city'},
        {colId: 'zipcode'},
        {colId: 'id'},

      ],
      applyOrder: true
    });
  }


  return (
        <>
          <button type='button' onClick={saveState}>Save State</button>
          <button type='button' onClick={restoreState}>Restore State</button>
          <button type='button' onClick={resetState}>Reset State</button>
          <button type='button' onClick={onSaveBtn}>Save Filter</button>
          <button type='button' onClick={onApplyBtn}>Restore Filter</button>
          <button type='button' onClick={onDeselectBtn}>Deselect All</button>
          <button type='button' onClick={removeEmailBtn}>Remove Email</button>
          <button type='button' onClick={showEmailBtn}>Show Email</button>
          <button type='button' onClick={idToLastBtn}>ID to Last</button>
          {/* <button type='button' onClick={onBtnGrpEmailWebsite}>Group Email - Website</button> */}
       
          <div className="ag-theme-alpine" style={{width: 1200, height: 1000}}>
            <AgGridReact ref={gridRef} 
            columnDefs={columnDefs} 
            rowData={rowData} 
            defaultColDef={defaultColDef} 
            rowSelection={'multiple'} 
            animateRows={true}
            headerHeight={headerHeight}
            groupHeaderHeight={groupHeaderHeight}
            floatingFiltersHeight={floatingFiltersHeight}
            getRowId={getRowId}
            suppressRowTransform={true}
            rowDragManaged={true}
            rowMultiSelectWithClick={true}
            isRowSelectable={isRowSelectable}>
       
            </AgGridReact>
            
          </div>
      
    </>

  );
};


// const mapStateToProps = (state) => {
//     return {
//         data: state.user.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchDataWithAxios: () => dispatch(fetchDataWithAxios()),
//         fetchData: () => dispatch(fetchData())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps) (GridDisplay);

export default GridDisplay;
