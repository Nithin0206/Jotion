// extensions/slash/CommandList.tsx
import { useEffect, useState, useRef } from "react";

export default function CommandList({ items, command }: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectItem = (index: number) => {
    const item = items[index];
    if (item) command(item);
  };

  const up = () => {
    setSelectedIndex((i) => (i - 1 + items.length) % items.length);
  };

  const down = () => {
    setSelectedIndex((i) => (i + 1) % items.length);
  };

  const onKeyDown = ({ event }: any) => {
    if (event.key === "ArrowUp") {
      up();
      return true;
    }
    if (event.key === "ArrowDown") {
      down();
      return true;
    }
    if (event.key === "Enter") {
      selectItem(selectedIndex);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current.children[selectedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div
      ref={containerRef}
      className="rounded-md shadow-lg bg-white border w-72 overflow-hidden text-sm"
    >
      {items.length ? (
        items.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => selectItem(index)}
            className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
              index === selectedIndex ? "bg-gray-100" : ""
            }`}
          >
            <div className="font-medium">{item.title}</div>
            <div className="text-xs text-gray-500">{item.description}</div>
          </button>
        ))
      ) : (
        <div className="p-3 text-gray-500">No commands found</div>
      )}
    </div>
  );
}
CommandList.displayName = "CommandList";
