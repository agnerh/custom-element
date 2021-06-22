export function setAriaAttributes(element: HTMLElement, attributes: Array<[string, string]>): void {
    if (!element || !element.setAttribute || !attributes) {
        return;
    }
    
    for (const attributeKeyValuePair of attributes) {
        const [attribute, value] = attributeKeyValuePair;

        element.setAttribute(attribute, value);
    }
}