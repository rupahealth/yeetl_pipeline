import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";
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
                <EditableField
                  repo={repo}
                  hint={"Edit the local path"}
                  field={"localPath"}
                  label={"Local Path:"}
                  placeholder={"Repository's local path"}
                />
                <EditableField
                  repo={repo}
                  field={"url"}
                  label={"GitHub URL:"}
                  hint={"Edit the GitHub URL"}
                  placeholder={"Repository's GitHub URL"}
                />

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
