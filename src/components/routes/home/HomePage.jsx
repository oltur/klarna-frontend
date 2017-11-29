import React from 'react';
// import Button from 'components/ui/Button/Button';
// import createReactClass from 'create-react-class';

import $ from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelVisibility: 'visible',
      searchInputValue: '',
      data: [],
    };
    this.delayTimer = null;
  }

  getData1(query) {
    console.log(`Querying for ${query}`);
    if (query) {
      $.get(
        `https://klarna-187423.appspot.com/api/search?query=${query}&page=1`,
        (result) => {
          // console.log(`Result for ${query}`);
          // console.log(result);
          this.setState({
            ...this.state,
            data: result,
          });
          //          alert(JSON.stringify(result));
        }
      );
    }
  }

  doSearch(query) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.getData1(query);
    }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  updateInputValue(evt) {
    const searchInputValue = evt.target.value;

    const labelVisibility = (!searchInputValue) ?
      'visible' : 'hidden';

    this.setState({
      ...this.state,
      labelVisibility,
      searchInputValue,
    });

    this.doSearch(searchInputValue);
  }

  render() {
    //console.log(this.state.data.data);
    const listItems = (this.state.data && this.state.data.data && this.state.data.data.length > 0) ?
      this.state.data.data.map((item) =>
        (
          <div key={item.id} className="cui__selector--direct__item">
            <img alt="person" className="user-avatar" src={item.picture} />

            <div className="cui__selector--direct__label">
              {item.name} ({item.age}), {item.phone}
            </div>

            <p className="cui__selector--direct__description">
              {item.address.street}. {item.address.city}, {item.address.country}.
            </p>
          </div>
        )) : (<div>No data</div>);

    return (
      <div>

        <div className="search">
          <div className="cui__input giant">
            <label
              htmlFor="searchInput"
              className="cui__input__label"
              style={{ visibility: this.state.labelVisibility }}
            >
              Type your search query
            </label>
            <input
              id="searchInput"
              value={this.state.searchInputValue}
              onChange={(evt) => this.updateInputValue(evt)}
              className="cui__input__input"
            />
          </div>

          <div className="results">

            <div className="cui__selector--direct title">

              <h2 className="cui__selector--direct__title">
                Search results
              </h2>

              {listItems}

            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
