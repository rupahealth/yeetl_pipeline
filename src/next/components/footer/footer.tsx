import { Component } from "react";
import { Pane, Paragraph, Link } from "evergreen-ui";

export class Footer extends Component {
  render() {
    return (
      <Pane
        flexShrink={0}
        alignSelf={"flex-end"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight={30}
        width={"100%"}
        background={"tint2"}
      >
        <Paragraph fontFamily={"monospace"}>
          {`created by `}
          <Link
            fontFamily={"monospace"}
            textDecoration={"none"}
            color={"neutral"}
            href={"https://github.com/maxchehab/gh-code"}
          >
            maxchehab
          </Link>
        </Paragraph>
      </Pane>
    );
  }
}
