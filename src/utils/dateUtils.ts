
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const getDateRangeFilter = (range: string): Date | null => {
  const today = new Date();
  
  switch (range) {
    case '7days':
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return sevenDaysAgo;
    case '30days':
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return thirtyDaysAgo;
    case 'all':
    default:
      return null;
  }
};
