import React, { Component } from "react";

import "./Spinner.css";

/**
 * Spinner component.
 * This is a reusable comp for loading need
 *
 * @export
 * @class Spinner
 * @extends {Component}
 */
class Spinner extends Component {
  render() {
    return (
      <div className="vertical-centered-box">
        <div className="content">
          <div className="loader-circle" />
          <div className="loader-line-mask one">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask two">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask three">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask four">
            <div className="loader-line" />
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;