import React, { Component } from "react";
import CharCard from "./components/CharCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import characters from "./characters.json";
import "./App.css";

// Function to randomize picture display
function rearrangePics(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Set stateful component
class App extends Component {
  state = {
    characters,
    currentScore: 0,
    topScore: 0,
    results: "",
    clicked: [],
  };

  // Handle each click event
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  // Handle the score incrementing
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      results: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ results: "The Force is strong with you." });
    }
    this.handleRearrange();
  };

  // Handle page reset on game over
  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      results: "You have failed me for the last time...",
      clicked: []
    });
    this.handleRearrange();
  };

  // Handle rearranged character display on event
  handleRearrange = () => {
    let rearrangedCharacters = rearrangePics(characters);
    this.setState({ characters: rearrangedCharacters });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Star Wars: The Empire Clicks Back"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          results={this.state.results}
        />

        <Title>
          Click on a character. You earn 1 point for every character you click. 
          If you click on the same character twice, the Dark Side will destory you.
        </Title>

        <Container>
          <Row>
            {this.state.characters.map(character => (
              <Column size="md-3 sm-6">
                <CharCard
                  key={character.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleRearrange={this.handleRearrange}
                  id={character.id}
                  image={character.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;