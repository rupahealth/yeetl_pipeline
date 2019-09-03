import { Component, Fragment } from "react";
import { autoBind } from "react-extras";

import { DataConsumer } from "../data-provider";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";
import { Input } from "../input";
import { Repo } from "../../../common/interfaces/repo.interface";

interface RepoRowProps {
  id: string;
}

interface UpdateValueOptions {
  id: string;
  repo: Repo;
  target: "name" | "localPath";
  value: string;
  updateRepo(id: string, repo: Repo): void;
}

export class RepoRow extends Component<RepoRowProps> {
  constructor(props: RepoRowProps) {
    super(props);

    autoBind(this);
  }

  updateValue({ id, repo, target, value, updateRepo }: UpdateValueOptions) {
    repo[target] = value;
    updateRepo(id, repo);
  }

  deleteRepo;

  render() {
    const { id } = this.props;

    return (
      <Fragment>
        <DataConsumer>
          {({ repos, updateRepo, deleteRepo }: DataConsumerState) => {
            const repo = repos[id];
            const { localPath, name } = repo;

            return (
              <Fragment>
                <div className={"row"}>
                  <Input
                    label={"Repository name"}
                    value={name}
                    type={"text"}
                    onChange={({ target: { value } }) =>
                      this.updateValue({
                        id,
                        repo,
                        value,
                        updateRepo,
                        target: "name"
                      })
                    }
                  />
                  <Input
                    label={"Local path"}
                    value={localPath}
                    type={"text"}
                    onChange={({ target: { value } }) =>
                      this.updateValue({
                        id,
                        repo,
                        value,
                        updateRepo,
                        target: "localPath"
                      })
                    }
                  />
                  <div className={"delete"} onClick={() => deleteRepo(id)} />
                </div>
              </Fragment>
            );
          }}
        </DataConsumer>

        <style jsx>{`
          .delete:before {
            content: "×";
            cursor: pointer;
            font-size: 24px;
            color: #ff4444;
            font-weight: 300;
          }

          .row {
            display: flex;
            flex-direction: horizontal;
            justify-content: space-around;
          }
        `}</style>
      </Fragment>
    );
  }
}
