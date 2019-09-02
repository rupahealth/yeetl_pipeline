import { Component, Fragment } from "react";

import { Card } from "../components/card";
import { Header } from "../components/header";
import { Input } from "../components/input";

export default class Index extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className={"title"}>
          <h1>GitHub to Code</h1>
        </div>

        <Card>
          <Input type={"text"} label={"Repository name"} />
          <Input label={"Local path"} type={"file"} multiple />
        </Card>
        <style jsx>{`
          .title {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </Fragment>
    );
  }
}
