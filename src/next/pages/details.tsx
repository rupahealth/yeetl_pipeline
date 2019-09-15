import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { Button, minorScale, Pane } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

import { DataConsumer } from "../components/data-provider";
import { DataConsumerState } from "../components/data-provider/data-consumer-state.interface";
import { DeleteRepoButton } from "../components/delete-repo-button";
import { EditableField } from "../components/editable-field";
import { EditableTitle } from "../components/editable-title";
import { Popup } from "../components/popup";

interface DetailsProps {
  router: SingletonRouter;
}
class Details extends Component<DetailsProps> {
  constructor(props: DetailsProps) {
    super(props);

    autoBind(this);
  }

  openInCode(path: string) {
    window.location.href = `vscode://file${path}`;
  }
  render() {
    const { router } = this.props;
    const { id } = router.query;

    return (
      <Popup paddingLeft={16} paddingRight={16}>
        <DataConsumer>
          {({ findRepo }: DataConsumerState) => {
            const repo = findRepo(id as string);

            if (!repo) {
              return <Fragment />;
            }

            return (
              <Fragment>
                <EditableTitle repo={repo} />
                <EditableField repo={repo} />

                <Button
                  autoFocus={true}
                  iconBefore={"share"}
                  marginTop={minorScale(3)}
                  onClick={() => this.openInCode(repo.localPath)}
                >
                  Open in Code
                </Button>
                <DeleteRepoButton repo={repo} />
              </Fragment>
            );
          }}
        </DataConsumer>
      </Popup>
    );
  }
}

export default withRouter(Details);
