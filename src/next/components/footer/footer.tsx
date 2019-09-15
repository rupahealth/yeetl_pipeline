import { Choose } from "react-extras";
import { Component } from "react";
import { Pane, Paragraph, Link } from "evergreen-ui";

import { withData } from "../../hocs/with-data";

interface FooterProps {
  footer?: string;
}

class Footer extends Component<FooterProps> {
  render() {
    const { footer } = this.props;

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
        <Paragraph size={200} fontFamily={"monospace"}>
          <Choose>
            <Choose.When condition={Boolean(footer)}>{footer}</Choose.When>
            <Choose.Otherwise>
              {`created by `}
              <Link
                fontFamily={"monospace"}
                textDecoration={"none"}
                color={"neutral"}
                href={"https://github.com/maxchehab/gh-code"}
              >
                maxchehab
              </Link>
            </Choose.Otherwise>
          </Choose>
        </Paragraph>
      </Pane>
    );
  }
}

export default withData(Footer);
