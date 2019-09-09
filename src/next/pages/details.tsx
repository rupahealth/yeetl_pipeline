import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

import { DataProvider, DataConsumer } from "../components/data-provider";
import { DataConsumerState } from "../components/data-provider/data-consumer-state.interface";
import { EditableTitle } from "../components/editable-title";
import { EditableField } from "../components/editable-field";

interface DetailsProps {
  router: SingletonRouter;
}
class Details extends Component<DetailsProps> {
  render() {
    const { router } = this.props;
    const { name: repoName } = router.query;

    return (
      <DataProvider>
        <DataConsumer>
          {({ findRepo }: DataConsumerState) => {
            const repo = findRepo(repoName as string);

            if (!repo) {
              return <Fragment />;
            }

            return (
              <Pane
                height={400}
                width={325}
                display={"flex"}
                alignItems={"vertical"}
                flexDirection={"column"}
              >
                <EditableTitle repo={repo} />
                <EditableField
                  repo={repo}
                  hint={"Edit the local path"}
                  field={"localPath"}
                  placeholder={"Repositories local path"}
                />
                <EditableField
                  repo={repo}
                  field={"url"}
                  hint={"Edit the GitHub URL"}
                  placeholder={"Repositories GitHub URL"}
                />
              </Pane>
            );
          }}
        </DataConsumer>
      </DataProvider>
    );
  }
}

export default withRouter(Details);
