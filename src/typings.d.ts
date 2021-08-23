declare type CustomPropertyValues = {
    [property: string]: string;
};

declare global {
    interface Window {
        ShadyCSS: {
            prepareTemplate(template: HTMLTemplateElement, customElementName: string): void,
            styleElement(element: HTMLElement): void,
            styleSubtree(element: HTMLElement, properties?: CustomPropertyValues): void,
        }
    }
}

export {};
