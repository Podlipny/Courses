// Container comp vs Presentational comp Example

// Presentation Component
class Door extends React.Component {
    render() {
        return (
            <div>I am a door on the {this.props.side} side.</div>
        )
    }
}

// Presentation Component
class Tire extends React.Component {
    render() {
        return (
            <div>I am a {this.props.size} {this.props.color} tire.</div>
        )
    }
}

// Container Component
class Car extends React.Component {
  render() {
    var { make, tireSize, tireColor } = this.props;

    return (
      <div>
        I am a car of make: {make}
        <Door side="Driver"/> <Door side="Passenger"/>
        <Tire size={tireSize} color={tireColor} /> <Tire size={tireSize} color={tireColor} />
        <Tire size={tireSize} color={tireColor} /> <Tire size={tireSize} color={tireColor} />
      </div>
    )
  }
}

export default connect((state) => {
  return {
    make: state.carMake,
    model: state.carModel,
    tireSize: state.tireSize,
    tireColor: state.tireColor
  }
})(Car);

