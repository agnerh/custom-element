export function attribute(settings?: IAttributeSettings): unknown {
    return (object: unknown, key: PropertyKey) => {
        const attr = settings?.name ?? key.toString();
        const type = settings?.type ?? "string";

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

        return Object.defineProperty(object, key, descriptor);
    }
}

export interface IAttributeSettings {
    name?: string
    type?: AttributeType,
}

export type AttributeType = "boolean" | "number" | "string";

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
