import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { SearchInput, Pane } from "evergreen-ui";
import { CreateRepoButton } from "../create-repo-button";

interface SearchBarProps {
  onSearch(value: string): void;
  innerRef(ref: HTMLInputElement): void;
  value: string;
}

export class SearchBar extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);

    autoBind(this);
  }

  render() {
    const { value, onSearch, innerRef } = this.props;

    return (
      <Fragment>
        <Pane
          marginBottom={16}
          marginTop={16}
          paddingLeft={16}
          paddingRight={16}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <SearchInput
            autoFocus={true}
            innerRef={innerRef}
            height={32}
            onChange={(e: any) => onSearch(e.target.value)}
            placeholder={"Search repositories"}
            spellCheck={false}
            value={value}
            width={"100%"}
          />

          <CreateRepoButton />
        </Pane>
      </Fragment>
    );
  }
}
