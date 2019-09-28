import { autoBind } from "react-extras";
import { Component } from "react";
import { withRouter, SingletonRouter } from "next/router";
import { Heading, IconButton, minorScale, Pane, Tooltip } from "evergreen-ui";

import { Data } from "../../../common/interfaces/data.interface";

interface SettingsTitleProps {
  router: SingletonRouter;
}

class SettingsTitle extends Component<SettingsTitleProps> {
  constructor(props: SettingsTitleProps) {
    super(props);
    autoBind(this);
  }

  back() {
    const { router } = this.props;
    router.back();
  }

  render() {
    return (
      <Pane
        marginBottom={16}
        marginTop={16}
        width={"100%"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Tooltip content="Back">
          <IconButton onClick={this.back} icon="arrow-left" />
        </Tooltip>
        <Heading marginLeft={minorScale(3)} size={600}>
          Settings
        </Heading>
      </Pane>
    );
  }
}

export default withRouter(SettingsTitle);
