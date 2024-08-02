/**
 * @param {Record<string|number, *>} records
 * @returns {Record<string, string>}
 */
export function linearize(records) {
  const result = {};

  /**
   * @param {*} value
   * @param {(string|number)?} [prefix]
   * @returns {void}
   */
  const expand = (source, prefix = null) => {
    if(typeof source == 'object' && source != null) {
      for(const subkey in source) {
        const key = `${prefix ?? ''}${!!prefix ? `[${subkey}]` : subkey}`;
        const value = source[subkey];

        expand(value, key);
      }

      return;
    }

    if(!!prefix) {
      result[prefix.toString()] = source?.toString?.() ?? '';
    }
  }

  for(const key in records) {
    const value = records[key];

    expand(value, key);
  }

  return result;
}

export default {linearize};
