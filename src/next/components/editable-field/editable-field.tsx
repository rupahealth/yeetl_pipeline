import { autoBind, Choose } from "react-extras";
import { Component, createRef, RefObject } from "react";
import { withRouter, SingletonRouter } from "next/router";
import {
  IconButton,
  minorScale,
  Pane,
  TextInput,
  Tooltip,
  Text
} from "evergreen-ui";
import ClickOutHandler from "react-onclickout";

import { withData } from "../../hocs/with-data";
import { Repo } from "../../../common/interfaces/repo.interface";
import { Data } from "../data-provider/data.interface";

interface EditableTitleProps extends Data {
  field: "localPath" | "url";
  size: number;
  repo: Repo;
  hint: string;
  placeholder: string;
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

  updateName(value: string) {
    const { repo, updateRepo, field } = this.props;

    repo[field] = value;
    updateRepo(repo.name, repo);
  }

  navigateHome() {
    const { router } = this.props;

    router.push("/");
  }

  focus() {
    this.input.focus && this.input.focus();
  }

  render() {
    const { editing } = this.state;
    const { repo, placeholder, hint, field } = this.props;
    const value = repo[field];

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
                onChange={(e: any) => this.updateName(e.target.value)}
                placeholder={placeholder}
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
              <Text cursor={"pointer"}>{value}</Text>
            </div>
            <Tooltip content={hint}>
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
