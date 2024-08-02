export function authMiddleware() {
  return {
    tag: 'auth',
    check: async () => {
      const authStore = (await import('@/stores/auth.js')).default();

      return authStore.authenticated;
    },
  };
}

export function guestMiddleware() {
  return {
    tag: 'guest',
    check: async () => {
      const authStore = (await import('@/stores/auth.js')).default();

      return !authStore.authenticated;
    },
  };
}

export default {
  authMiddleware,
  guestMiddleware,
};
