import { defineStore } from 'pinia';
import { reactive } from 'vue';

export default defineStore('overlay', () => {
  let lastUid = -1;
  /** @type {import('vue').Reactive<number[]>} */
  const _stack = reactive([]);

  /**
   * @param {number} uid
   */
  function index(uid) {
    return _stack.lastIndexOf(uid);
  }

  function init() {
    return ++lastUid;
  }

  /**
   * @param {number} uid
   */
  function peak(uid) {
    return _stack.lastIndexOf(uid) == _stack.length - 1;
  }

  /**
   * @param {number?} [uid = null]
   */
  function pop(uid = null) {
    if (uid == null) {
      _stack.pop();
    } else {
      for (let i = 0; i < _stack.length; i++) {
        if (_stack[i] == uid) {
          _stack.splice(i--, 1);

          continue;
        }
      }
    }
  }

  /**
   * @param {number} uid
   */
  function push(uid) {
    if (uid > lastUid) {
      return;
    }

    pop(uid);

    _stack.push(uid);
  }

  return {
    index,
    init,
    peak,
    pop,
    push,
  }
});
