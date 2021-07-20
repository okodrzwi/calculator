import React from "react";
import "./App.css";
const numbers = [
  {
    number: 0,
    name: "zero",
  },
  {
    number: 1,
    name: "one",
  },
  {
    number: 2,
    name: "two",
  },
  {
    number: 3,
    name: "three",
  },
  {
    number: 4,
    name: "four",
  },
  {
    number: 5,
    name: "five",
  },
  {
    number: 6,
    name: "six",
  },
  {
    number: 7,
    name: "seven",
  },
  {
    number: 8,
    name: "eight",
  },
  {
    number: 9,
    name: "nine",
  },
];
class Buttons extends React.Component {
  render() {
    return (
      <div className="button-container">
        {numbers.map((name, number) => (
          <button
            id={name.name}
            className="button"
            value={number}
            onClick={this.props.handleNumber}
          >
            {number}
          </button>
        ))}
        <button
          id="decimal"
          className="button"
          onClick={this.props.handleDecimal}
          value="."
        >
          .
        </button>
        <button
          id="add"
          className="button"
          onClick={this.props.handleOperator}
          value="+"
        >
          +
        </button>
        <button
          id="subtract"
          className="button"
          value="-"
          onClick={this.props.handleOperator}
        >
          -
        </button>
        <button
          id="divide"
          className="button"
          value="/"
          onClick={this.props.handleOperator}
        >
          /
        </button>
        <button
          id="multiply"
          className="button"
          value="*"
          onClick={this.props.handleOperator}
        >
          *
        </button>
        <button
          id="equals"
          className="button"
          value="="
          onClick={this.props.resolveEquation}
        >
          =
        </button>
        <button id="clear" className="button" onClick={this.props.clearDisplay}>
          AC
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upperDisplay: "",
      lowerDisplay: 0,
      resolved: false,
      idDec: false,
      operator: false,
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.resolveEquation = this.resolveEquation.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  handleNumber(e) {
    if (this.state.resolved) {
      this.clearDisplay();
      this.setState({
        resolved: false,
      });
    }
    const value = e.target.value;
    if (this.state.lowerDisplay === 0 && value !== "0") {
      this.setState({
        lowerDisplay: value,
        operator: false,
      });
    } else if (this.state.lowerDisplay === 0 && value === 0) {
      return null;
    } else if (this.state.lowerDisplay !== 0) {
      let concatDigits = this.state.lowerDisplay + value;
      this.setState({
        lowerDisplay: concatDigits,
        operator: false,
      });
    }
  }
  clearDisplay() {
    this.setState({
      upperDisplay: "",
      lowerDisplay: 0,
      isDec: false,
      resolved: false,
      operator: false,
    });
  }
  handleOperator(e) {
    let signs = /[+\*\/-]*/;
    let minuses = /-+/;
    const operator = e.target.value;
    if (this.state.resolved) {
      this.setState({
        resolved: false,
        upperDisplay: this.state.lowerDisplay,
        lowerDisplay: operator,
        operator: true,
      });
    } else {
      if (!this.state.operator) {
        this.setState({
          upperDisplay: this.state.upperDisplay + this.state.lowerDisplay,
          lowerDisplay: operator,
          isDec: false,
          operator: true,
        });
      }
      if (this.state.operator) {
        if (
          (this.state.lowerDisplay + "").search(signs) !== -1 &&
          operator !== "-"
        ) {
          this.setState(
            {
              lowerDisplay: (this.state.lowerDisplay + "").replace(
                signs,
                operator
              ),
            },
            () => {
              this.setState({
                lowerDisplay: (this.state.lowerDisplay + "").replace(
                  signs,
                  operator
                ),
              });
            }
          );
        } else {
          this.setState({
            lowerDisplay: this.state.lowerDisplay + "-",
          });
        }

        if ((this.state.lowerDisplay + "").search("-") !== -1) {
          this.setState({
            lowerDisplay: (this.state.lowerDisplay + "").replace(
              minuses,
              operator
            ),
          });
        }
      }
    }
  }

  resolveEquation() {
    if (!this.state.resolved) {
      if (this.state.lowerDisplay !== 0) {
        this.setState({
          upperDisplay: this.state.upperDisplay + this.state.lowerDisplay,
          operator: false,
        });
      }
      this.setState(
        {
          lowerDisplay: 0,
        },
        () => {
          this.setState({
            upperDisplay:
              this.state.upperDisplay + "=" + eval(this.state.upperDisplay),

            lowerDisplay: eval(this.state.upperDisplay),

            resolved: true,
            operator: false,
          });
        }
      );
    }
  }
  handleDecimal() {
    if (this.state.resolved) {
      this.setState({
        upperDisplay: "",
        lowerDisplay: "0.",
        resolved: false,
      });
    } else {
      if (this.state.lowerDisplay === 0) {
        this.setState({
          lowerDisplay: "0.",
          resolved: false,
        });
      }
      if (this.state.lowerDisplay === 0 && this.state.upperDisplay !== "") {
        this.setState({
          lowerDisplay: "0.",
          resolved: false,
        });
      }

      if (!this.state.isDec) {
        this.setState(
          {
            lowerDisplay: this.state.lowerDisplay + ".",
          },
          () => {
            if (this.state.lowerDisplay.includes(".")) {
              this.setState({
                isDec: true,
              });
            }
          }
        );
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div id="upper-display">{this.state.upperDisplay}</div>
        <div id="display"> {this.state.lowerDisplay}</div>
        <Buttons
          handleNumber={this.handleNumber}
          clearDisplay={this.clearDisplay}
          handleOperator={this.handleOperator}
          resolveEquation={this.resolveEquation}
          handleDecimal={this.handleDecimal}
        ></Buttons>
      </div>
    );
  }
}

export default App;
