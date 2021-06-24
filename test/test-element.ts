import { attribute, customElement, IAttributeChanged } from "../src";

@customElement({
    ariaAttributes: [
        ["role", "button"]
    ],
    name: "test-element",
    html: /* html */ `
        <div>
            <span class="spanner">Test element</span>
            <input class="inp" type="number" />
            <p class="paragraph"></p>
        </div>
    `,
    styles: `.spanner { color: #efefef; }`,
    tabIndex: 0
})
export class TestElement extends HTMLElement implements IAttributeChanged {
    public static get observedAttributes(): Array<keyof TestElement> {
        return [ "boolattr", "numattr", "strattr" ];
    }

    @attribute()
    public strattr: string;

    @attribute()
    public numattr: number;

    @attribute()
    public boolattr: boolean;

    public attributeChangedCallback(attributeName: keyof TestElement): void {
        if (attributeName === "strattr") {
            const spanner = this.shadowRoot.querySelector(".spanner") as HTMLSpanElement;
            spanner.innerText = this.strattr;
        } else if (attributeName === "numattr") {
            const input = this.shadowRoot.querySelector(".inp") as HTMLInputElement;
            input.value = this.numattr.toString();
        } else if (attributeName === "boolattr") {
            const paragraph = this.shadowRoot.querySelector(".paragraph") as HTMLParagraphElement;
            paragraph.innerText = this.boolattr.toString();
        }
    }
}
