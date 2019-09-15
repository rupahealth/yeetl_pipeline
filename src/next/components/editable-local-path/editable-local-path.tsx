import { autoBind, Choose, If } from "react-extras";
import { Component, FormEvent } from "react";
import { withRouter, SingletonRouter } from "next/router";
import {
  IconButton,
  minorScale,
  Pane,
  Text,
  Heading,
  TextInput,
  Tooltip
} from "evergreen-ui";
import ClickOutHandler from "react-onclickout";

import { withData } from "../../hocs/with-data";
import { Repo } from "../../../common/interfaces/repo.interface";
import { Data } from "../../../common/interfaces/data.interface";

interface EditableLocalPathProps extends Data {
  repo: Repo;
  router: SingletonRouter;
  size: number;
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

    router.push("/");
  }

  focus() {
    this.input.focus && this.input.focus();
  }

  onSubmit(e: FormEvent) {
    e.stopPropagation();

    this.props.updateFooter(undefined);
    this.setState({ editing: false });
  }

  render() {
    const { editing } = this.state;
    const { repo, updateFooter } = this.props;
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
              <IconButton
                height={24}
                onClick={() =>
                  this.setState({ editing: true }, () => {
                    updateFooter(footerMessage);
                    this.focus();
                  })
                }
                icon="edit"
              />
            </Tooltip>
          </If>
        </Pane>
        <Pane marginTop={minorScale(1)}>
          <Choose>
            <Choose.When condition={editing}>
              <ClickOutHandler
                onClickOut={() =>
                  this.setState({ editing: false }, () =>
                    updateFooter(undefined)
                  )
                }
              >
                <form onSubmit={this.onSubmit}>
                  <TextInput
                    innerRef={(ref: HTMLInputElement) => {
                      this.input = ref;
                    }}
                    height={32}
                    onChange={(e: any) => this.updateName(e.target.value)}
                    placeholder={"/home/projects/electron"}
                    spellCheck={false}
                    value={value}
                    flex={1}
                  />
                </form>
              </ClickOutHandler>
            </Choose.When>
            <Choose.Otherwise>
              <div
                onClick={() =>
                  this.setState({ editing: true }, () => {
                    updateFooter(footerMessage);
                    this.focus();
                  })
                }
              >
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
