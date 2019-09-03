import { Component, Fragment } from "react";

interface ButtonProps {
  children: string;
  onClick(event: any): void;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { children, onClick } = this.props;

    return (
      <Fragment>
        <span className={"button"} onClick={onClick}>
          {children}
        </span>
        <style jsx>{`
          .button {
            background-image: linear-gradient(#202020, #181818);
            border-radius: 3px;
            border: 1px solid #383838;
            color: #d2d2d2;
            cursor: pointer;
            font-size: 12px;
            padding: 3px 10px;
            vertical-align: middle;
          }

          .button:hover{
            linear-gradient(#303030, #282828);
            border-color: #484848;
          }
        `}</style>
      </Fragment>
    );
  }
}
