import { Component } from "react";
import { connect } from "react-redux";

class Details2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Details 2</h1>
        <p>{this.props.data.mob}</p>
        <p>{this.props.data.email}</p>
        <p>{this.props.data.city}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: {
      ...state.form2
    }
  };
};

export default connect(mapStateToProps)(Details2);
