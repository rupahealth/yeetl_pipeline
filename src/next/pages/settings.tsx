import { autoBind } from "react-extras";
import { Component } from "react";
import { withRouter, SingletonRouter } from "next/router";

import { DeleteLocalStorageButton } from "../components/delete-local-storage-button";
import { navigate } from "../utils/navigate.util";
import { Popup } from "../components/popup";

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
        <DeleteLocalStorageButton closeSettings={this.closeSettings} />
      </Popup>
    );
  }
}

export default withRouter(Settings);
