import { autoBind, Choose, If } from "react-extras";
import { Component, FormEvent } from "react";
import {
  IconButton,
  minorScale,
  Pane,
  Text,
  Heading,
  TextInput,
  Tooltip
} from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";
import ClickOutHandler from "react-onclickout";

import { Data } from "../../../common/interfaces/data.interface";
import { navigate } from "../../utils/navigate.util";
import { Repo } from "../../../common/interfaces/repo.interface";
import { withData } from "../../hocs/with-data";

interface EditableLocalPathProps extends Data {
  repo: Repo;
  size: number;
  router: SingletonRouter;
  updateRepo(repo: Repo): void;
  updateFooter(footer: string): void;
}

interface EditableLocalPathState {
  editing: boolean;
}

const footerMessage = "press ⏎ to submit value";

class EditableLocalPath extends Component<
  EditableLocalPathProps,
  EditableLocalPathState
> {
  constructor(props: EditableLocalPathProps) {
    super(props);
    autoBind(this);

    this.state = {
      editing: false
    };
  }

  input: HTMLInputElement;

  updateName(value: string) {
    const { repo, updateRepo } = this.props;

    repo.localPath = value;
    updateRepo(repo);
  }

  navigateHome() {
    const { router } = this.props;
    navigate(router, "/");
  }

  focus() {
    const { updateFooter } = this.props;

    this.setState({ editing: true }, () => {
      setTimeout(() => updateFooter(footerMessage), 10);
    });

    this.input.focus && this.input.focus();
  }

  onSubmit(e: FormEvent) {
    e.stopPropagation();

    this.props.updateFooter(undefined);
    this.setState({ editing: false });
  }

  render() {
    const { editing } = this.state;
    const { repo } = this.props;
    const value = repo.localPath;

    return (
      <Pane
        borderBottom={"1px solid #EDF0F2"}
        marginTop={8}
        paddingBottom={8}
        width={"100%"}
      >
        <Pane
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading size={300}>{"Local Path:"}</Heading>
          <If condition={!editing}>
            <Tooltip content={"Edit the local path"}>
              <IconButton height={24} onClick={this.focus} icon="edit" />
            </Tooltip>
          </If>
        </Pane>
        <Pane marginTop={minorScale(1)}>
          <Choose>
            <Choose.When condition={editing}>
              <ClickOutHandler onClickOut={this.onSubmit}>
                <form onSubmit={this.onSubmit}>
                  <TextInput
                    innerRef={(ref: HTMLInputElement) => {
                      this.input = ref;
                    }}
                    height={32}
                    onChange={(e: any) => this.updateName(e.target.value)}
                    placeholder={"/home/projects/gh-code"}
                    spellCheck={false}
                    value={value}
                    flex={1}
                  />
                </form>
              </ClickOutHandler>
            </Choose.When>
            <Choose.Otherwise>
              <div onClick={this.focus}>
                <Text cursor={"pointer"}>{value}</Text>
              </div>
            </Choose.Otherwise>
          </Choose>
        </Pane>
      </Pane>
    );
  }
}

export default withRouter(withData(EditableLocalPath));
