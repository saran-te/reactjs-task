import { Component } from "react";
import { connect } from "react-redux";
import { initialState } from "../redux/formClass/form2Reducer";
import { addDetails } from "../redux/formClass/formActions";
import store from "../redux/store";

class FormClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    this.props.addDetails(this.state);

    console.log("updated state: ");
    console.log(store.getState());
  };

  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        <h1>Class component</h1>
        <input
          type="text"
          placeholder="Mobile Number"
          onChange={(e) =>
            this.setState({ ...this.state, mob: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            this.setState({ ...this.state, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          onChange={(e) =>
            this.setState({ ...this.state, city: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: {
//       ...state
//     }
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    addDetails: (data) => dispatch(addDetails(data))
  };
};

export default connect(null, mapDispatchToProps)(FormClassComponent);
