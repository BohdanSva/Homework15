import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );

      data.forEach((element, index) => { // Fixes the API data to have unique ID
        element.id = Math.random() + index; // They'll get a sequential unique number
      });

    this.setState({ simpsons: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex(char => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];

    // Inverts if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  }

  onDelete = (id) => { // But this function lives up in App, and I need to get my function down to component Delete.jsx
    // const simpsons = [...this.state.simpsons]; // It's considered good practice to make a copy
    // simpsons.splice(index, 1); // Now my copy has 1 removed
    // this.setState({ simpsons })
    // console.log(quote, character);

    const indexOf = this.state.simpsons.findIndex(char => {
      return char.id === id;
    });

    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1); 
    this.setState({ simpsons })
    
  };

// Filter application and sorting
  applyFilter = () => {
    const {searchInput, alphaSort} = this.state; // Define searchInput and alphaSort - the sorting type variable

    let filteredList = [...this.state.simpsons]; // Filtered list is a copy of simpsons
    console.log(filteredList);

   //Filter by search input box:
   if(searchInput) { // Only kicks in if there is a search input - I don't need to keep it in the state!
    filteredList = filteredList.filter((item) => {
       if (
         item.character.toLowerCase().includes(searchInput.toLowerCase())
         ) {
           return true;
         }
     });
   }

     // Sort by alphabetical order, by character's name:
     if (alphaSort === 'asc') {
      filteredList.sort((itemOne, itemTwo) => {
        if(itemOne.character > itemTwo.character) return 1;
        if(itemOne.character < itemTwo.character) return -1;
      });
     } else if (alphaSort === 'desc') {
      filteredList.sort((itemOne, itemTwo) => {
        if(itemOne > itemTwo) return -1;
        if(itemOne < itemTwo) return 1;
      });
     }
     // Return the result of the filter and the sort:
     return filteredList;
    }

// Filter input controls
onSearchInput = (event) => {
  this.setState({searchInput: event.target.value});
}

onAlphaSort = (event) => {
  this.setState({alphaSort: event.target.value});
}

  render() {
    const { simpsons } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything</p>

    // calculate the total
    // I'm not going to save this number in the state, because it's always recalculated

    let total = 0;
    simpsons.forEach(char => {
      if (char.liked) total++;
    })

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>

        <input onInput={this.onSearchInput} type="text"></input>

        <select onChange={this.onAlphaSort}>
          <option value="">Please choose alphabetical character sorting</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <Simpsons 
        // simpsons={simpsons}
        simpsons={this.applyFilter()}
        onAlphaSort={this.onAlphaSort}
        onDelete={this.onDelete}
        onLikeToggle={this.onLikeToggle}/>
      </>
    );
  }
}

export default App;
