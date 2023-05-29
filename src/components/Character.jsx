import React, { Component } from "react";
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Delete from "./Delete";

class Character extends Component {
  state = { like: false }; // There are many versions of this state living in this component as state! 
  //Remember data flows down from App to Character, not up! So we need to lift the state in Character to App. 

  onLikeToggle = () => {
    this.setState({ like: !this.state.like });
  };

  render() {
    const { character, quote, image, id, characterDirection, liked } = this.props.item;
    const { like } = this.state;

  //   if (characterDirection === "Left") {
  //     // But here I'm repeating code
  //     return (
  //       <div className="characterContainer">
  //         <Name
  //           character={character}
  //           like={like}
  //           onLikeToggle={this.onLikeToggle}
  //         />
  //         <Quote quote={quote} />
  //         <Image image={image} like={like} />
  //         <Delete onDelete={this.props.onDelete} id={id}/> 
  //         {/* Now delete knows the content and the character that it's deleting */}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="characterContainer">
  //       <Name
  //         character={character}
  //         like={like}
  //         onLikeToggle={this.onLikeToggle}
  //       />
  //       <Quote quote={quote} />
  //       <Image image={image} like={like} />
  //       <Delete onDelete={this.props.onDelete} id={id}/> 
  //       {/* Now delete knows the content and the character that it's deleting */}
  //     </div>
  //   );
  // }

    return (
      <div className="characterContainer">
        <Name
          character={character}
          like={like}
          onLikeToggle={this.props.onLikeToggle}
          id={id}
          liked={liked}
        />
        <div className={characterDirection}> <Quote quote={quote}/> </div>
        <Image image={image} like={like} />
        <Delete onDelete={this.props.onDelete} id={id}/> 

      </div>
    );
  }
}

export default Character;
