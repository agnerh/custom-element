import { ICustomElementSettings } from "./custom-element.decorator";

export function createTemplate(settings: ICustomElementSettings): HTMLTemplateElement {
    const html = getHtml(settings.html);
    const styles = getStyles(settings.styles);
    const externalStyleSheets = getExternalStyleSheets(settings.externalStyleSheets);

    return createTemplateElement(html, styles, externalStyleSheets);
}

function createTemplateElement(
    html: string, 
    style: Partial<CSSStyleDeclaration>,
    externalStyleSheets: string
): HTMLTemplateElement {

    if (!html) {
        throw new Error("Could not parse html of component");
    }

    const template = document.createElement("template");    
    const innerHTML = `
        ${externalStyleSheets}
        ${style}
        ${html}
    `

    template.innerHTML = innerHTML;
    return template;
}

function getExternalStyleSheets(externalStyleSheets?: Array<string>): string {
    return externalStyleSheets
        ? externalStyleSheets.map(styleSheet => `<link rel="stylesheet" href="${styleSheet}">`).join("\n")
        : "";
}

function getHtml(html: string): string {
    let computedHtml: string;

    if (html) {
        computedHtml = html;
    }

    return computedHtml ? computedHtml : "";
}

function getStyles(style: Partial<CSSStyleDeclaration>): Partial<CSSStyleDeclaration> {
    let computedStyle: Partial<CSSStyleDeclaration>;

    if (style) {
        computedStyle = style;
    }

    return computedStyle ? `<style>${computedStyle}</style>` : "";
}
