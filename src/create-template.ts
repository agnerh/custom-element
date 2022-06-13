import { ConditionalStyle, ExternalStyle, ICustomElementSettings, Style } from "./interfaces";

export function createTemplate(settings: ICustomElementSettings): HTMLTemplateElement {
    const html = getHtml(settings.html);
    const styles = getStyles(settings.styles);
    // const externalStyleSheets = getExternalStyleSheets(settings.externalStyleSheets);
    // const styles = getStyles(settings.styles, externalStyleSheets);

    return createTemplateElement(html, styles);
}

function createTemplateElement(
    html: string, 
    style: Partial<CSSStyleDeclaration>,
): HTMLTemplateElement {

    if (!html) {
        throw new Error("Could not parse html of component");
    }

    const template = document.createElement("template");    
    const innerHTML = `
        ${style}
        ${html}
    `;

    template.innerHTML = innerHTML;
    return template;
}

function getHtml(html: string): string {
    let computedHtml: string;

    if (html) {
        computedHtml = html;
    }

    return computedHtml ? computedHtml : "";
}

function getStyles(style: Style | Array<Style>): Partial<CSSStyleDeclaration> {
    if (!style) {
        return "";
    }

    if (typeof style === "string") {
        return getStyleSheet(style);
    }

    if (!Array.isArray(style)) {
        return "";
    }
    
    return style.map(s => getStyleSheet(s))
        .filter(style => !!style)
        .join("");
}

function getStyleSheet(sheet: Style): string {
    if (!sheet) {
        return "";
    }

    if (typeof sheet === "string") {
        return `<style>${sheet}</style>`;
    }

    if ("url" in sheet) {
        return getExternalStyleSheet(sheet);
    }

    if ("condition" in sheet) {
        return getConditionalSheet(sheet);
    }

    return "";
}

function getExternalStyleSheet(externalStyleSheet: ExternalStyle): string {
    if (!externalStyleSheet) {
        return "";
    }

    return `<link rel="stylesheet" href="${externalStyleSheet.url}">`;
}

function getConditionalSheet(conditionalSheet: ConditionalStyle): string {
    if (!conditionalSheet || !conditionalSheet.value) {
        return "";
    }

    let conditionCheck = false;
    if (typeof conditionalSheet.condition === "function") {
        conditionCheck = conditionalSheet.condition();
    } else {
        conditionCheck = conditionalSheet.condition;
    }

    // Avoid circular references
    if (typeof conditionalSheet.value === "object" && "condition" in conditionalSheet.value) {
        return "";
    }

    return conditionCheck ? getStyleSheet(conditionalSheet.value) : "";
}