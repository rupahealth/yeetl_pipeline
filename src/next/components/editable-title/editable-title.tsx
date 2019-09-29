import { autoBind, Choose } from "react-extras";
import { Component, FormEvent } from "react";
import { withRouter, SingletonRouter } from "next/router";
import {
  Heading,
  IconButton,
  minorScale,
  Pane,
  TextInput,
  Tooltip
} from "evergreen-ui";
import ClickOutHandler from "react-onclickout";

import { Data } from "../../../common/interfaces/data.interface";
import { navigate } from "../../utils/navigate.util";
import { Repo } from "../../../common/interfaces/repo.interface";
import { withData } from "../../hocs/with-data";

const footerMessage = "press ⏎ to submit value";

interface EditableTitleProps extends Data {
  repo: Repo;
  router: SingletonRouter;
  updateRepo(repo: Repo): void;
  updateFooter(footer: string): void;
}

interface EditableTitleState {
  editing: boolean;
}

class EditableTitle extends Component<EditableTitleProps, EditableTitleState> {
  constructor(props: EditableTitleProps) {
    super(props);
    autoBind(this);

    this.state = {
      editing: false
    };
  }

  input: HTMLInputElement;

  focus() {
    const { updateFooter } = this.props;

    this.setState({ editing: true }, () => {
      setTimeout(() => updateFooter(footerMessage), 10);
      this.input.focus && this.input.focus();
    });
  }

  updateName(value: string) {
    const { repo, updateRepo } = this.props;

    repo.name = value;
    updateRepo(repo);
  }

  navigateHome() {
    const { router } = this.props;
    navigate(router, "/");
  }

  onSubmit(e: FormEvent) {
    e.stopPropagation();

    this.props.updateFooter(undefined);
    this.setState({ editing: false });
  }

  render() {
    const { editing } = this.state;
    const { repo } = this.props;
    const value = repo.name;

    return (
      <Pane
        marginBottom={16}
        marginTop={16}
        width={"100%"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Tooltip content="Back to Repositories">
          <IconButton
            flexShrink={0}
            onClick={this.navigateHome}
            icon="arrow-left"
          />
        </Tooltip>
        <Choose>
          <Choose.When condition={editing}>
            <ClickOutHandler onClickOut={this.onSubmit}>
              <form
                onBlur={this.onSubmit}
                onSubmit={this.onSubmit}
                style={{
                  display: "flex-inline",
                  marginLeft: minorScale(3),
                  flex: 1
                }}
              >
                <TextInput
                  innerRef={(ref: HTMLInputElement) => {
                    this.input = ref;
                  }}
                  height={32}
                  onChange={(e: any) => this.updateName(e.target.value)}
                  placeholder={"maxchehab/gh-code"}
                  spellCheck={false}
                  value={value}
                  width={"100%"}
                />
              </form>
            </ClickOutHandler>
          </Choose.When>
          <Choose.Otherwise>
            <Heading
              whiteSpace={"nowrap"}
              marginLeft={minorScale(3)}
              onClick={this.focus}
              cursor={"pointer"}
              textDecoration={"underline"}
              size={600}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              flexGrow={1}
            >
              {value}
            </Heading>
            <Tooltip content="Edit the name">
              <IconButton
                flexShrink={0}
                marginLeft={minorScale(3)}
                height={24}
                onClick={this.focus}
                icon="edit"
              />
            </Tooltip>
          </Choose.Otherwise>
        </Choose>
      </Pane>
    );
  }
}

export default withRouter(withData(EditableTitle));
