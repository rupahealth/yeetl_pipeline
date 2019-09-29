import { autoBind, If } from "react-extras";
import { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  Heading,
  Icon,
  Label,
  ListItem,
  minorScale,
  Pane,
  Paragraph,
  Strong,
  TextInputField,
  Tooltip,
  UnorderedList
} from "evergreen-ui";
import { SingletonRouter, withRouter } from "next/router";

import { navigate } from "../../utils/navigate.util";
import { withData } from "../../hocs/with-data";
import { DataConsumerState } from "../data-provider/data-consumer-state.interface";

interface CreateRepoButtonProps extends DataConsumerState {
  router: SingletonRouter;
  value?: string;
  hasIcon?: boolean;
  defaultName?: string;
  showInitially?: boolean;
  justModal?: boolean;
}

interface CreateRepoButtonState {
  showPrompt: boolean;
  name: string;
  localPath: string;
}

const empty = (value: string | null) => {
  return value === null || value.length === 0;
};

class CreateRepoButton extends Component<
  CreateRepoButtonProps,
  CreateRepoButtonState
> {
  constructor(props: CreateRepoButtonProps) {
    super(props);
    autoBind(this);

    this.state = {
      showPrompt: false,
      name: null,
      localPath: null
    };
  }

  componentDidUpdate({
    showInitially: oldShowInitially
  }: CreateRepoButtonProps) {
    const { showInitially, defaultName } = this.props;

    if (showInitially && showInitially !== oldShowInitially) {
      this.setState({ showPrompt: true, name: defaultName });
    }
  }

  async createRepo() {
    const { createRepo, router } = this.props;
    const { name, localPath } = this.state;

    const { id } = await createRepo({ name, localPath });
    navigate(router, "/details", { id });
  }

  validation(value: string | null, field: "name" | "path") {
    const { repos } = this.props;

    const repo = Object.entries(repos)
      .map(([_key, repo]) => repo)
      .find(repo => repo.name === value);

    if (empty(value)) {
      return { valid: false, message: "This field is required." };
    }

    switch (field) {
      case "name": {
        if (repo) {
          return {
            valid: false,
            message: "This repository is already configured."
          };
        }

        if (!value.match(/^([^/]+\/[^/]+)$/)) {
          return {
            valid: false,
            message: "This must be a valid repository name."
          };
        }
        break;
      }

      case "path": {
        if (value.match(/^~/)) {
          return {
            valid: false,
            message: "The path must be absolute."
          };
        }

        if (value.match(/^[^\/]/)) {
          return {
            valid: false,
            message: "The path must start with '/'."
          };
        }

        break;
      }
    }

    return { valid: true, message: undefined };
  }

  close() {
    this.setState({
      showPrompt: false,
      name: null,
      localPath: null
    });
  }

  render() {
    const {
      value = "New",
      hasIcon = true,
      defaultName = null,
      justModal = false
    } = this.props;

    const { showPrompt, name, localPath } = this.state;
    const nameValidation = this.validation(name, "name");
    const pathValidation = this.validation(localPath, "path");
    const isConfirmDisabled = !pathValidation.valid || !nameValidation.valid;

    const showDefaultName = Boolean(defaultName) && justModal;
    const title = showDefaultName ? defaultName : "Create Configuration";

    return (
      <Fragment>
        <Dialog
          containerProps={{ style: { border: "1px solid" } }}
          confirmLabel={"Create"}
          intent={"success"}
          isConfirmDisabled={isConfirmDisabled}
          isShown={showPrompt}
          onCancel={this.close}
          onConfirm={this.createRepo}
          title={
            <Heading
              size={600}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {title}
            </Heading>
          }
          onCloseComplete={this.close}
        >
          <If condition={!showDefaultName}>
            <TextInputField
              autoFocus={true}
              isInvalid={!nameValidation.valid}
              label={
                <Pane display={"flex"} alignItems={"center"}>
                  <Label marginRight={minorScale(2)} size={400}>
                    Name
                  </Label>
                  <Tooltip
                    content={
                      <Paragraph margin={minorScale(2)}>
                        <Strong>For example:</Strong>
                        <UnorderedList paddingLeft={minorScale(1)}>
                          <ListItem icon="tick-circle" iconColor="success">
                            zeit/next.js
                          </ListItem>
                          <ListItem icon="tick-circle" iconColor="success">
                            segmentio/evergreen
                          </ListItem>
                          <ListItem icon="cross" iconColor="danger">
                            https://github.com/foo/bar
                          </ListItem>
                          <ListItem icon="cross" iconColor="danger">
                            github.com/foo/bar
                          </ListItem>
                        </UnorderedList>
                      </Paragraph>
                    }
                    appearance="card"
                  >
                    <Icon size={14} icon="info-sign" />
                  </Tooltip>
                </Pane>
              }
              onChange={(e: any) => this.setState({ name: e.target.value })}
              placeholder={"maxchehab/gh-code"}
              value={name}
              validationMessage={nameValidation.message}
            />
          </If>

          <TextInputField
            isInvalid={!pathValidation.valid}
            label={
              <Pane display={"flex"} alignItems={"center"}>
                <Label marginRight={minorScale(2)} size={400}>
                  Absolute path
                </Label>
                <Tooltip
                  content={
                    <Paragraph margin={minorScale(2)}>
                      <Strong>For example:</Strong>
                      <UnorderedList paddingLeft={minorScale(1)}>
                        <ListItem icon="tick-circle" iconColor="success">
                          /users/satoshi/bitcoin
                        </ListItem>
                        <ListItem icon="tick-circle" iconColor="success">
                          /go/src/github.com/golang
                        </ListItem>
                        <ListItem icon="cross" iconColor="danger">
                          ~/projects/foo-bar
                        </ListItem>
                        <ListItem icon="cross" iconColor="danger">
                          foo-bar
                        </ListItem>
                      </UnorderedList>
                    </Paragraph>
                  }
                  appearance="card"
                >
                  <Icon size={14} icon="info-sign" />
                </Tooltip>
              </Pane>
            }
            onChange={(e: any) => this.setState({ localPath: e.target.value })}
            placeholder={"/home/projects/gh-code"}
            value={localPath}
            validationMessage={pathValidation.message}
          />
        </Dialog>
        <If condition={!justModal}>
          <Button
            appearance={"primary"}
            iconBefore={hasIcon ? "git-repo" : undefined}
            intent={"success"}
            marginLeft={minorScale(3)}
            onClick={() => {
              this.setState({ showPrompt: true, name: defaultName });
            }}
          >
            {value}
          </Button>
        </If>
      </Fragment>
    );
  }
}

export default withRouter(withData(CreateRepoButton));
