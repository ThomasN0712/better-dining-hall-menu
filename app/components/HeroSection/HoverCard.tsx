import React, { useRef } from "react";
import { CircleAlert } from "lucide-react";

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
};

type HoverCardProps = {
  mealType: string;
  menuItems: MenuItem[];
  selectedAllergens: number[];
};

// Allergen-to-Emoji Mapping
const allergenEmojiMap: Record<string, string> = {
  Eggs: "🥚",
  Milk: "🥛",
  Wheat: "🌾",
  Soy: "🌱",
  Peanuts: "🥜",
  "Tree Nuts": "🌰",
  Fish: "🐟",
  Crustacean: "🦀",
  "Sesame Seeds": "🌼",
};

const HoverCard: React.FC<HoverCardProps> = ({
  mealType,
  menuItems,
  selectedAllergens,
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

  // Filter menu items based on allergens
  const filteredMenuItems = menuItems.filter((item) => {
    const itemAllergenIds = item.allergens.map((allergen) => allergen.id);
    return !itemAllergenIds.some((allergenId) =>
      selectedAllergens.includes(allergenId)
    );
  });

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
              refElement.current.style.setProperty("--duration", "0s");
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
      <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] hover:[--opacity:0.3] hover:[--duration:200ms] hover:[--easing:linear] overflow-hidden">
        {/* Main Content */}
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className="h-full w-full bg-background-cardLight dark:bg-background-cardDark text-text-light dark:text-text-dark p-4 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
                {mealType}
              </h3>
            </div>

            {/* Menu Items */}
            <div className="flex-1">
              {filteredMenuItems.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="py-2 flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      {/* Information Icon with Tooltip */}
                      {item.allergens.length > 0 && (
                        <div className="ml-2 text-gray-500 dark:text-gray-400 cursor-pointer relative group">
                          <CircleAlert
                            size={16}
                            className="text-text-light dark:text-text-dark"
                          />
                          <div className="absolute hidden group-hover:block z-10 bg-white text-gray-800 rounded-md p-2 shadow-lg dark:bg-gray-800 dark:text-gray-200 text-sm max-w-xs">
                            <div>
                              <p className="font-medium">Allergens:</p>
                              <ul className="mt-1 space-y-1">
                                {item.allergens.map((allergen) => (
                                  <li
                                    key={allergen.id}
                                    className="flex items-center"
                                  >
                                    <span className="mr-2">
                                      {allergenEmojiMap[allergen.name] || "❓"}
                                    </span>
                                    <span>{allergen.name}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No menu items available based on your selections.
                </p>
              )}
            </div>
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

export default HoverCard;
