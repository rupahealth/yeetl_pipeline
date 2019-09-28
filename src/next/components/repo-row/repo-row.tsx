import { Component } from "react";
import { autoBind } from "react-extras";
import { Button, Table, Pane, Paragraph } from "evergreen-ui";
import { withRouter, SingletonRouter } from "next/router";

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

  async openInCode(e: MouseEvent) {
    e.stopPropagation();

    const {
      repo: { localPath }
    } = this.props;

    const path = `vscode://file${localPath}`;

    browser.runtime.sendMessage({ subject: "open-path", path });
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

            <Button flexShrink={0} height={24} onClick={this.openInCode}>
              Open in Code
            </Button>
          </Pane>
        </Table.TextCell>
      </Table.Row>
    );
  }
}

export default withRouter(RepoRow);
