import { Component, Fragment } from "react";

interface InputProps {
  label: string;
  type: string;
  multiple?: boolean;
}

export class Input extends Component<InputProps> {
  render() {
    const { label, type, multiple = false } = this.props;

    return (
      <Fragment>
        <div className={"input"}>
          <div className={"label"}>{label}</div>
          <input type={type} multiple={multiple} />
        </div>
        <style jsx>{`
          .input {
            margin: 3px;
          }

          input {
            background-color: #181818;
            border: 1px solid #404040;
            width: 250px;
            min-height: 34px;
            font-size 14px;
            color: #bebebe;
            padding-bottom: 6px;
            padding-left: 8px;
            padding-right: 30px;
            padding-top: 6px;
            border-radius: 3px;
          }
          .label {
            font-size: 14px;
            color: #bebebe;
            margin-bottom: 6px;
          }
        `}</style>
      </Fragment>
    );
  }
}
