// constants.ts
export const todayDate = new Date();

export const locationData = [
  {
    location: "Beachside Dining",
    mealTypes: [
      {
        type: "Breakfast",
        menuItems: [
          {
            id: 1,
            name: "Pancakes",
            description: "Fluffy pancakes with syrup.",
          },
          {
            id: 2,
            name: "Omelette",
            description: "Cheese omelette with herbs.",
          },
        ],
      },
      {
        type: "Lunch",
        menuItems: [
          {
            id: 3,
            name: "Spaghetti",
            description: "Pasta with marinara sauce.",
          },
          {
            id: 4,
            name: "Caesar Salad",
            description: "Crisp romaine with dressing.",
          },
        ],
      },
      {
        type: "Dinner",
        menuItems: [
          {
            id: 5,
            name: "Grilled Chicken",
            description: "Chicken with herbs.",
          },
          { id: 6, name: "Steak", description: "Grilled steak with butter." },
        ],
      },
    ],
  },
  {
    location: "Parkside Dining",
    mealTypes: [
      {
        type: "Breakfast",
        menuItems: [
          { id: 7, name: "French Toast", description: "Toast with cinnamon." },
          { id: 8, name: "Smoothie", description: "Fresh fruit smoothie." },
        ],
      },
      {
        type: "Lunch",
        menuItems: [
          {
            id: 9,
            name: "Chicken Wrap",
            description: "Grilled chicken in a tortilla.",
          },
          {
            id: 10,
            name: "Greek Salad",
            description: "Salad with feta and olives.",
          },
        ],
      },
      {
        type: "Dinner",
        menuItems: [
          {
            id: 11,
            name: "Fish Tacos",
            description: "Crispy fish with cabbage slaw.",
          },
          {
            id: 12,
            name: "Vegetable Stir Fry",
            description: "Mixed veggies with soy sauce.",
          },
        ],
      },
    ],
  },
  {
    location: "Hillside Dining",
    mealTypes: [
      {
        type: "Breakfast",
        menuItems: [
          {
            id: 13,
            name: "Bagel with Cream Cheese",
            description: "Toasted bagel with cream cheese.",
          },
          {
            id: 14,
            name: "Breakfast Burrito",
            description: "Eggs, cheese, and sausage in a wrap.",
          },
        ],
      },
      {
        type: "Lunch",
        menuItems: [
          {
            id: 15,
            name: "BLT Sandwich",
            description: "Bacon, lettuce, and tomato on toasted bread.",
          },
          {
            id: 16,
            name: "Tomato Soup",
            description: "Creamy tomato soup with basil.",
          },
        ],
      },
      {
        type: "Dinner",
        menuItems: [
          {
            id: 17,
            name: "Lasagna",
            description: "Layers of pasta, cheese, and meat sauce.",
          },
          {
            id: 18,
            name: "BBQ Ribs",
            description: "Tender ribs with BBQ sauce.",
          },
        ],
      },
    ],
  },
];

export const alwaysAvailableMenuItems = [
  {
    id: 6,
    name: "Garden Salad",
    description: "Fresh mixed greens with seasonal vegetables.",
  },
  { id: 7, name: "Fruit Bowl", description: "Assorted seasonal fruits." },
  {
    id: 8,
    name: "Grilled Cheese Sandwich",
    description: "Classic grilled cheese with cheddar.",
  },
];
