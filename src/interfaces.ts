export type Style = Partial<CSSStyleDeclaration> | ExternalStyle | ConditionalStyle;

export interface ICustomElementSettings {
    ariaAttributes?: Array<[string, string]>;
    html?: string;
    name: string;
    styles?: Style | Array<Style>;
    tabIndex?: number;
}

export interface ExternalStyle {
    url: string;
}

export interface ConditionalStyle {
    condition: boolean | (() => boolean);
    value: Partial<CSSStyleDeclaration> | ExternalStyle;
}


export interface IConnected {
    connectedCallback(): void;
}

type AttributeValue = string | boolean | number;

export interface IAttributeChanged {
    attributeChangedCallback(attributeName: string, oldValue: AttributeValue, newValue: AttributeValue): void;
}

export interface IDisconnected {
    disconnectedCallback(): void;
}