import { Choose, autoBind, If } from "react-extras";
import { Component } from "react";
import { Pane, Paragraph, minorScale, Link, Icon, Tooltip } from "evergreen-ui";
import { SingletonRouter, withRouter, Router } from "next/router";

import { navigate } from "../../utils/navigate.util";
import { withData } from "../../hocs/with-data";

interface FooterProps {
  footer?: string;
  router: SingletonRouter;
}

class Footer extends Component<FooterProps> {
  constructor(props: FooterProps) {
    super(props);
    autoBind(this);
  }

  openTwitter() {
    browser.tabs.create({ active: true, url: "https://twitter.com/maxchehab" });
    window.close();
  }

  openSettings() {
    const { router } = this.props;

    navigate(router, "/settings");
  }

  render() {
    const { footer, router } = this.props;
    const inSettings = router.pathname === "/settings";

    return (
      <Pane
        alignItems={"center"}
        alignSelf={"flex-end"}
        background={"tint2"}
        display={"flex"}
        flexShrink={0}
        justifyContent={"center"}
        minHeight={30}
        width={"100%"}
      >
        <Choose>
          <Choose.When condition={Boolean(footer)}>
            <Paragraph
              display={"flex"}
              fontFamily={"monospace"}
              justifyContent={"center"}
              size={300}
              width={"100%"}
            >
              {footer}
            </Paragraph>
          </Choose.When>
          <Choose.Otherwise>
            <Pane
              alignItems={"center"}
              display={"flex"}
              justifyContent={inSettings ? "flex-end" : "space-between"}
              paddingLeft={minorScale(3)}
              paddingRight={minorScale(3)}
              width={"100%"}
            >
              <If condition={!inSettings}>
                <button onClick={this.openSettings} style={{ all: "unset" }}>
                  <Pane
                    cursor={"pointer"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Tooltip content="Settings">
                      <Icon size={14} icon="settings" color={"#425A70"} />
                    </Tooltip>
                  </Pane>
                </button>
              </If>
              <button style={{ all: "unset" }} onClick={this.openTwitter}>
                <Pane
                  cursor={"pointer"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Link
                    textDecoration={"none"}
                    color={"neutral"}
                    fontFamily={"monospace"}
                    size={300}
                  >
                    made by max
                  </Link>
                </Pane>
              </button>
            </Pane>
          </Choose.Otherwise>
        </Choose>
      </Pane>
    );
  }
}

export default withRouter(withData(Footer));
