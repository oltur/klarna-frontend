import React from 'react';
import Button from 'components/ui/Button/Button';
import createReactClass from 'create-react-class';

import $ from 'jquery';


const HomePage = createReactClass({

  getInitialState: function () {
    return {
      labelVisibility: 'visible',
      searchInputValue: ''
    }
  },

  updateInputValue: function (evt) {

    const searchInputValue = evt.target.value;

    const labelVisibility = (!searchInputValue) ?
      'visible' : 'hidden';

    this.setState({
      labelVisibility: labelVisibility,
      searchInputValue: searchInputValue
    });

  },

  getData1: function () {
    $.get(
      'https://klarna-187423.appspot.com/api/search?query=5802-8 Marie P 40&page=1',
      (result) => alert(JSON.stringify(result))
    );
  },

  searchInput: null,

  render: function () {
    return (
      <div>
        <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
          React Pages Boilerplate
      </h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button theme="blue"
          // onClick={this.getData1()}
          >Click me!!</Button>

        </div>

        <div className="search">
          <div className="cui__input giant">
            <label className="cui__input__label"
              style={{ visibility: this.state.labelVisibility }}
            >
              Type your search query
        </label>
            <input
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

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="anscombe.jpg" />

                <div className="cui__selector--direct__label">
                  Elizabeth Anscombe (65), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="tarski.jpg" />

                <div className="cui__selector--direct__label">
                  Alfred Tarski (74), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="quine.jpg" />

                <div className="cui__selector--direct__label">
                  Willard Van Orman Quine (82), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="nussbaum.jpg" />

                <div className="cui__selector--direct__label">
                  Martha Craven Nussbaum (50), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="beauvoir.jpg" />

                <div className="cui__selector--direct__label">
                  Simone de Beauvoir (44), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>

              <div className="cui__selector--direct__item">
                <img className="user-avatar" src="russell.jpg" />

                <div className="cui__selector--direct__label">
                  Bertrand Arthur William Russell (66), +46-771793336
            </div>

                <p className="cui__selector--direct__description">
                  Mackenzie Av, 34. Toronto, Canada.
            </p>
              </div>


            </div>

          </div>
        </div>

      </div>
    )
  }
});

export default HomePage;
