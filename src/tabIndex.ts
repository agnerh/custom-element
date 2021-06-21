export function setTabIndex(element: HTMLElement, tabIndex?: number): void {
    if (!element || typeof tabIndex === "undefined" || tabIndex === null) {
        return;
    }

    element.tabIndex = tabIndex;
}