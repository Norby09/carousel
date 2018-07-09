function stringOrDefault(value: any, defaultValue: string = ''): string {
  return (typeof value === 'string') ? value : defaultValue;
}

function objectOrDefault(value: any, defaultValue: object) {
  return (typeof value === 'object') ? value : defaultValue;
}

function arrayOrDefault(value: any, defaultValue: any[] = []): any[] {
  return Array.isArray(value) ? value : defaultValue;
}

function numberOrDefault(value: any, defaultValue: number = 0): number {
  return (typeof value === 'number') ? value : defaultValue;
}

export {
  stringOrDefault, objectOrDefault, arrayOrDefault, numberOrDefault
};
