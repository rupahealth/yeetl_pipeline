import { autoBind, If } from "react-extras";
import { Component, Fragment } from "react";
import { Dialog, Button, minorScale, TextInputField } from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";

import { navigate } from "../../utils/navigate.util";
import { withData } from "../../hocs/with-data";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";

interface CreateRepoButtonProps extends DataConsumerState {
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

  validation(value: string | null, field: "name" | "path") {
    const { repos } = this.props;

    const repo = Object.entries(repos)
      .map(([_key, repo]) => repo)
      .find(repo => repo.name === value);

    if (empty(value)) {
      return { valid: false, message: "This field is required." };
    }

    switch (field) {
      case "name": {
        if (repo) {
          return {
            valid: false,
            message: "This repository is already configured."
          };
        }
        break;
      }

      case "path": {
        if (value.match(/^~/)) {
          return {
            valid: false,
            message: "The path must be absolute."
          };
        }

        if (value.match(/^[^\/]/)) {
          return {
            valid: false,
            message: "The path must start with '/'."
          };
        }

        break;
      }
    }

    return { valid: true, message: undefined };
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
    const nameValidation = this.validation(name, "name");
    const pathValidation = this.validation(localPath, "path");
    const isConfirmDisabled = !pathValidation.valid || !nameValidation.valid;

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
            isInvalid={!nameValidation.valid}
            label={"Name"}
            onChange={(e: any) => this.setState({ name: e.target.value })}
            placeholder={"maxchehab/gh-code"}
            required={true}
            value={name}
            validationMessage={nameValidation.message}
          />

          <TextInputField
            isInvalid={!pathValidation.valid}
            label={"Absolute path"}
            onChange={(e: any) => this.setState({ localPath: e.target.value })}
            placeholder={"/home/projects/gh-code"}
            required={true}
            value={localPath}
            validationMessage={pathValidation.message}
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
