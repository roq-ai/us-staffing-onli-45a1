const mapping: Record<string, string> = {
  organizations: 'organization',
  'training-materials': 'training_material',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
