import { autoBind } from "react-extras";
import { Component } from "react";
import { Pane, minorScale, Heading, Link, Icon } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

import { DeleteLocalStorageButton } from "../components/delete-local-storage-button";
import { KeyboardBindings } from "../components/keyboard-bindings";
import { navigate } from "../utils/navigate.util";
import { Popup } from "../components/popup";
import { SettingsTitle } from "../components/settings-title";

interface SettingsProps {
  router: SingletonRouter;
}

class Settings extends Component<SettingsProps> {
  constructor(props: SettingsProps) {
    super(props);

    autoBind(this);
  }

  closeSettings() {
    const { router } = this.props;

    navigate(router, "/");
  }

  render() {
    return (
      <Popup paddingLeft={16} paddingRight={16}>
        <SettingsTitle />
        <KeyboardBindings />
        <DeleteLocalStorageButton closeSettings={this.closeSettings} />
        <Pane borderBottom={"1px solid #EDF0F2"} marginTop={minorScale(3)} />
      </Popup>
    );
  }
}

export default withRouter(Settings);
