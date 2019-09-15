import { autoBind, Choose } from "react-extras";
import { Component } from "react";
import { Pane, Heading, minorScale, Button } from "evergreen-ui";

import { Data } from "../../../common/interfaces/data.interface";
import { RepoRow } from "../repo-row";
import { withData } from "../../hocs/with-data";
import { SearchingIcon } from "../searching-icon";
import { CreateRepoButton } from "../create-repo-button";

interface RepoListProps extends Data {
  search: string;
  loaded: boolean;
  clearSearch: () => void;
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
    const { search, clearSearch, loaded, repos: allRepos } = this.props;
    const filteredRepos = this.filterRepos();
    const repos = filteredRepos.map(repo => <RepoRow repo={repo} />);

    return (
      <Choose>
        <Choose.When condition={repos.length > 0 || !loaded}>
          <Pane flexGrow={1} overflow={"auto"}>
            {repos}
          </Pane>
        </Choose.When>
        <Choose.Otherwise>
          <Pane
            tint={"red"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            justifyContent={"center"}
            padding={16}
            paddingTop={0}
            width={"100%"}
          >
            <SearchingIcon size={75} />
            <Choose>
              <Choose.When condition={Object.entries(allRepos).length > 0}>
                <Heading
                  marginTop={minorScale(3)}
                  textAlign={"center"}
                  size={400}
                >
                  Oh-oh, we couldn't find any repositories with that search.
                </Heading>
                <Pane
                  alignItems={"center"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  marginTop={minorScale(3)}
                >
                  <Button onClick={clearSearch}>Clear search</Button>
                  <CreateRepoButton
                    defaultName={search}
                    value={"Create repository"}
                    hasIcon={false}
                  />
                </Pane>
              </Choose.When>
              <Choose.Otherwise>
                <Heading
                  marginTop={minorScale(3)}
                  textAlign={"center"}
                  size={400}
                >
                  It looks like you don't have any repositories configured.
                </Heading>

                <Pane
                  alignItems={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                  marginTop={minorScale(3)}
                >
                  <CreateRepoButton
                    defaultName={search}
                    value={"Create repository"}
                    hasIcon={false}
                  />
                </Pane>
              </Choose.Otherwise>
            </Choose>
          </Pane>
        </Choose.Otherwise>
      </Choose>
    );
  }
}

export default withData(RepoList);
