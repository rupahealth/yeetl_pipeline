import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { Dialog, Button, minorScale } from "evergreen-ui";

import { withData } from "../../hocs/with-data";
import { SingletonRouter, withRouter } from "next/router";

interface DeleteLocalStorageButtonProps {
  resetStorage(): Promise<void>;
  router: SingletonRouter;
  closeSettings(): void;
}

interface DeleteLocalStorageButtonState {
  showPrompt: boolean;
}

class DeleteLocalStorageButton extends Component<
  DeleteLocalStorageButtonProps,
  DeleteLocalStorageButtonState
> {
  constructor(props: DeleteLocalStorageButtonProps) {
    super(props);
    autoBind(this);

    this.state = {
      showPrompt: false
    };
  }

  async delete() {
    const { resetStorage, closeSettings } = this.props;

    await resetStorage();

    this.setState({ showPrompt: false }, () => closeSettings());
  }

  render() {
    const { showPrompt } = this.state;

    return (
      <Fragment>
        <Dialog
          intent={"danger"}
          isShown={showPrompt}
          title={"Delete Local Storage"}
          onCloseComplete={() => this.setState({ showPrompt: false })}
          onConfirm={this.delete}
          confirmLabel={"Delete"}
        >
          This action cannot be undone. This will permanently delete all saved
          data and reset the extension.
        </Dialog>

        <Button
          iconBefore="trash"
          intent="danger"
          marginTop={minorScale(3)}
          onClick={() => this.setState({ showPrompt: true })}
        >
          Delete local storage
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(withData(DeleteLocalStorageButton));
