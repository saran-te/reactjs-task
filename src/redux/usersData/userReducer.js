import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from './actionType';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './userActions';
import axios from 'axios';


export const initialState = {
        loading: false,
        user: [],
        error: ''
    }

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST: return {
            ...state.user,
            loading: true
        }

        case FETCH_USER_SUCCESS: return {
            ...state.user,
            loading: false,
            user: action.payload,
            error: ''
        }

        case FETCH_USER_FAILURE: return {
            ...state.user,
            loading: false,
            user: [],
            error: action.payload
        }

        default: return state;
    }
}


export const fetchData = () => {
    console.log("fetching1")
    return function(dispatch){
        // try {
            console.log("fetching2")
            dispatch(fetchUserRequest)
            fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((result) => dispatch(fetchUserSuccess(result)))
            .catch((err) => dispatch(fetchUserFailure(err.message)))
            // const data = await res.json();
            // console.log(data);
            
        //   } catch(err) {
        //     console.log(err.message)
        //     dispatch(fetchUserFailure(err.message))
        //   }
    }
    
  }



 export const fetchDataWithAxios = () => {

    return async(dispatch) => {
        try {
            dispatch(fetchUserRequest)
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      
            console.log(res.data);
            dispatch(fetchUserSuccess(res.data))
          } catch(err) {
            console.log(err.message);
            dispatch(fetchUserFailure(err.message))
          }
    }
   
  }