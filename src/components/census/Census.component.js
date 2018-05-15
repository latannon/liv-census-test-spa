import React, { Component } from "react";

import "./Census.css";
import Spinner from "../spinner/Spinner.component";
import Api from "../../api/Api";

/**
 * Census component shows a list of variables
 * Selecting one displays for each value the count of lines et average age
 *
 * @export
 * @class Census
 * @extends {Component}
 */
class Census extends Component {
  static LIMIT_RESUTLS = 10;
  static LIMIT_RESUTLS_DEFAULT_VALUES = [10, 25, 50, 100];
  /**
   * Creates an instance of Census.
   * @param {any} props
   * @memberof Census
   */
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      is_loaded: false,
      selected_limit_results: Census.LIMIT_RESUTLS,
      variables: [],
      selected_variable: null,
      search_is_launched: false,
      search_results: {
        total_results_count: null,
        data: []
      }
    };
    // TODO a corriger pour ne pas faire le binding manuellement !
    this.search = this.search.bind(this);
    this.canDoSearch = this.canDoSearch.bind(this);
    this.handleVariableSelection = this.handleVariableSelection.bind(this);
    this.handleLimitResultsSelection = this.handleLimitResultsSelection.bind(
      this
    );
  }

  /**
   * Render the component view
   *
   * @returns
   * @memberof Census
   */
  render() {
    const {
      error,
      is_loaded,
      selected_limit_results,
      variables,
      search_results
    } = this.state;

    return (
      <div className="Census">
        <div className="CensusFilters">
          <form>
            <div className="form-group">
              <label>
                Max lines :
                <select
                  className="form-control"
                  onChange={this.handleLimitResultsSelection}
                >
                  {Census.LIMIT_RESUTLS_DEFAULT_VALUES.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Variable:
                <select
                  className="form-control"
                  onChange={this.handleVariableSelection}
                >
                  <option value="">- Choose a variable -</option>
                  {variables.map(variable => (
                    <option value={variable.code}>{variable.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </form>
        </div>
        {!is_loaded ? (
          <Spinner />
        ) : error ? (
          <div className="alert alert-danger">{error.message}</div>
        ) : (
          <div className="CensusResults">
            {search_results.total_results_count > selected_limit_results ? (
              <div className="alert alert-info">
                There are <strong>{search_results.total_results_count}</strong>{" "}
                rows but only the <strong>{selected_limit_results}</strong>{" "}
                first lines are displayed (<strong>
                  {search_results.total_results_count - selected_limit_results}
                </strong>{" "}
                lines are not displayed).
              </div>
            ) : (
              <p />
            )}
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th className="col-md-8">Value</th>
                  <th className="col-md-2">Count</th>
                  <th className="col-md-2">Average age</th>
                </tr>
              </thead>
              <tbody>
                {search_results.data.map(row => (
                  <tr>
                    <td>{row.value}</td>
                    <td>
                      {/* on pourrait en faire un composant generique */
                      row.count.toLocaleString(navigator.language)}
                    </td>
                    <td>
                      {/* on pourrait en faire un composant generique */
                      row.avg_age.toLocaleString(navigator.language, {
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  /**
   *
   *
   * @memberof Census
   */
  componentDidMount() {
    this.loadVariablesList();
  }

  /**
   * Handles the limit results selection changes event
   *
   * @param {any} e event
   * @memberof Census
   */
  handleLimitResultsSelection(e) {
    this.setState({ selected_limit_results: e.target.value }, () => {
      if (this.canDoSearch()) {
        this.search();
      }
    });
  }

  /**
   * Handles the variable selection changes event
   *
   * @param {any} e
   * @memberof Census
   */
  handleVariableSelection(e) {
    this.setState({ selected_variable: e.target.value }, () => {
      if (this.canDoSearch()) {
        this.search();
      }
    });
  }

  /**
   * For a selected variable and a limit results selection,
   * this calls the API and does search with criteria
   *
   * @memberof Census
   */
  search() {
    const { selected_variable, selected_limit_results } = this.state;
    const self = this;
    this.setState(
      {
        is_loaded: false,
        search_results: {
          total_results_count: null,
          data: []
        }
      },
      () => {
        const apiSearchUrl = `${Api.getRootUrl()}/search?variable=${selected_variable}&limit_size=${selected_limit_results}`;
        console.log("Searching... : ", apiSearchUrl);
        fetch(apiSearchUrl)
          .then(res => res.json())
          .then(
            results => {
              self.setState({
                search_is_launched: true,
                is_loaded: true,
                search_results: results
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            error => {
              console.log(error);
              this.setState({
                is_loaded: true,
                error: this._buildMessageError(error)
              });
            }
          );
      }
    );
  }

  /**
   * Does API call to retrieve the variables list
   *
   * @memberof Census
   */
  loadVariablesList() {
    const apiGetVariablesUrl = `${Api.getRootUrl()}/variables`;
    fetch(apiGetVariablesUrl)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            is_loaded: true,
            variables: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            is_loaded: true,
            error: this._buildMessageError(error)
          });
        }
      );
  }

  /**
   * Check if the user fullfil requirement to do a search
   *
   * @returns
   * @memberof Census
   */
  canDoSearch() {
    const { is_loaded, selected_variable } = this.state;
    return selected_variable && is_loaded;
  }

  _buildMessageError(error) {
    return {
      message: "An unexpected error occured !",
      debug: error
    };
  }
}

export default Census;
