declare namespace chrome.contextMenus {
  function create(): void;
}

declare namespace browser.contextMenus {
  type ContextType =
    | "all"
    | "audio"
    | "bookmarks"
    | "browser_action"
    | "editable"
    | "frame"
    | "image"
    // | "launcher" unsupported
    | "link"
    | "page"
    | "page_action"
    | "password"
    | "selection"
    | "tab"
    | "tools_menu"
    | "video";

  type ItemType = "normal" | "checkbox" | "radio" | "separator";

  type OnClickData = {
    bookmarkId?: string;
    checked?: boolean;
    editable: boolean;
    frameId?: number;
    frameUrl?: string;
    linkText?: string;
    linkUrl?: string;
    mediaType?: string;
    menuItemId: number | string;
    modifiers: string[];
    pageUrl?: string;
    parentMenuItemId?: number | string;
    selectionText?: string;
    srcUrl?: string;
    targetElementId?: number;
    wasChecked?: boolean;
  };

  const ACTION_MENU_TOP_LEVEL_LIMIT: number;

  function create(
    createProperties: {
      checked?: boolean;
      command?:
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";
      contexts?: ContextType[];
      documentUrlPatterns?: string[];
      enabled?: boolean;
      icons?: object;
      id?: string;
      onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;
      parentId?: number | string;
      targetUrlPatterns?: string[];
      title?: string;
      type?: ItemType;
      visible?: boolean;
    },
    callback?: () => void
  ): number | string;

  function getTargetElement(targetElementId: number): object | null;

  function refresh(): Promise<void>;

  function remove(menuItemId: number | string): Promise<void>;

  function removeAll(): Promise<void>;

  function update(
    id: number | string,
    updateProperties: {
      checked?: boolean;
      command?:
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";
      contexts?: ContextType[];
      documentUrlPatterns?: string[];
      enabled?: boolean;
      onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;
      parentId?: number | string;
      targetUrlPatterns?: string[];
      title?: string;
      type?: ItemType;
      visible?: boolean;
    }
  ): Promise<void>;

  const onClicked: EvListener<
    (info: OnClickData, tab: browser.tabs.Tab) => void
  >;

  const onHidden: EvListener<() => void>;

  const onShown: EvListener<(info: OnClickData, tab: browser.tabs.Tab) => void>;
}
