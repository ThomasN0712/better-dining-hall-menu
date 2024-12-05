import React, { useRef } from "react";

const alwaysAvailableItems = [
  { item_name: "Scrambled Eggs", meal_type: "Breakfast", meal_type_id: 113 },
  { item_name: "Oatmeal", meal_type: "Breakfast", meal_type_id: 113 },
  { item_name: "Waffle Bar", meal_type: "Breakfast", meal_type_id: 113 },
  {
    item_name: "Assorted Fruit Juice",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  {
    item_name: "Milk and Non-Dairy Milk",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  { item_name: "Assorted Cereals", meal_type: "Breakfast", meal_type_id: 113 },
  { item_name: "Fresh Fruit", meal_type: "Breakfast", meal_type_id: 113 },
  { item_name: "Deli Bar", meal_type: "Breakfast", meal_type_id: 113 },
  {
    item_name: "Assorted Sparkling Water",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  {
    item_name: "Assorted Flavored Waters",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  {
    item_name: "Assorted Soft Drinks",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  {
    item_name: "Assorted Breakfast Pastries",
    meal_type: "Breakfast",
    meal_type_id: 113,
  },
  { item_name: "Assorted Fruit Juice", meal_type: "Lunch", meal_type_id: 115 },
  {
    item_name: "Milk and Non-Dairy Milk",
    meal_type: "Lunch",
    meal_type_id: 115,
  },
  { item_name: "Assorted Cereals", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Fresh Fruit", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Chef's Choice", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Salad Bar", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Deli Bar", meal_type: "Lunch", meal_type_id: 115 },
  {
    item_name: "Assorted Sparkling Water",
    meal_type: "Lunch",
    meal_type_id: 115,
  },
  {
    item_name: "Assorted Flavored Waters",
    meal_type: "Lunch",
    meal_type_id: 115,
  },
  { item_name: "Assorted Soft Drinks", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Assorted Desserts", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Novelty Ice Creams", meal_type: "Lunch", meal_type_id: 115 },
  { item_name: "Assorted Fruit Juice", meal_type: "Dinner", meal_type_id: 116 },
  {
    item_name: "Milk and Non-Dairy Milk",
    meal_type: "Dinner",
    meal_type_id: 116,
  },
  { item_name: "Assorted Cereals", meal_type: "Dinner", meal_type_id: 116 },
  { item_name: "Fresh Fruit", meal_type: "Dinner", meal_type_id: 116 },
  { item_name: "Salad Bar", meal_type: "Dinner", meal_type_id: 116 },
  { item_name: "Deli Bar", meal_type: "Dinner", meal_type_id: 116 },
  { item_name: "Chef's Choice", meal_type: "Dinner", meal_type_id: 116 },
  {
    item_name: "Assorted Sparkling Water",
    meal_type: "Dinner",
    meal_type_id: 116,
  },
  {
    item_name: "Assorted Flavored Waters",
    meal_type: "Dinner",
    meal_type_id: 116,
  },
  { item_name: "Assorted Soft Drinks", meal_type: "Dinner", meal_type_id: 116 },
];

type AlwaysAvailableCardProps = {
  mealTypeId: number;
};

const AlwaysAvailableCard: React.FC<AlwaysAvailableCardProps> = ({
  mealTypeId,
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0", // Initial opacity
    "--radius": "16px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as React.CSSProperties;

  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow":
      "repeating-linear-gradient( 0deg,rgb(255,119,115) calc(var(--step) * 1),rgba(255,237,95,1) calc(var(--step) * 2),rgba(168,255,95,1) calc(var(--step) * 3),rgba(131,255,247,1) calc(var(--step) * 4),rgba(120,148,255,1) calc(var(--step) * 5),rgb(216,117,255) calc(var(--step) * 6),rgb(255,119,115) calc(var(--step) * 7) ) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal":
      "repeating-linear-gradient( 128deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,10%,60%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade":
      "radial-gradient( farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hue, hue, overlay",
  } as React.CSSProperties;

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current.style.setProperty("--bg-y", `${background.y}%`);
    }
  };
  // Filter items based on mealTypeId
  const filteredItems = alwaysAvailableItems.filter(
    (item) => item.meal_type_id === mealTypeId
  );

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] will-change-transform"
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.2; // Adjust as needed
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 6 - 8.33; // Adjusted for less movement
        background.y = 50 + percentage.y / 5 - 10; // Adjusted for less movement
        rotate.x = -(delta.x / 5); // Reduced rotation
        rotate.y = delta.y / 3; // Reduced rotation
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current.style.setProperty("--r-x", `0deg`);
          refElement.current.style.setProperty("--r-y", `0deg`);
        }
      }}
    >
      <div
        className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] hover:[--opacity:0.3] hover:[--duration:200ms] hover:[--easing:linear] overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Main Content */}
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className="h-full w-full text-text-light dark:text-text-dark p-4 flex flex-col relative bg-[#FFAF45]  dark:bg-[#9b7527] border-background-borderLight dark:border-background-borderDark border shadow-lg">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
                {filteredItems[0]?.meal_type || "Unknown Meal Type"}
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="py-2 flex items-center justify-between"
                >
                  {item.item_name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Glare Effect Layers with pointer-events:none */}
        <div className="pointer-events-none w-full h-full grid [grid-area:1/1] mix-blend-soft-light opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)] will-change-background [clip-path:inset(0_0_1px_0_round_var(--radius))] [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),rgba(255,255,255,0.5)_15%,rgba(255,255,255,0.3)_30%,rgba(255,255,255,0)_100%)]" />

        <div
          className="pointer-events-none w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),var(--rainbow),var(--diagonal),var(--shade)] relative after:content-[''] after:grid-area-inherit after:bg-repeat-inherit after:bg-attachment-inherit after:bg-origin-inherit after:bg-clip-inherit after:bg-inherit after:mix-blend-exclusion after:[background-size:var(--foil-size),200%_400%,800%,200%] after:[background-position:center,0%_var(--bg-y),calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,hue,hard-light]"
          style={backgroundStyle}
        />
      </div>
    </div>
  );
};

export default AlwaysAvailableCard;
