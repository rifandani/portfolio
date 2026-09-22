'use client'

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components/Link'
import { tv } from 'tailwind-variants'
import { cx } from '@/core/utils/primitive'

export const linkStyles = tv({
  base: [
    'font-medium text-(--text)',
    'outline-0 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring forced-colors:outline-[Highlight]',
    'disabled:cursor-default disabled:opacity-50 forced-colors:disabled:text-[GrayText]',
  ],
  variants: {
    variant: {
      /**
       * Rule is a background gradient, not `text-decoration`: a gradient can
       * animate its width, and it survives wrapping inside prose where an
       * absolutely positioned pseudo-element cannot.
       */
      underline: [
        'no-underline hover:no-underline',
        'bg-[linear-gradient(currentColor,currentColor)] bg-[size:0%_1px] bg-[position:0_100%] bg-no-repeat',
        'transition-[background-size,color] duration-300 ease-out motion-reduce:transition-none',
        'hover:bg-[size:100%_1px] focus-visible:bg-[size:100%_1px]',
        'disabled:bg-[size:0%_1px]',
      ],
      /** No rule at all — for links whose target is a card, button, or nav row. */
      plain: '',
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
})

export interface LinkProps extends LinkPrimitiveProps {
  ref?: React.RefObject<HTMLAnchorElement>
  /** `underline` sweeps a rule in from the left on hover. Defaults to `underline`. */
  variant?: 'underline' | 'plain'
}

export function Link({ className, ref, variant, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      ref={ref}
      className={cx(
        linkStyles({ variant }),
        'href' in props && 'cursor-pointer',
        className
      )}
      {...props}
    />
  )
}
