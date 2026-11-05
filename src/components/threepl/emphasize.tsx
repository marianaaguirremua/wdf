import { Fragment, type ReactNode } from "react";

/** Renders `**…**` spans in a copy string as emphasis. */
export function emphasize(text: string): ReactNode[] {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-paper-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
