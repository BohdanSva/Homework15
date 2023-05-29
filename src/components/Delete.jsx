import React, { Component } from "react";

class Delete extends Component {
  render() {
    console.log(this.props);

    const {onDelete, id} = this.props; // "onDelete and id come from this.props", so we destructure

    return (
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  }
}

export default Delete;
