import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const attribute = (settings?: IAttributeSettings) => (object: unknown, key: PropertyKey): void => {
    const attr = settings?.name ?? key.toString();
    const type = getAttributeType(object, key);

    const getter = function(this: HTMLElement): boolean | number | string {
        return getAttributeValue(this, attr, type);
    }

    const setter = function(this: HTMLElement, value: boolean | number | string): void {
        setAttributeValue(this, attr, value);
    }

    const descriptor = {
        configurable: true,
        enumerable: true,
        get: getter,
        set: setter
    };

    Object.defineProperty(object, key, descriptor);
}

export interface IAttributeSettings {
    name?: string;
}

export type AttributeType = "boolean" | "number" | "string";

function getAttributeType(object: any, key: PropertyKey): AttributeType {
    let type: AttributeType = "string";

    const ctor = Reflect.getMetadata("design:type", object, key.toString());
    if (ctor && ctor.name && (ctor.name === "String" || ctor.name === "Boolean" || ctor.name === "Number")) {
        type = (ctor.name as string).toLowerCase() as AttributeType;
    }

    return type;
}

function getAttributeValue(element: HTMLElement, attribute: string, type: AttributeType): boolean | number | string {
    if (type === "boolean") {
        return element.hasAttribute(attribute);
    }

    return convert(element.getAttribute(attribute), type);
}

function convert(value: number | string, type: AttributeType): number | string {
    if (type === "number") {
        return value ? Number(value) : NaN;
    } else {
        return value as string;
    }
}

function setAttributeValue(element: HTMLElement, attribute: string, value: boolean | number | string) {
    if (value || value === 0) {
        element.setAttribute(attribute, value.toString());
    } else {
        element.removeAttribute(attribute);
    }
}
