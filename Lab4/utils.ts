type ParseResult<T> = { parsed: T[]; hasError: false } | { parsed?: unknown; hasError: true };

export const safeJsonParse = <T>(guard: (item: any) => item is T, data: string): ParseResult<T> => {
    const parsedData = JSON.parse(data);

    if (parsedData instanceof Array) {
        return guard(parsedData[0]) ? { parsed: parsedData, hasError: false } : { hasError: true };
    }

    return guard(parsedData) ? { parsed: [parsedData], hasError: false } : { hasError: true };
};
