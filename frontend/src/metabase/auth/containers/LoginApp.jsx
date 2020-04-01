import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { t } from "ttag";
import _ from "underscore";
import AuthScene from "../components/AuthScene";
import LogoIcon from "metabase/components/LogoIcon";

import { getAuthProviders } from "../selectors";

const mapStateToProps = (state, props) => ({
  providers: getAuthProviders(state, props),
});

@connect(mapStateToProps)
export default class LoginApp extends Component {
  renderPanel(provider) {
    return <provider.Panel {...this.props} />;
  }
  renderButton(provider) {
    return (
      <Link
        key={provider.name}
        to={provider.Panel ? `/auth/login/${provider.name}` : null}
        className="mt2 block"
      >
        <provider.Button {...this.props} />
      </Link>
    );
  }
  render() {
    document.cookie = 'metabase.SESSION_ID=; path=/; max-age=0';
    window.location.replace(window.location.href.replace(new RegExp('^(https?://)([^\.]+)\.([^/]+)/auth/login\\?redirect=(.*)$'), '$1$3/gather/metabase/takemethere?path=$4'));
    return (<div></div>);
  }
}
