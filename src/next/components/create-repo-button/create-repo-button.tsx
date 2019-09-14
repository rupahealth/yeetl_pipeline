import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { Dialog, Button, minorScale, TextInputField } from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";

import { Repo } from "../../../common/interfaces/repo.interface";
import { withData } from "../../hocs/with-data";

interface CreateRepoButtonProps {
  createRepo(repo: Partial<Repo>): Promise<Repo>;
  router: SingletonRouter;
}

interface CreateRepoButtonState {
  showPrompt: boolean;
  name: string;
  url: string;
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
      url: null,
      localPath: null
    };
  }

  async createRepo() {
    const { createRepo, router } = this.props;
    const { name, url, localPath } = this.state;

    const { id } = await createRepo({ name, url, localPath });
    router.push(`/details?id=${id}`);
  }

  render() {
    const { showPrompt, name, localPath, url } = this.state;
    const isConfirmDisabled = empty(name) || empty(localPath) || empty(url);

    return (
      <Fragment>
        <Dialog
          confirmLabel={"Create"}
          intent={"success"}
          isConfirmDisabled={isConfirmDisabled}
          isShown={showPrompt}
          onCloseComplete={() => this.setState({ showPrompt: false })}
          onConfirm={this.createRepo}
          title={"Create Repository"}
        >
          <TextInputField
            isInvalid={isInvalid(name)}
            onChange={(e: any) => this.setState({ name: e.target.value })}
            placeholder={"Repository's name"}
            value={name}
            validationMessage={
              isInvalid(name) ? "This field is required" : undefined
            }
          />

          <TextInputField
            isInvalid={isInvalid(localPath)}
            onChange={(e: any) => this.setState({ localPath: e.target.value })}
            placeholder={"Repository's local path"}
            value={localPath}
            validationMessage={
              isInvalid(localPath) ? "This field is required" : undefined
            }
          />

          <TextInputField
            isInvalid={isInvalid(url)}
            onChange={(e: any) => this.setState({ url: e.target.value })}
            placeholder={"Repository's GitHub URL"}
            value={url}
            validationMessage={
              isInvalid(url) ? "This field is required" : undefined
            }
          />
        </Dialog>

        <Button
          appearance={"primary"}
          iconBefore={"git-repo"}
          intent={"success"}
          marginLeft={minorScale(3)}
          onClick={() => {
            this.setState({ showPrompt: true });
          }}
        >
          New
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(withData(CreateRepoButton));
