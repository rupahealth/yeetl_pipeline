import { Component, Fragment } from "react";

import { Button } from "../button";
import { Card } from "../card";
import { DataConsumer } from "../data-provider";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";
import { Input } from "../input";
import { Repo } from "../../../common/interfaces/repo.interface";
import { RepoRow } from "../repo-row";
import { autoBind } from "react-extras";

interface RepoFormState {
  newRepo: Repo;
}

interface UpdateValueOptions {
  target: "name" | "localPath";
  value: string;
}

export class RepoForm extends Component<any, RepoFormState> {
  constructor(props: any) {
    super(props);

    autoBind(this);

    this.state = {
      newRepo: { name: "", localPath: "", url: "" }
    };
  }

  updateValue({ target, value }: UpdateValueOptions) {
    const newRepo = Object.assign(this.state.newRepo, {});
    newRepo[target] = value;

    this.setState({ newRepo });
  }

  createRepo(createRepo: any) {
    const { newRepo } = this.state;
    createRepo(newRepo);

    this.setState({ newRepo: { name: "", localPath: "", url: "" } });
  }

  render() {
    const { newRepo } = this.state;

    return (
      <Card>
        <DataConsumer>
          {({ repos, createRepo }: DataConsumerState) => {
            const rows = [];

            for (const key in repos) {
              rows.push(<RepoRow key={key} id={key} />);
            }

            return (
              <Fragment>
                {rows}
                <div className={"row"}>
                  <Input
                    label={"Repository name"}
                    value={newRepo.name}
                    type={"text"}
                    onChange={({ target: { value } }) =>
                      this.updateValue({ target: "name", value })
                    }
                  />
                  <Input
                    label={"Local path"}
                    value={newRepo.localPath}
                    type={"text"}
                    onChange={({ target: { value } }) =>
                      this.updateValue({ target: "localPath", value })
                    }
                  />
                  <div className={"delete"} />
                </div>

                <Button onClick={() => this.createRepo(createRepo)}>
                  Create
                </Button>
              </Fragment>
            );
          }}
        </DataConsumer>
        <style jsx>{`
          .delete:before {
            content: "×";
            font-size: 24px;
            color: transparent;
            font-weight: 300;
          }
          .row {
            display: flex;
            flex-direction: horizontal;
            justify-content: space-around;
          }
        `}</style>
      </Card>
    );
  }
}
