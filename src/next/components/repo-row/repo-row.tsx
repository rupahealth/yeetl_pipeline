import { Component, Fragment } from "react";
import { autoBind } from "react-extras";
import { Button, Table, Pane } from "evergreen-ui";

import { Repo } from "../../../common/interfaces/repo.interface";
import { GitHubIcon } from "../github-icon";

interface RepoRowProps {
  repo: Repo;
}

export class RepoRow extends Component<RepoRowProps> {
  constructor(props: RepoRowProps) {
    super(props);

    autoBind(this);
  }

  openInCode() {
    const {
      repo: { localPath }
    } = this.props;
    window.location.href = `vscode://file${localPath}`;
  }

  render() {
    const {
      repo: { name }
    } = this.props;

    return (
      <Table.Row key={name} isSelectable onSelect={() => null} intent={name}>
        <Table.TextCell>
          <Pane
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {name}
            <Button height={24} onClick={this.openInCode}>
              Open in Code
            </Button>
          </Pane>
        </Table.TextCell>
      </Table.Row>
    );
  }
}
