import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/libs/clsxm';

const TAG_SIZE = ['sm', 'base'] as const;
type TagSize = (typeof TAG_SIZE)[number];

const TAG_COLOR = [
  'DEFAULT',
  'primary',
  'secondary',
  'success',
  'danger',
  'orange',
  'warning',
  'aqua',
] as const;
type TagColor = (typeof TAG_COLOR)[number];

type TagProps = {
  children: React.ReactNode;
  size?: TagSize;
  color?: TagColor;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      color = 'DEFAULT',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={clsxm(
          [
            size === 'sm' && ['py-0.5 text-xs'],
            size === 'base' && ['py-1 text-sm'],
          ],

          //#region  //*=========== Color ===========
          color === 'DEFAULT' && 'bg-white text-base-subtle',
          color === 'primary' && 'bg-base-yellow text-base-dark',
          color === 'secondary' && 'bg-base-gray text-white',
          color === 'danger' && 'bg-base-red text-base-subtle',
          color === 'orange' && 'bg-orange-100 text-orange-700',
          color === 'warning' && 'bg-base-pink text-base-subtle ',
          color === 'success' && 'bg-base-green text-base-subtle',
          //#endregion  //*======== Color ===========
          'inline-flex items-center gap-1 rounded px-2 font-semibold',
          LeftIcon && 'pl-1.5',
          RightIcon && 'pr-1.5',
          className,
        )}
        ref={ref}
        {...rest}
      >
        {LeftIcon && (
          <div>
            <LeftIcon size='1em' className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div>
            <RightIcon size='1em' className={clsxm(rightIconClassName)} />
          </div>
        )}
      </div>
    );
  },
);

export default Tag;
