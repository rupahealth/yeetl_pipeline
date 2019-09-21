import { Component } from "react";
import { autoBind } from "react-extras";
import { Button, Table, Pane, Paragraph, minorScale } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

import { isFirefox } from "../../../common/utils/is-firefox.util";
import { Repo } from "../../../common/interfaces/repo.interface";

interface RepoRowProps {
  repo: Repo;
  router: SingletonRouter;
}

class RepoRow extends Component<RepoRowProps> {
  constructor(props: RepoRowProps) {
    super(props);

    autoBind(this);
  }

  async openInCode() {
    const {
      repo: { localPath }
    } = this.props;

    const path = `vscode://file${localPath}`;

    if (isFirefox()) {
      window.location.href = path;
    } else {
      const newTab = await browser.tabs.create({ url: path });
      setTimeout(() => browser.tabs.remove(newTab.id), 5000);
    }
  }

  editRepo() {
    const { router, repo } = this.props;
    const { from } = router.query;

    router.push(`/details?id=${repo.id}&from=${from}`);
  }

  render() {
    const {
      repo: { name }
    } = this.props;

    return (
      <Table.Row key={name} isSelectable onSelect={this.editRepo} intent={name}>
        <Table.TextCell>
          <Pane
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Paragraph
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              flexGrow={1}
              size={300}
            >
              {name}
            </Paragraph>
            <Button
              flexShrink={0}
              height={24}
              marginLeft={minorScale(3)}
              onClick={this.openInCode}
            >
              Open in Code
            </Button>
          </Pane>
        </Table.TextCell>
      </Table.Row>
    );
  }
}

export default withRouter(RepoRow);
