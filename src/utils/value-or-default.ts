function stringOrDefault(value: any ): string {
  return (typeof value === 'string') ? value : '';
}

function objectOrDefault(value: any) : object {
  return (typeof value === 'object') ? value : {};
}

function arrayOrDefault(value: any): any[] {
  return Array.isArray(value) ? value : [] ;
}

function numberOrDefault(value: any): number {
  return (typeof value === 'number') ? value : 0;
}

export {
  stringOrDefault, objectOrDefault, arrayOrDefault, numberOrDefault
};
