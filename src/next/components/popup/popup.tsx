import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";
import Head from "next/head";

import { DataProvider } from "../data-provider";
import { Footer } from "../footer";
import { Header } from "../header";

interface PopupProps {
  children: JSX.Element | JSX.Element[];
  [key: string]: any;
}

export class Popup extends Component<PopupProps> {
  componentDidMount() {
    const fromTab = window.location.href.match(/from=tab/);

    if (!fromTab) {
      browser.runtime.sendMessage({
        subject: "close-popup from " + window.location.href,
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Head>
          <script
            type={"application/javascript"}
            src={"/common/utils/polyfill.util.js"}
          ></script>
          <style>{`
            body {
              margin: 0px;
            }
          `}</style>
        </Head>
        <DataProvider>
          <Pane
            height={400}
            width={500}
            overflowX={"hidden"}
            display={"flex"}
            alignItems={"vertical"}
            flexFlow={"column"}
          >
            <Header />
            <Pane
              {...this.props}
              flexGrow={1}
              display={"flex"}
              alignItems={"vertical"}
              flexFlow={"column"}
              height={400}
              overflowY={"scroll"}
            >
              {children}
            </Pane>
          </Pane>
        </DataProvider>
      </Fragment>
    );
  }
}
