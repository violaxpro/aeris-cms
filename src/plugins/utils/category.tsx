export interface CategoryOption {
  title: string;
  value: string | number;
  children?: CategoryOption[];
}

export const mapCategoriesToOptions = (categories: any[]): CategoryOption[] => {
  return categories.map((category): CategoryOption => ({
    title: category.name,
    value: category.id,
    children:
      category.children && category.children.length > 0
        ? mapCategoriesToOptions(category.children)
        : undefined,
  }));
};
