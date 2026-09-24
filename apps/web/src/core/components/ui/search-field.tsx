'use client'

import { HiMiniMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { Button } from 'react-aria-components/Button'
import type { InputProps } from 'react-aria-components/Input'
import {
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps,
} from 'react-aria-components/SearchField'
import { twJoin } from 'tailwind-merge'
import { fieldStyles } from '@/core/components/ui/field'
import { cx } from '@/core/utils/primitive'
import { Input, InputGroup } from './input'

export function SearchField({ className, ...props }: SearchFieldProps) {
  return (
    <SearchFieldPrimitive
      data-slot="control"
      aria-label={props['aria-label'] ?? 'Search'}
      className={cx(fieldStyles({ className: 'group/search-field' }), className)}
      {...props}
    />
  )
}

export function SearchInput(props: InputProps) {
  return (
    <InputGroup className="[--input-gutter-end:--spacing(8)]">
      <HiMiniMagnifyingGlass aria-hidden="true" data-slot="icon" className="in-disabled:opacity-50" />
      <Input {...props} />
      <Button
        className={twJoin(
          'touch-target grid place-content-center pressed:text-fg text-muted-fg hover:text-fg group-empty/search-field:invisible',
          'px-3 py-2 sm:px-2.5 sm:py-1.5 sm:text-sm/5'
        )}
      >
        <HiMiniXMark aria-hidden="true" data-slot="icon" className="size-5 sm:size-4" />
      </Button>
    </InputGroup>
  )
}
