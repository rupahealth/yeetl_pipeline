import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { Dialog, Button, minorScale } from "evergreen-ui";

import { navigate } from "../../utils/navigate.util";
import { Repo } from "../../../common/interfaces/repo.interface";
import { SingletonRouter, withRouter } from "next/router";
import { withData } from "../../hocs/with-data";

interface DeleteRepoButtonProps {
  deleteRepo(repo: Repo): void;
  repo: Repo;
  router: SingletonRouter;
}

interface DeleteRepoButtonState {
  showPrompt: boolean;
}

class DeleteRepoButton extends Component<
  DeleteRepoButtonProps,
  DeleteRepoButtonState
> {
  constructor(props: DeleteRepoButtonProps) {
    super(props);
    autoBind(this);

    this.state = {
      showPrompt: false
    };
  }

  deleteRepo() {
    const { deleteRepo, repo, router } = this.props;
    this.setState({ showPrompt: true }, () => {
      deleteRepo(repo);
      navigate(router, "/");
    });
  }

  render() {
    const { showPrompt } = this.state;

    return (
      <Fragment>
        <Dialog
          intent={"danger"}
          isShown={showPrompt}
          title={"Delete Configuration"}
          onCloseComplete={() => this.setState({ showPrompt: false })}
          onConfirm={this.deleteRepo}
          confirmLabel={"Delete"}
        >
          This action cannot be undone. This will permanently delete all
          configurations for this repository.
        </Dialog>

        <Button
          iconBefore="trash"
          intent="danger"
          marginTop={minorScale(3)}
          onClick={() => this.setState({ showPrompt: true })}
        >
          Delete Configuration
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(withData(DeleteRepoButton));
