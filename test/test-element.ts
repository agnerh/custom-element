import { attribute, customElement, IAttributeChanged } from "../src";

@customElement({
    ariaAttributes: [
        ["role", "button"]
    ],
    name: "test-element",
    html: /* html */ `
        <div>
            <span class="spanner">Test element</span>
        </div>
    `,
    styles: `.spanner { color: #efefef; }`,
    tabIndex: 0
})
export class TestElement extends HTMLElement implements IAttributeChanged {
    public static get observedAttributes(): Array<keyof TestElement> {
        return [ "attr" ];
    }

    @attribute()
    public attr: string;

    public attributeChangedCallback(): void {
        const spanner = this.shadowRoot.querySelector(".spanner") as HTMLSpanElement;
        spanner.innerText = this.attr;
    }
}
