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

interface FooterProps {}

class Footer extends Component<FooterProps> {
  constructor(props: FooterProps) {
    super(props);
    autoBind(this);
  }

  render() {
    return <></>;
    // const { footer } = this.props;
    // const inSettings = router.pathname === "/settings";

    // console.log(router.pathname);

    // return (
    //   <Pane
    //     alignItems={"center"}
    //     alignSelf={"flex-end"}
    //     background={"tint2"}
    //     display={"flex"}
    //     flexShrink={0}
    //     justifyContent={"center"}
    //     height={50}
    //     width={"100%"}
    //     borderTop={"1px solid #EDF0F2"}
    //   >
    //     {/* <Button
    //       appearance={"primary"}
    //       onClick={() => router.push("/pipeline/new")}
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         "text-align": "center",
    //         display: "block",
    //         "font-size": "16px",
    //       }}
    //     >
    //       Create New Pipeline
    //     </Button> */}
    //     <Button
    //       appearance={"primary"}
    //       onClick={() => navigate(router, "/editor")}
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         "text-align": "center",
    //         display: "block",
    //         "font-size": "16px",
    //       }}
    //     >
    //       Pipeline Editor
    //     </Button>
    //   </Pane>
    // );
  }
}

export default withRouter(withData(Footer));
