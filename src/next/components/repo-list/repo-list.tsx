import { autoBind } from "react-extras";
import { Component } from "react";
import { Pane } from "evergreen-ui";

import { Data } from "../data-provider/data.interface";
import { RepoRow } from "../repo-row";
import { withData } from "../../hocs/with-data";

interface RepoListProps extends Data {
  search: string;
}

class RepoList extends Component<RepoListProps> {
  constructor(props: RepoListProps) {
    super(props);

    autoBind(this);
  }

  filterRepos() {
    const { repos, search } = this.props;

    return Object.entries(repos)
      .map(([_key, repo]) => repo)
      .filter(({ name }) => name.includes(search));
  }

  render() {
    const filteredRepos = this.filterRepos();
    const repos = filteredRepos.map(repo => <RepoRow repo={repo} />);

    return (
      <Pane width={"100%"} height={"100%"}>
        {repos}
      </Pane>
    );
  }
}

export default withData(RepoList);
