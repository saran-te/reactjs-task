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
    <p>{p.value}</p>
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

  const [columnDefs, setColumnDefs] = useState([
    {field: 'name', width: 150, resizable: true, pinned: 'left', lockPinned: true, filter: 'agTextColumnFilter'},
    {field: 'username', lockPosition: true},
    {field: 'email', cellRenderer: simpleComp, cellRendererParams: {btnName: 'See'}},
    {field: 'website'},
    {headerName: 'Address',
      children: [
        {headerName: 'Street',field: 'address.street'},
        {headerName: 'City',field: 'address.city'},
        {headerName: 'Zipcode',field: 'address.zipcode', filter: 'agNumberColumnFilter'}
      ]
    }
    
  ]);

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
    floatingFilter: true
  }), []);

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

  return (
        <>
          <button type='button' onClick={onSaveBtn}>Save</button>
          <button type='button' onClick={onApplyBtn}>Apply</button>
          <button type='button' onClick={onDeselectBtn}>Deselect All</button>
          <div className="ag-theme-alpine" style={{width: 1200, height: 1000}}>
            <AgGridReact ref={gridRef} columnDefs={columnDefs} rowData={rowData} defaultColDef={defaultColDef} rowSelection={'multiple'} animateRows={true}></AgGridReact>
            
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
