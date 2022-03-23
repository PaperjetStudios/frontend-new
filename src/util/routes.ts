export const checkRouteMatch = (routes: string[], pathname: string) => {
  let possibleMatches;
  for (let i = 0; i < routes.length; i++) {
    const pattern = routes[i];
    // const possibleMatch = matchPath(pattern, pathname);
    const possibleMatch = pathname.startsWith(pattern);
    if (possibleMatch) {
      if (i > 0) {
        if (
          possibleMatches &&
          possibleMatches.pattern.length < pattern.length
        ) {
          possibleMatches = { id: i, routeMatch: possibleMatch, pattern };
        }
      } else {
        possibleMatches = { id: i, routeMatch: possibleMatch, pattern };
      }
    }
  }

  if (possibleMatches) {
    return possibleMatches;
  }

  return null;
};
