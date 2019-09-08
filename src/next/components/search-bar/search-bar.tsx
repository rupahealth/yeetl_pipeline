import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { SearchInput } from "evergreen-ui";

interface SearchBarProps {
  onSearch(value: string): void;
}

interface SearchBarState {
  value: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      value: ""
    };

    autoBind(this);
  }

  updateValue(value: string) {
    const { onSearch } = this.props;

    this.setState({ value }, () => onSearch(value));
  }

  render() {
    const { value } = this.state;

    return (
      <Fragment>
        <SearchInput
          className={"auto-complete-search-input"}
          height={40}
          marginBottom={16}
          marginTop={16}
          onChange={(e: any) => this.updateValue(e.target.value)}
          paddingLeft={16}
          paddingRight={16}
          placeholder={"Search your repositories"}
          spellCheck={false}
          value={value}
          width={"100%"}
        />
      </Fragment>
    );
  }
}
