'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export default function IconButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { dotColor?: string }
) {
  const { className, children, dotColor, ...rest } = props;
  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-md border bg-card/60',
        'transition active:scale-95 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
        className
      )}
      {...rest}
    >
      {children}
      {dotColor ? (
        <span className={cn('absolute right-1 top-1 size-2 rounded-full', dotColor)} />
      ) : null}
    </button>
  );
}
