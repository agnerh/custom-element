import { setAriaAttributes } from './aria';
import { createTemplate } from './create-template';
import { setTabIndex } from './tabIndex';

export function customElement(settings: ICustomElementSettings) {
    return function <T extends CustomElementConstructor>(constructorFunction: T): T {

        class customElementCreator extends constructorFunction {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            constructor(...args: Array<any>) {
                super(args);

                const template = createTemplate(settings);

                // IE compatability
                if (window.ShadyCSS) {
                    window.ShadyCSS.prepareTemplate(template, settings.name);
                }

                createElement(this, template);
            }

            public connectedCallback(): void {
                setAriaAttributes(this, settings.ariaAttributes);
                setTabIndex(this, settings.tabIndex);

                // IE compatability
                if (window.ShadyCSS) {
                    window.ShadyCSS.styleElement(this);
                }
                
                if (super["connectedCallback"]) {
                    super["connectedCallback"]();
                }
            }
        }

        if (typeof customElements !== "undefined" && customElements !== null && !customElements.get(settings.name)) {
            customElements.define(settings.name, customElementCreator);
        }
        
        return customElementCreator;
    }
}

function createElement(parent: HTMLElement, template: HTMLTemplateElement): void {
    if (!template) {
        return;
    }

    parent.attachShadow({ mode: "open" });
    parent.shadowRoot.appendChild(template.content.cloneNode(true));
}

export interface ICustomElementSettings {
    ariaAttributes?: Array<[string, string]>;
    externalStyleSheets?: Array<string>;
    html?: string;
    name: string;
    styles?: Partial<CSSStyleDeclaration>;
    tabIndex?: number;
}
