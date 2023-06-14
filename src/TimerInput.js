
import React, { Component } from "react";

export class TimerInput extends Component {
  render() {
    return (
      <div>
        <h3>Input your desired time in minutes</h3>
        <input
          type="number"
          value={this.props.value}
          onChange={this.props.handleChange}
          required
        />
        <br /> <br />
        {!this.props.isClicked && (
          <button onClick={this.props.startCountDown}>Start</button>
        )}
      </div>
    );
  }
}

export class Timer extends Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.minutes}:{this.props.seconds}
        </h1>
      </div>
    );
  }
}

export class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "",
      seconds: "00",
      value: "",
      isClicked: false
    };

    this.intervalHandle = null;

    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  tick() {
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - min * 60;
    this.setState({
      minutes: min,
      seconds: sec < 10 ? "0" + sec : sec
    });

    if (min === 0 && sec === 0) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--;
  }

  startCountDown() {
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      minutes: "",
      isClicked: true
    });
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  render() {
    const { isClicked, minutes, seconds, value } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <TimerInput
              value={value}
              handleChange={this.handleChange}
              isClicked={isClicked}
              startCountDown={this.startCountDown}
            />
            {isClicked ? (
              <Timer minutes={minutes} seconds={seconds} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
