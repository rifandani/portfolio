import type { ReactNode } from "react";

export interface StatusScreenProps {
  code: string;
  title: string;
  description: string;
  action: ReactNode;
}

/** Full-viewport status screen shared by not-found, error, and gated routes. */
export const StatusScreen = ({
  code,
  title,
  description,
  action,
}: StatusScreenProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="max-w-md space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-primary text-8xl font-bold">{code}</h1>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-fg">{description}</p>
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        {action}
      </div>
    </div>
  </div>
);
