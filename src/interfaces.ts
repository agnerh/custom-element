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