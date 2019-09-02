import { Component, Fragment } from "react";

interface CardProps {
  children: JSX.Element[] | JSX.Element;
}

export class Card extends Component<CardProps> {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <div className={"card"}>{children}</div>
        <style jsx>{`
          .card {
            background-color: #181818;
            border: 1px solid #404040;
            border-radius: 3px;
            padding: 16px;
          }
        `}</style>
      </Fragment>
    );
  }
}
