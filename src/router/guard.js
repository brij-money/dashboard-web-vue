/**
 * @param {import('vue-router').Router} router
 */
export default function guard(router) {
  router.beforeEach(async (to, from) => {
    const authStore = (await import('@/stores/auth.js')).default();

    if(!to.matched.length || !!to.matched.length && await validateRoute(to)) {
      return true;
    }

    if(!!from.matched.length && await validateRoute(from)) {
      return false;
    }

    return authStore.fallback;
  });
}

/**
 * @param {import('vue-router').RouteLocationNormalizedGeneric} route
 * @returns {{tag: string, check: () => Promise<boolean>}[]}
 */
function extractRouteMiddleware(route) {
  const middlewareList = route.matched.reduce(
    (previous, current) => {
      for(const middleware of current.meta.middleware ?? []) {
        const index = previous.findIndex((item) => item.tag === middleware.tag);

        if(index >= 0) {
          previous.splice(index, 1, middleware);
        } else {
          previous.push(middleware);
        }
      }

      return previous;
    },
    []
  );

  return middlewareList;
}

/**
 * @param {import('vue-router').RouteLocationNormalizedGeneric} route
 * @returns {Promise<boolean>}
 */
async function validateRoute(route) {
  let check = true;
  const middlewareList = extractRouteMiddleware(route);

  for(const middleware of middlewareList) {
    check = await middleware.check();

    if(!check) {
      break;
    }
  }

  return check;
}
