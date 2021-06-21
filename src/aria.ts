export function setAriaAttributes(element: HTMLElement, attributes: Array<[string, string]>): void {
    if (!element || !element.setAttribute) {
        return;
    }
    
    for (const attributeKeyValuePair in attributes) {
        const [attribute, value] = attributeKeyValuePair;

        element.setAttribute(attribute, value);
    }
}