import React, { Component } from "react";
import Character from "./Character";

class Simpsons extends Component {
  render() {
    const { simpsons, onDelete, onLikeToggle, onAlphaSort } = this.props;

    return (
      <>
        {simpsons.map((item, index) => {
          return <Character 
          item={item} 
          key={item.id} 
          onLikeToggle={this.props.onLikeToggle}
          onDelete={this.props.onDelete}
          onAlphaSort={this.props.onAlphaSort}
          />;
        })}
      </>
    );
  }
}

export default Simpsons;
