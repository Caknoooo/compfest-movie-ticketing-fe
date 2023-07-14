import * as React from 'react';

import clsxm from '@/libs/clsxm';

export enum TypographyVariant {
  'k0',
  'j0',
  'j1',
  'j2',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  's0',
  's1',
  's2',
  's3',
  's4',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'c0',
  'c1',
  'c2',
  'l1',
  'l2',
}

enum FontVarinat {
  'saoTorpes',
  'poppins',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  font?: keyof typeof FontVarinat;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType = 'p'>({
  as,
  children,
  className,
  font = 'poppins',
  variant = 'b2',
  ...rest
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === 'k0' && ['text-4xl font-medium'],
          variant === 'j0' && ['text-5xl font-semibold'],
          variant === 'j1' && ['text-4xl font-bold'],
          variant === 'j2' && ['text-3xl font-bold'],
          variant === 'h1' && ['text-2xl font-semibold'],
          variant === 'h2' && ['text-xl font-semibold'],
          variant === 'h3' && ['text-lg font-semibold'],
          variant === 'h4' && ['text-base font-bold'],
          variant === 'h5' && ['text-base font-semibold'],
          variant === 'h6' && ['text-sm font-semibold'],
          variant === 's0' && ['text-xl font-medium'],
          variant === 's1' && ['text-lg font-medium'],
          variant === 's2' && ['text-base font-medium'],
          variant === 's3' && ['text-sm font-medium'],
          variant === 's4' && ['text-xs font-medium'],
          variant === 'b1' && ['text-lg'],
          variant === 'b2' && ['font-primary text-base'],
          variant === 'b4' && ['font-primary text-base font-light'],
          variant === 'b3' && ['text-sm font-normal'],
          variant === 'b3' && ['text-sm font-light'],
          variant === 'c0' && ['text-xs font-light'],
          variant === 'c1' && ['text-xs'],
          variant === 'c2' && ['text-[11px] leading-[14px] font-medium'],
        ],
        [
          font === 'saoTorpes' && ['font-primary'],
          font === 'poppins' && ['font-secondary'],
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
