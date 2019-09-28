import { Choose } from "react-extras";
import { Component } from "react";
import { Pane, Paragraph, minorScale, Icon, Link } from "evergreen-ui";

import { withData } from "../../hocs/with-data";
import { TwitterIcon } from "../twitter-icon";

interface FooterProps {
  footer?: string;
}

class Footer extends Component<FooterProps> {
  openSettings() {
    alert("settings");
  }

  openTwitter() {
    browser.tabs.create({ active: true, url: "https://twitter.com/maxchehab" });
    window.close();
  }

  render() {
    const { footer } = this.props;

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
              justifyContent={"space-between"}
              paddingLeft={minorScale(3)}
              paddingRight={minorScale(3)}
              width={"100%"}
            >
              <button onClick={this.openSettings} style={{ all: "unset" }}>
                <Pane
                  cursor={"pointer"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Icon size={14} icon="settings" color={"#425A70"} />
                </Pane>
              </button>
              <button style={{ all: "unset" }} onClick={this.openTwitter}>
                <Pane
                  cursor={"pointer"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Paragraph
                    marginRight={minorScale(1)}
                    width={"100%"}
                    size={300}
                  >
                    {`created by`}
                  </Paragraph>
                  <Link color={"neutral"} fontFamily={"monospace"} size={300}>
                    {`mc`}
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

export default withData(Footer);
