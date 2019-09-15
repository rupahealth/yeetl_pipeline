import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { Pane, Button, minorScale } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

import { DataProvider, DataConsumer } from "../components/data-provider";
import { DataConsumerState } from "../components/data-provider/data-consumer-state.interface";
import { EditableTitle } from "../components/editable-title";
import { EditableField } from "../components/editable-field";
import { DeleteRepoButton } from "../components/delete-repo-button";

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
      <DataProvider>
        <DataConsumer>
          {({ findRepo }: DataConsumerState) => {
            const repo = findRepo(id as string);

            if (!repo) {
              return <Fragment />;
            }

            return (
              <Pane
                border={"1px solid red"}
                height={400}
                width={325}
                display={"flex"}
                alignItems={"vertical"}
                flexDirection={"column"}
                paddingLeft={16}
                paddingRight={16}
              >
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
              </Pane>
            );
          }}
        </DataConsumer>
      </DataProvider>
    );
  }
}

export default withRouter(Details);
