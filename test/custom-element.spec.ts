import { elementUpdated, fixture } from "@open-wc/testing-helpers";
import { TestElement } from "./test-element";
import "./test-element";

describe("Custom elements", async () => {
    let el: TestElement;

    beforeEach(async () => {
        el = await fixture<TestElement>(`<test-element></test-element>`);
    })
    
    it("Should create an element", () => {
        expect(el).toBeTruthy();
    });

    it("Should have correct default text", () => {
        const defaultText = "Test element";
        const spanner = el.shadowRoot.querySelector(".spanner") as HTMLSpanElement;

        expect(spanner.innerText).toBe(defaultText);
    });

    it("Should have correct css", () => {
        const color = "#efefef";
        const spanner = el.shadowRoot.querySelector(".spanner");
        const hexColor = getHexColor(getComputedStyle(spanner).color);

        expect(hexColor).toBe(color);
    });

    it("Should have the correct aria attributes", () => {
        const testRole = "button";
        const role = el.getAttribute("role");

        expect(role).toBe(testRole);
    });

    it("Should update text from attribute", async () => {
        const newText = "This is the new text";
        const spanner = el.shadowRoot.querySelector(".spanner") as HTMLSpanElement;
        el.attr = newText;

        await elementUpdated(el);

        expect(spanner.innerText).toBe(newText);
    });

    it("Should have the correct tab index", () => {
        const tabIdx = 0;

        expect(el.tabIndex).toBe(tabIdx);
    });
});

const getHexColor = (color: string): string => {
    const rgb = color.match(/\d+/g);
    if (rgb.length < 3) {
        return color;
    }

    const r = parseInt(rgb[0]).toString(16);
    const g = parseInt(rgb[1]).toString(16);
    const b = parseInt(rgb[2]).toString(16);
    return `#${r}${g}${b}`;
}