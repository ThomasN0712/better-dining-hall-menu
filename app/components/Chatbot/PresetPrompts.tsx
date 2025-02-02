// PresetPrompts.tsx
import React from "react";
import { BotMessageSquare } from "lucide-react";

// Define the props for PresetPrompts
interface PresetPromptsProps {
  /**
   * Callback function that is triggered when a preset prompt is selected.
   * @param prompt - The selected prompt string.
   */
  onSelectPrompt: (prompt: string) => void;
}

// Array of preset prompt strings:
const presetPrompts: string[] = [
  "What is the menu today",
  "Do the menu have any pasta this week?",
  "I'm allergic to shellfish, what can I eat at Seaside today?",
];

/**
 * PresetPrompts renders a list of clickable preset prompts.
 * Each prompt displays a Lucide icon and text.
 *
 * @param onSelectPrompt - Callback function to handle prompt selection.
 */
function PresetPrompts({ onSelectPrompt }: PresetPromptsProps) {
  return (
    <div className="flex flex-col gap-2 p-4 text-center">
      <div className="m-4 flex flex-col items-center justify-center">
        <BotMessageSquare className="mb-2 h-10 w-10 animate-bounce" />
        <span className="font-bold">Have a question about the menu?</span>
        <span className="font-small italic">
          Information provided here may not be accurate. Please verify with the
          appropriate kitchen staff.
        </span>
      </div>
      {presetPrompts.map((prompt, idx) => (
        <button
          key={idx}
          className="flex items-center justify-center gap-2 rounded-xl border p-2 hover:bg-gray-700"
          onClick={() => onSelectPrompt(prompt)}
        >
          <span className="text-sm">{prompt}</span>
        </button>
      ))}
    </div>
  );
}

export default PresetPrompts;
