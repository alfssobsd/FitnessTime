import Stopwatch from "../../Components/StopwatchComponent/StopwatchComponent";

const propTypes = {
  rest: React.PropTypes.string.isRequired,
  repeats: React.PropTypes.string.isRequired
};

class StopwatchContainer extends React.Component {
  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
    this.setRestTime = this.setRestTime.bind(this);
    this.state = {
      repeats: "",
      restMinutes: "",
      restSeconds: "",
      repeatsDone: 0,
      isComplete: false,
      isTimerWorking: false
    };
  }

  componentWillMount() {
    this.setState({
      rest: this.props.rest,
      repeats: +this.props.repeats
    });
    this.setRestTime();
  }

  setRestTime() {
    var timer = this.props.rest.split(":");
    this.setState({
      restMinutes: +timer[0],
      restSeconds: +timer[1]
    });
  }

  startTimer() {
    let secondsRemaining = this.state.restSeconds;
    let minutesRemaining = this.state.restMinutes;

    if (this.state.repeats === this.state.repeatsDone) {
      this.setState({
        isComplete: true
      });
      return;
    }
    if (minutesRemaining !== 0 || secondsRemaining !== 0){
      this.setState({
        isTimerWorking: true
      });
      setTimeout(() => {
        if (secondsRemaining === 0) {
          --minutesRemaining;
          secondsRemaining = 60;
        }
        this.setState({
          restMinutes: minutesRemaining,
          restSeconds: --secondsRemaining
        });
        this.startTimer();
      }, 1000);
    } else {
      this.setRestTime();
      this.setState({
        repeatsDone: ++this.state.repeatsDone,
        isTimerWorking: false
      });
    }
  }

  showTimer() {
    let minutesRemaining = this.state.restMinutes;
    let secondsRemaining = this.state.restSeconds;
    if (minutesRemaining < 10) minutesRemaining = `0${minutesRemaining}`;
    if (secondsRemaining < 10) secondsRemaining = `0${secondsRemaining}`;
    const timer = `${minutesRemaining}:${secondsRemaining}`;
    return timer;
  }

  render() {
    return (
      <Stopwatch
        rest={this.showTimer()}
        repeatsDone={this.state.repeatsDone}
        startTimer={this.startTimer}
        isComplete={this.state.isComplete}
        isTimerWorking={this.state.isTimerWorking}
      />
    );
  }
}

StopwatchContainer.propTypes = propTypes;

export default StopwatchContainer;