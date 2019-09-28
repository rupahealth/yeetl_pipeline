import { autoBind, If } from "react-extras";
import { Component, Fragment } from "react";
import { Dialog, Button, minorScale, TextInputField } from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";

import { navigate } from "../../utils/navigate.util";
import { Repo } from "../../../common/interfaces/repo.interface";
import { withData } from "../../hocs/with-data";

interface CreateRepoButtonProps {
  createRepo(repo: Partial<Repo>): Promise<Repo>;
  router: SingletonRouter;
  value?: string;
  hasIcon?: boolean;
  defaultName?: string;
  showInitially?: boolean;
  justModal?: boolean;
}

interface CreateRepoButtonState {
  showPrompt: boolean;
  name: string;
  localPath: string;
}

const isInvalid = (value: string | null) => {
  if (value === null) {
    return false;
  }

  return value.length === 0;
};

const empty = (value: string | null) => {
  return value === null || value.length === 0;
};

class CreateRepoButton extends Component<
  CreateRepoButtonProps,
  CreateRepoButtonState
> {
  constructor(props: CreateRepoButtonProps) {
    super(props);
    autoBind(this);

    this.state = {
      showPrompt: false,
      name: null,
      localPath: null
    };
  }

  componentDidUpdate({
    showInitially: oldShowInitially
  }: CreateRepoButtonProps) {
    const { showInitially, defaultName } = this.props;

    if (showInitially && showInitially !== oldShowInitially) {
      this.setState({ showPrompt: true, name: defaultName });
    }
  }

  async createRepo() {
    const { createRepo, router } = this.props;
    const { name, localPath } = this.state;

    const { id } = await createRepo({ name, localPath });
    navigate(router, "/details", { id });
  }

  close() {
    this.setState({
      showPrompt: false,
      name: null,
      localPath: null
    });
  }

  render() {
    const {
      value = "New",
      hasIcon = true,
      defaultName = null,
      justModal = false
    } = this.props;
    const { showPrompt, name, localPath } = this.state;
    const isConfirmDisabled = empty(name) || empty(localPath);

    return (
      <Fragment>
        <Dialog
          confirmLabel={"Create"}
          intent={"success"}
          isConfirmDisabled={isConfirmDisabled}
          isShown={showPrompt}
          onCancel={this.close}
          onConfirm={this.createRepo}
          title={"Create Repository"}
          onCloseComplete={this.close}
        >
          <TextInputField
            autoFocus={true}
            isInvalid={isInvalid(name)}
            label={"Name"}
            onChange={(e: any) => this.setState({ name: e.target.value })}
            placeholder={"maxchehab/gh-code"}
            required={true}
            value={name}
            validationMessage={
              isInvalid(name) ? "This field is required" : undefined
            }
          />

          <TextInputField
            isInvalid={isInvalid(localPath)}
            label={"Local path"}
            onChange={(e: any) => this.setState({ localPath: e.target.value })}
            placeholder={"/home/projects/gh-code"}
            required={true}
            value={localPath}
            validationMessage={
              isInvalid(localPath) ? "This field is required" : undefined
            }
          />
        </Dialog>
        <If condition={!justModal}>
          <Button
            appearance={"primary"}
            iconBefore={hasIcon ? "git-repo" : undefined}
            intent={"success"}
            marginLeft={minorScale(3)}
            onClick={() => {
              this.setState({ showPrompt: true, name: defaultName });
            }}
          >
            {value}
          </Button>
        </If>
      </Fragment>
    );
  }
}

export default withRouter(withData(CreateRepoButton));
