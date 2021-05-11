import { createTemplate } from './create-template';

type Constructor = { new(...args: Array<any>): any };

export function customElement(settings: ICustomElementSettings) {
    return function <T extends Constructor>(constructorFunction: T) {

        class customElementCreator extends constructorFunction {
            constructor(...args: Array<any>) {
                super(args);

                this.attachShadow({ mode: "open" });
                const template = createTemplate(settings);
                
                if (template) {
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                }
            }
        }

        if (customElements && !customElements.get(settings.name)) {
            customElements.define(settings.name, customElementCreator);
        }
        
        return customElementCreator;
    }
}

export interface ICustomElementSettings {
    externalStyleSheets?: Array<string>;
    html?: string;
    name: string;
    styles?: Partial<CSSStyleDeclaration>;
}
