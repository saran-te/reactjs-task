import { Component } from "react";
import { connect } from "react-redux";

class Details2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displayData = this.props.datas.map((data) => {
    return (
      <div>
        <p>{data.email}</p>
        <p>{data.mob}</p>
        <p>{data.city}</p>
      </div>
    );
  });

  render() {
    return (
      <>
        <h1>Details 2</h1>
        {this.displayData}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    datas: [...state.form2],
  };
};

export default connect(mapStateToProps)(Details2);
