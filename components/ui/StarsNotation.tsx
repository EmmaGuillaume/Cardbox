import { Star } from "lucide-react";
import { useState } from "react";

type StarsNotationProps = {
  rating: number;
  readonly?: boolean;
  big?: boolean;
  onChange?: (rating: number) => void;
};

const StarsNotation = ({ rating, readonly = false, big, onChange }: StarsNotationProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const active = readonly ? Math.floor(rating) : hovered ?? selected ?? Math.floor(rating);

  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${selected ? "text-yellow" : "text-muted-foreground"} ${big ? "size-6" : "size-4"} transition-colors ${!readonly ? "cursor-pointer" : "cursor-default text-yellow"}`}
          fill={i < active ? "currentColor" : "none"}
          onMouseEnter={!readonly ? () => setHovered(i + 1) : undefined}
          onMouseLeave={!readonly ? () => setHovered(null) : undefined}
          onClick={!readonly ? () => { setSelected(i + 1); onChange?.(i + 1); } : undefined}
        />
      ))}
    </div>
  );
};

export default StarsNotation;