import clsx from 'clsx';
import get from 'lodash.get';
import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import Typography from '@/components/typography/Typography';

export type PasswordInputProps = {
  /** Input label */
  label: string | null;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function PasswordInput({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError,
  validation,
  disabled,
  containerClassName,
  ...rest
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const withLabel = label !== null;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            'flex w-full rounded-lg shadow-sm',
            'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
            'px-4 text-base-dark',
            'border-gray-300 focus:border-base-yellow focus:ring-base-yellow focus:outline-base-yellow',
            (readOnly || disabled) &&
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        <button
          onClick={togglePassword}
          type='button'
          className='absolute top-1/2 right-0 mr-3 flex -translate-y-1/2 items-center rounded-lg p-1 focus:outline-none focus:ring focus:ring-primary-500'
        >
          {showPassword ? (
            <HiEyeOff className='cursor-pointer text-xl text-gray-400 hover:text-typo-secondary' />
          ) : (
            <HiEye className='cursor-pointer text-xl text-gray-400 hover:text-typo-secondary' />
          )}
        </button>
      </div>
      {helperText && (
        <Typography variant='c1' color='secondary' className='mt-1.5'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography
          variant='c1'
          color='danger'
          className='mt-1.5 text-hover-pink'
        >
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}
