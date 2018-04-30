import React, { Component } from "react";

import "./Census.css";

/**
 * 
 * 
 * @export
 * @class Census
 * @extends {Component}
 */
export class Census extends Component {
  props = {
    filters: []
  };

  /**
   * Creates an instance of Census.
   * @param {any} props 
   * @memberof Census
   */
  constructor(props) {
    super(props);
    if (!props || !props.filters) {
      // this.props = {};
      this.filters = [
        { id: "1", code: "education", label: "education" },
        { id: "2", code: "class of worker", label: "class of worker" }
      ];
    } else {
      this.props = props;
    }
    this.state = { results: [] };
    this.search = this.search.bind(this);
  }

  /**
   * 
   * 
   * @memberof Census
   */
  componentDidMount() {}

  /**
   * 
   * 
   * @returns 
   * @memberof Census
   */
  render() {
    return (
      <div className="Census">
        <div className="CensusFilters">
          <form>
            <label>
              Variable:{" "}
              <select>
                {this.filters.map(filter => (
                  <option value="">{filter.label}</option>
                ))}
              </select>
            </label>
            <input type="button" value="Search" onClick={this.search} />
          </form>
        </div>
        <div className="CensusResults">
          <table>
            <thead>
              <th>Value</th>
              <th>Count</th>
              <th>Average age</th>
            </thead>
            <tbody>
              {this.state.results.map(row => (
                <tr>
                  <td>{row.value}</td>
                  <td>{row.count}</td>
                  <td>{row.averageAge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /**
   * 
   * 
   * @memberof Census
   */
  search() {
    console.log("Searching...");
    this.setState({
      results: [
        { value: "less than 1st grade", count: "1234", averageAge: 45.5 },
        { value: "PhD", count: "123", averageAge: 34.4 }
      ]
    });
  }
}
