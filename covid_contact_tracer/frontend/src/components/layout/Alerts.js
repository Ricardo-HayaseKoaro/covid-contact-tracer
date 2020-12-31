import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    alerts_info: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    const { alert, alerts_info } = this.props;
    if (alerts_info.msg) {
      Object.keys( alerts_info.msg).map( (key) => {
        if (alerts_info.msg[key] == "This field is required") {
          alert.show(key+" "+alerts_info.msg[key], {
            type: alerts_info.type,
          })
        }
        else{
          alert.show(alerts_info.msg[key], {
            type: alerts_info.type,
          })
        }
      });
    }

  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  alerts_info: state.alerts,
});

export default connect(mapStateToProps)(withAlert()(Alerts));