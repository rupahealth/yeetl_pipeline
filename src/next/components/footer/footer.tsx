import { Choose, autoBind, If } from "react-extras";
import { Component } from "react";
import {
  Pane,
  Paragraph,
  minorScale,
  Link,
  Icon,
  Tooltip,
  Position,
  Button,
} from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";

import { navigate } from "../../utils/navigate.util";
import { withData } from "../../hocs/with-data";
import { CreateRepoButton } from "../create-repo-button";

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

  openIssues() {
    browser.tabs.create({
      active: true,
      url: "https://github.com/maxchehab/gh-code/issues/new?assignees=maxchehab&labels=bug&template=bug_report.md&title=",
    });

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
        minHeight={50}
        width={"100%"}
        borderTop={"1px solid #EDF0F2"}
      >
        {/* <Choose>
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
              justifyContent={"space-between"}
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
                    <Tooltip content="Settings" position={Position.RIGHT}>
                      <Icon size={14} icon="settings" color={"#425A70"} />
                    </Tooltip>
                  </Pane>
                </button>
              </If>
              <If condition={inSettings}>
                <button onClick={this.openIssues} style={{ all: "unset" }}>
                  <Pane
                    cursor={"pointer"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Icon icon={"issue-new"} color={"#425A70"} size={14} />
                    <Link
                      marginLeft={minorScale(2)}
                      textDecoration={"none"}
                      color={"neutral"}
                      fontFamily={"monospace"}
                      size={300}
                    >
                      report an issue
                    </Link>
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
        </Choose> */}
        <Button
          appearance={"primary"}
          onClick={() => router.push("/pipeline/new")}
          style={{
            width: "100%",
            height: "100%",
            "text-align": "center",
            display: "block",
            "font-size": "16px",
          }}
        >
          Create New Pipeline
        </Button>
      </Pane>
    );
  }
}

export default withRouter(withData(Footer));
