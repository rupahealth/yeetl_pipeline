import { Component } from "react";
import { Pane } from "evergreen-ui";

class Header extends Component {
  render() {
    return (
      <Pane
        alignItems={"center"}
        alignSelf={"flex-end"}
        background={"#0075CD"}
        color={"#ffffff"}
        display={"flex"}
        flexShrink={0}
        justifyContent={"center"}
        minHeight={50}
        width={"100%"}
        borderBottom={"1px solid #EDF0F2"}
        fontWeight={"bold"}
        fontSize={"18px"}
      >
        Yeetl Pipeline
      </Pane>
    );
  }
}

export default Header;
