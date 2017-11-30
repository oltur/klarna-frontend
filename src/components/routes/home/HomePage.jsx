import React from 'react';
import $ from 'jquery';
import Spinner from 'react-spinkit';
import Button from '../../ui/Button/Button';
import './homepage.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelVisibility: 'visible',
      searchInputValue: '',
      page: 1,
      data: [],
      queryInProgress: false,
    };
    this.delayTimer = null;
  }

  get hasData() {
    return (this.state.data && this.state.data.data && this.state.data.data.length > 0);
  }

  getData1(query, page) {
    console.log(`Querying for ${query}`);
    this.showProgress(true);
    return $.get(`https://klarna-187423.appspot.com/api/search?query=${query}&page=${page}`)
      .promise();
  }

  setPage(page) {
    if (page >= 1) {
      this.setState({
        ...this.state,
        page,
      });
      this.doSearch(1);
    }
  }

  doSearch(timeout = 1000) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.getData1(this.state.searchInputValue, this.state.page).then((result) => {
        console.log(`Result for ${this.state.searchInputValue}`);
        // console.log(result);
        this.showProgress(false);
        this.setState({
          ...this.state,
          data: result,
        });
        this.forceUpdate();
      });
    }, timeout); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  showProgress(show) {
    if (show) {
      this.setState({
        ...this.state,
        queryInProgress: true,
      });
    } else {
      this.setState({
        ...this.state,
        queryInProgress: false,
      });
    }
  }

  updateInputValue(evt) {
    const searchInputValue = evt.target.value;

    const labelVisibility = (!searchInputValue) ?
      'visible' : 'hidden';

    this.setState({
      ...this.state,
      labelVisibility,
      searchInputValue,
      page: 1,
    });

    if (searchInputValue) {
      this.doSearch();
    }
  }

  render() {
    //console.log(this.state.data.data);
    const navPrev =
      this.hasData && this.state.data.hasPrev ?
        (
          <Button theme="blue" onClick={() => this.setPage(this.state.page - 1)}>Prev</Button>
        )
        : null;

    const navNext =
      this.hasData && this.state.data.hasNext ?
        (
          <Button theme="blue" onClick={() => this.setPage(this.state.page + 1)}>Next</Button>
        )
        : null;


    const listItems = this.hasData ?
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

        <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
          People Search for Klarna
        </h1>

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
                Search results, page {this.state.page}
              </h2>
              {
                this.state.queryInProgress ?
                  <Spinner
                    name="ball-spin-fade-loader"
                    style={{
                      position: 'relative',
                      left: '50%',
                      top: '50px',
                      width: '100px',
                      zIndex: 1000,
                    }}
                  />
                  : null
              }
              <div className="navigation">
                {navPrev}{navNext}
              </div>
              {listItems}
              <div className="navigation">
                {navPrev}{navNext}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
