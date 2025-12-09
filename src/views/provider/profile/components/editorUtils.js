export const normalizePortfolioImages = (images) =>
  Array.isArray(images) ? images.slice(0, 4) : [];

export const getPreviewUrl = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value instanceof File) return URL.createObjectURL(value);
  return '';
};

export const cleanupPreview = (url) => {
  if (url && typeof url === 'string' && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
