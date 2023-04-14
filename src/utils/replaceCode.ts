function replaceCode(myArray: Array<[string, string]>, text: string): string {
  let result = text;
  for (const [replace, replacement] of myArray) {
    const regex = new RegExp(replace, 'g');
    result = result.replace(regex, replacement);
  }
  return result;
}

export default replaceCode;
