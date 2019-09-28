import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import {
  Heading,
  minorScale,
  Pane,
  Switch,
  Text,
  TagInput,
  Icon,
  Link
} from "evergreen-ui";

import { withData } from "../../hocs/with-data";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";
import { isFirefox } from "../../../common/utils/is-firefox.util";

const SHORTCUT_MAP = {
  Shift: "⇧ Shift",
  Ctrl: "⌃ Ctrl",
  Alt: "⌥ Option",
  Command: "⌘ Cmd",
  MacCtrl: "⌃ Ctrl",
  "⇧": "⇧ Shift",
  "⌘": "⌘ Cmd",
  "⌃": "⌃ Ctrl",
  "⌥": "⌥ Option"
};

interface KeyboardBindingsProps extends DataConsumerState {
  closeSettings(): void;
}

interface KeyboardBindingState {
  shortcut: string[];
}

class KeyboardBindings extends Component<
  KeyboardBindingsProps,
  KeyboardBindingState
> {
  constructor(props: KeyboardBindingsProps) {
    super(props);
    autoBind(this);

    this.state = {
      shortcut: []
    };
  }

  toggleEnable(enabled: boolean) {
    const { updateSettings, settings } = this.props;

    settings.keyboard.enabled = enabled;
    updateSettings(settings);
  }

  openKeyboardSettings() {
    const url = isFirefox()
      ? "https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox"
      : "chrome://extensions/shortcuts";

    browser.tabs.create({
      active: true,
      url
    });

    window.close();
  }

  filterShortcuts(input: string) {
    if (input.length === 0) {
      return [];
    }

    if (isFirefox()) {
      return input.split("+").map(value => SHORTCUT_MAP[value] || value);
    } else {
      return input.split("").map(value => SHORTCUT_MAP[value] || value);
    }
  }

  async componentDidMount() {
    const { shortcut } = (await browser.commands.getAll()).find(
      ({ name }) => name === "open-repo-or-file"
    );

    this.setState({
      shortcut: this.filterShortcuts(shortcut)
    });
  }

  render() {
    const { settings } = this.props;
    const { shortcut } = this.state;
    const { enabled } = settings.keyboard;

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
            paddingBottom={minorScale(3)}
          >
            <Heading size={400}>Keyboard Shortcut</Heading>
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
            values={shortcut}
            tagProps={{ isInteractive: false }}
          />

          <Pane
            marginTop={minorScale(2)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
          >
            <Icon icon={"help"} color={"muted"} size={14} />
            <Text marginLeft={minorScale(1)} size={200}>
              Update the keyboard shortcut{" "}
              <Link cursor={"pointer"} onClick={this.openKeyboardSettings}>
                here.
              </Link>
            </Text>
          </Pane>
        </Pane>
      </Fragment>
    );
  }
}

export default withData(KeyboardBindings);
