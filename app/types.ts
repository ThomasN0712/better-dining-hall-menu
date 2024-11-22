export type MealItem = {
  name: string;
  allergens: string[];
};

export type MealType = {
  type: string;
  menuItems: MealItem[];
};
