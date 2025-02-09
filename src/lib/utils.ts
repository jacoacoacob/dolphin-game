
export function isNull(data: unknown): data is null {
  return data === null;
}

export function isUndefined(data: unknown): data is undefined {
  return data === undefined;
}

export function isNullOrUndefined(data: unknown): data is null | undefined {
  return isNull(data) || isUndefined(data);
}

export function isObject(data: unknown): data is { [key: string]: unknown } {
  return typeof data === "object" && !isNull(data) && !Array.isArray(data);
}