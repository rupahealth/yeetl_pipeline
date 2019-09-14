import { autoBind, Choose, If } from "react-extras";
import { Component } from "react";
import { withRouter, SingletonRouter } from "next/router";
import {
  IconButton,
  minorScale,
  Pane,
  Text,
  TextInput,
  Tooltip
} from "evergreen-ui";
import ClickOutHandler from "react-onclickout";

import { withData } from "../../hocs/with-data";
import { Repo } from "../../../common/interfaces/repo.interface";
import { Data } from "../data-provider/data.interface";

interface EditableTitleProps extends Data {
  field: "localPath" | "url";
  hint: string;
  label: string;
  placeholder: string;
  repo: Repo;
  router: SingletonRouter;
  size: number;
  updateRepo(repo: Repo): void;
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
    updateRepo(repo);
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
    const { repo, placeholder, hint, field, label } = this.props;
    const value = repo[field];

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
          <Text color="muted">{label}</Text>
          <If condition={!editing}>
            <Tooltip content={hint}>
              <IconButton
                height={24}
                onClick={() =>
                  this.setState({ editing: true }, () => this.focus())
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
            </Choose.Otherwise>
          </Choose>
        </Pane>
      </Pane>
    );
  }
}

export default withRouter(withData(EditableTitle));
