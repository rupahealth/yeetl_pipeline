import { autoBind, Choose } from "react-extras";
import { Component } from "react";
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

import { withData } from "../../hocs/with-data";
import { Repo } from "../../../common/interfaces/repo.interface";
import { Data } from "../data-provider/data.interface";

interface EditableTitleProps extends Data {
  repo: Repo;
  router: SingletonRouter;
  updateRepo(id: string, repo: Repo): void;
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
    this.input.focus && this.input.focus();
  }

  updateName(value: string) {
    const { repo, updateRepo } = this.props;

    repo.name = value;
    updateRepo(repo.name, repo);
  }

  navigateHome() {
    const { router } = this.props;

    router.push("/");
  }

  render() {
    const { editing } = this.state;
    const { repo } = this.props;
    const value = repo.name;

    return (
      <Pane
        marginBottom={16}
        marginTop={16}
        paddingLeft={16}
        paddingRight={16}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Tooltip content="Back to Repositories">
          <IconButton onClick={this.navigateHome} icon="arrow-left" />
        </Tooltip>
        <Choose>
          <Choose.When condition={editing}>
            <ClickOutHandler
              onClickOut={() => this.setState({ editing: false })}
            >
              <TextInput
                innerRef={(ref: HTMLInputElement) => {
                  this.input = ref;
                }}
                height={32}
                marginLeft={minorScale(3)}
                onChange={(e: any) => this.updateName(e.target.value)}
                placeholder={"Repository's name"}
                spellCheck={false}
                value={value}
                flex={1}
              />
            </ClickOutHandler>
          </Choose.When>
          <Choose.Otherwise>
            <div
              onClick={() =>
                this.setState({ editing: true }, () => this.focus())
              }
            >
              <Heading
                cursor={"pointer"}
                textDecoration={"underline"}
                size={600}
              >
                {value}
              </Heading>
            </div>
            <Tooltip content="Edit name">
              <IconButton
                onClick={() =>
                  this.setState({ editing: true }, () => this.focus())
                }
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
