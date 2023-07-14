import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/libs/clsxm';

export enum ButtonVariant {
  'primary',
  'secondary',
  'danger',
  'tertiary',
  'plain',
  'neutral',
  'blue',
  'dark',
}

enum ButtonSize {
  'small',
  'base',
  'large',
}

export type ButtonProps = {
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  isLoading?: boolean;
  icon?: IconType;
  leftIcon?: IconType;
  rightIcon?: IconType;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
  rounded?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      rounded,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center justify-center rounded-md shadow-sm',
          'focus:outline-none focus-visible:outline',
          'font-medium transition-colors duration-75',
          'disabled:cursor-not-allowed',
          rounded && 'rounded-full',
          [
            size === 'small' && [
              'min-h-[1.75rem] md:min-h-[2rem]',
              'gap-1 px-4 py-1.5 text-xs md:text-sm',
              LeftIcon && 'pl-3',
              RightIcon && 'pr-3',
              Icon &&
                'min-w-[1.75rem] p-0 text-sm md:min-w-[2rem] md:text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] md:min-h-[2.5rem]',
              'gap-2 px-5 py-2 text-sm md:text-base',
              LeftIcon && 'pl-4',
              RightIcon && 'pr-4',
              Icon &&
                'min-w-[2.25rem] p-0 text-base md:min-w-[2.5rem] md:text-lg',
            ],
            size === 'large' && [
              'min-h-[2.75rem] md:min-h-[3rem]',
              'gap-3 px-6 py-2.5 text-base',
              LeftIcon && 'pl-4.5',
              RightIcon && 'pr-4.5',
              Icon &&
                'min-w-[2.75rem] p-0 text-[19px] md:min-w-[3rem] md:text-[22px]',
            ],
          ],
          [
            variant === 'primary' && [
              'bg-base-yellow text-base-dark',
              'hover:bg-hover-yellow disabled:bg-hover-yellow',
            ],
            variant === 'secondary' && [
              'bg-base-green text-base-dark',
              'hover:bg-hover-green disabled:bg-hover-green',
            ],
            variant === 'tertiary' && [
              'bg-base-pink text-base-dark',
              'hover:bg-hover-pink disabled:bg-hover-pink',
            ],
            variant === 'plain' && [
              'bg-transparent text-white',
              'hover:bg-text-gray-100 disabled:text-gray-200',
            ],
            variant === 'danger' && [
              'bg-base-red text-base-dark',
              'hover:bg-hover-red disabled:bg-hover-red',
            ],
            variant === 'neutral' && [
              'bg-base-gray text-white',
              'hover:bg-base-yellow disabled:bg-hover-gray hover:text-base-dark',
            ],
            variant === 'dark' && [
              'bg-base-gray text-white',
              'hover:bg-hover-gray disabled:bg-hover-gray hover:text-slate-300',
            ],
            variant === 'blue' && [
              'bg-base-blue text-base-dark',
              'hover:bg-hover-blue disabled:bg-hover-blue',
            ],
          ],
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base-dark',
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {Icon && <Icon className={clsxm(iconClassName)} />}
        {LeftIcon && !Icon && <LeftIcon className={clsxm(leftIconClassName)} />}
        {!Icon && (
          <div className={clsxm('font-secondary', textClassName)}>
            {children}
          </div>
        )}
        {RightIcon && !Icon && (
          <RightIcon className={clsxm(rightIconClassName)} />
        )}
      </button>
    );
  },
);

export default Button;
