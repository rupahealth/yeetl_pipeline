import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import {
  Heading,
  minorScale,
  Pane,
  Switch,
  Text,
  TagInput,
  Icon
} from "evergreen-ui";

import { withData } from "../../hocs/with-data";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";

interface KeyboardBindingsProps extends DataConsumerState {
  closeSettings(): void;
}

class KeyboardBindings extends Component<KeyboardBindingsProps> {
  constructor(props: KeyboardBindingsProps) {
    super(props);
    autoBind(this);
  }

  toggleEnable(enabled: boolean) {
    const { updateSettings, settings } = this.props;

    settings.keyboard.enabled = enabled;
    updateSettings(settings);
  }

  render() {
    const { settings } = this.props;
    const { enabled, shortcuts } = settings.keyboard;

    return (
      <Fragment>
        <Pane
          borderBottom={"1px solid #EDF0F2"}
          borderTop={"1px solid #EDF0F2"}
          paddingBottom={minorScale(3)}
          paddingTop={minorScale(3)}
        >
          <Pane
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={minorScale(3)}
          >
            <Heading size={400}>Keyboard Shortcuts</Heading>
            <Pane
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
            >
              <Text textTransform={"uppercase"} size={300}>
                {enabled ? "Enabled" : "Disabled"}
              </Text>
              <Switch
                marginLeft={minorScale(3)}
                height={20}
                checked={enabled}
                onChange={(e: any) => this.toggleEnable(e.target.checked)}
              />
            </Pane>
          </Pane>

          <TagInput
            cursor={"default !important"}
            inputProps={{ display: "none" }}
            width={"100%"}
            disabled={true}
            values={shortcuts}
            tagProps={{ isInteractive: false }}
          />

          <Pane
            marginLeft={minorScale(1)}
            marginTop={minorScale(2)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
          >
            <Icon icon={"help"} color={"muted"} size={14} />
            <Heading marginLeft={minorScale(1)} size={200}>
              Open current repository or file.
            </Heading>
          </Pane>
        </Pane>
      </Fragment>
    );
  }
}

export default withData(KeyboardBindings);
