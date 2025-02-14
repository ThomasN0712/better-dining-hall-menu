import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CircleAlert } from "lucide-react";

// Update MenuItem type to include an optional AI generated description
type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
  aiDescription?: string;
};

type HoverCardProps = {
  mealType: string;
  menuItems: MenuItem[];
  selectedAllergens: number[];
  startTime: string;
  endTime: string;
  aiDescriptions?: string;
};

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
  startTime,
  endTime,
  aiDescriptions,
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
    "--opacity": "0",
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
      selectedAllergens.includes(allergenId),
    );
  });

  return (
    <div
      style={containerStyle}
      className="relative isolate h-full transition-transform duration-[var(--duration)] ease-[var(--easing)] will-change-transform [contain:layout_style] [perspective:600px]"
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
        className="grid h-full origin-center overflow-hidden rounded-[var(--radius)] transition-transform duration-[var(--duration)] ease-[var(--easing)] will-change-transform [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:[--duration:200ms] hover:[--easing:linear] hover:[--opacity:0.3]"
        style={{ zIndex: 0 }}
      >
        {/* Main Content */}
        <div className="grid h-full w-full mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))] [grid-area:1/1]">
          <div className="relative flex h-full w-full flex-col border border-background-borderLight bg-background-cardLight p-4 text-text-light shadow-lg dark:border-background-borderDark dark:bg-background-cardDark dark:text-text-dark">
            {/* Header */}
            <div className="mb-1">
              <h3 className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
                {mealType}
              </h3>
            </div>

            {/* Display start and end times */}
            {startTime && endTime && (
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {startTime} - {endTime}
              </p>
            )}

            {/* Menu Items */}
            <div className="flex-1">
              {filteredMenuItems.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{item.name}</span>
                      {/* Information Icon with Tooltip */}
                      {(item.aiDescription || item.allergens.length > 0) && (
                        <Tooltip item={item} />
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
        <div className="will-change-background pointer-events-none grid h-full w-full opacity-[var(--opacity)] mix-blend-soft-light transition-opacity duration-[var(--duration)] ease-[var(--easing)] [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),rgba(255,255,255,0.5)_15%,rgba(255,255,255,0.3)_30%,rgba(255,255,255,0)_100%)] [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1]" />

        <div
          className="will-change-background after:grid-area-inherit after:bg-repeat-inherit after:bg-attachment-inherit after:bg-origin-inherit after:bg-clip-inherit pointer-events-none relative grid h-full w-full opacity-[var(--opacity)] mix-blend-color-dodge transition-opacity [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),var(--rainbow),var(--diagonal),var(--shade)] [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1] after:bg-inherit after:mix-blend-exclusion after:content-[''] after:[background-blend-mode:soft-light,hue,hard-light] after:[background-position:center,0%_var(--bg-y),calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),var(--bg-x)_var(--bg-y)] after:[background-size:var(--foil-size),200%_400%,800%,200%]"
          style={backgroundStyle}
        />
      </div>
    </div>
  );
};

const Tooltip: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Default tooltip position
      let tooltipLeft = rect.left + window.scrollX;
      let tooltipTop = rect.bottom + window.scrollY;

      // Adjust tooltip position to stay within the viewport
      const tooltipWidth = 100;
      if (tooltipLeft + tooltipWidth > viewportWidth) {
        tooltipLeft = viewportWidth - tooltipWidth;
      }

      setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <>
      <div
        className="relative ml-2 cursor-pointer text-gray-500 dark:text-gray-400"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={iconRef}
        style={{ zIndex: 1 }}
      >
        <CircleAlert
          size={16}
          className="text-text-light dark:text-text-dark"
        />
      </div>
      {tooltipVisible &&
        ReactDOM.createPortal(
          <div
            className="rounded- absolute z-50 max-w-xs bg-white p-2 text-sm text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-200"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              position: "absolute",
            }}
          >
            <div>
              {item.aiDescription && (
                <div className="mb-2">
                  <p className="font-bold">AI Generated Description:</p>
                  <p className="italic">{item.aiDescription}</p>
                  <p className="text-xs text-red-500">
                    AI generated description might be inaccurate.
                  </p>
                </div>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <>
                  <p className="font-bold">Allergens:</p>
                  <ul className="mt-1 space-y-1">
                    {item.allergens.map((allergen) => (
                      <li key={allergen.id} className="flex items-center">
                        <span className="mr-2">
                          {allergenEmojiMap[allergen.name] || "❓"}
                        </span>
                        <span>{allergen.name}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default HoverCard;
