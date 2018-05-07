import React, { Component } from 'react';
import './main-page.css';
import AppPresentation from './app-presentation';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
  }

  componentWillMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
      .then(rsp => rsp.json())
      .then(allHouses => {
        this.allHouses = allHouses;
        this.determineFeaturedHouse();
        this.determineUniqueCountries();
      })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  render() {
    return (
      <AppPresentation country={this.state.country} 
        filteredHouses={this.state.filteredHouses} 
        featuredHouse={this.state.featuredHouse}
        countries={this.state.countries} filterHouses={this.filterHouses} 
        activeHouse={this.state.activeHouse} setActiveHouse={this.setActiveHouse} />
    )
  }
}

export default App;

