export interface IConnected {
    connectedCallback(): void;
}

export interface IAttributeChanged {
    attributeChangedCallback(attributeName: string, oldValue: any, newValue: any): void;
}

export interface IDisconnected {
    disconnectedCallback(): void;
}