import { autoBind } from "react-extras";
import { Component, Fragment } from "react";
import { SearchInput, Pane, Button, minorScale } from "evergreen-ui";

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

  componentDidMount() {
    this.input.focus && this.input.focus();
  }

  input: HTMLInputElement;

  updateValue(value: string) {
    const { onSearch } = this.props;

    this.setState({ value }, () => onSearch(value));
  }

  render() {
    const { value } = this.state;

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
            innerRef={(ref: HTMLInputElement) => {
              this.input = ref;
            }}
            height={32}
            onChange={(e: any) => this.updateValue(e.target.value)}
            placeholder={"Search repositories"}
            spellCheck={false}
            value={value}
            width={"100%"}
          />

          <Button
            appearance={"primary"}
            intent={"success"}
            iconBefore={"git-repo"}
            marginLeft={minorScale(3)}
          >
            New
          </Button>
        </Pane>
      </Fragment>
    );
  }
}
