import { Component, Fragment } from "react";

import { Card } from "../components/card";
import { Header } from "../components/header";
import { DataProvider } from "../components/data-provider";
import { RepoForm } from "../components/repo-form";

export default class Index extends Component {
  render() {
    return (
      <Fragment>
        <DataProvider>
          <Header />
          <div className={"title"}>
            <h1>GitHub to Code</h1>
          </div>

          <RepoForm />
        </DataProvider>
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
