import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";

import { DataProvider } from "../data-provider";
import { Footer } from "../footer";

interface PopupProps {
  children: JSX.Element | JSX.Element[];
  [key: string]: any;
}

export class Popup extends Component<PopupProps> {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <DataProvider>
          <Pane
            height={400}
            width={325}
            display={"flex"}
            alignItems={"vertical"}
            flexFlow={"column"}
          >
            <Pane
              {...this.props}
              flexGrow={1}
              display={"flex"}
              alignItems={"vertical"}
              flexFlow={"column"}
              minHeight={0}
            >
              {children}
            </Pane>
            <Footer />
          </Pane>
        </DataProvider>
      </Fragment>
    );
  }
}
