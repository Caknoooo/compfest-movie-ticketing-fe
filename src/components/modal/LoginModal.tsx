import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import PasswordInput from '@/components/form/PasswordInput';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';
import REGEX from '@/constant/regex';
import useMutationToast from '@/hooks/toast/useMutationToast';
import api from '@/libs/axios';
import { setToken } from '@/libs/cookies';
import { formatDateForAPI } from '@/libs/date';
import useAuthStore from '@/store/useAuthStore';
import { ApiResponse, ApiReturn } from '@/types/api';
import {
  GetMeResponse,
  LoginForm,
  LoginResponse,
  PostSignupForm,
  SignupForm,
  SignupResponse,
} from '@/types/auth';

type ModalReturnType = {
  openModal: () => void;
};

type LoginModalProps = {
  children: (props: ModalReturnType) => JSX.Element;
};

function convertDateToString(data: SignupForm): {
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  tanggal_lahir: string;
} {
  return {
    ...data,
    tanggal_lahir: formatDateForAPI(data.tanggal_lahir),
  };
}

const Auth = ({ closeModal }: { closeModal: () => void }) => {
  const login = useAuthStore.useLogin();
  const [auth, setAuth] = React.useState(true);

  const loginMethods = useForm<LoginForm>({
    mode: 'onChange',
  });
  const { handleSubmit: handleLoginSubmit } = loginMethods;

  const signupMethods = useForm<SignupForm>({
    mode: 'onChange',
  });
  const { handleSubmit: handleSignupSubmit } = signupMethods;

  const { mutateAsync: loginUser, isLoading: loginIsLoading } =
    useMutationToast<ApiResponse<ApiReturn<LoginResponse>>, LoginForm>(
      useMutation((data) => api.post('/user/login', data)),
    );

  const { mutateAsync: signup, isLoading: signupIsLoading } = useMutationToast<
    ApiReturn<SignupResponse>,
    PostSignupForm
  >(useMutation((data) => api.post('/user', data)));

  const onSubmitLogin = async (data: LoginForm) => {
    loginUser(data).then((res) => {
      const { token } = res.data.data;
      setToken(token);
      api
        .get<ApiReturn<GetMeResponse>>('/user/me')
        .then((res) => {
          login({
            id: res.data.data.id,
            nama: res.data.data.nama,
            email: res.data.data.email,
            no_telp: res.data.data.no_telp,
            age: res.data.data.age,
            role: res.data.data.role,
            saldo: res.data.data.saldo,
            token: token,
          });
        })
        .then(() => closeModal());
    });
  };

  const onSubmitSignup = (data: SignupForm) => {
    const postData = convertDateToString(data);
    signup(postData).then(() => setAuth(true));
  };

  return (
    <div>
      {auth ? (
        <FormProvider {...loginMethods}>
          <form
            onSubmit={handleLoginSubmit(onSubmitLogin)}
            className='space-y-8'
          >
            <div className='space-y-2.5'>
              <Input
                id='email'
                label='Email'
                placeholder='Email'
                validation={{
                  required: 'Email tidak boleh kosong',
                  pattern: {
                    value: REGEX.EMAIL,
                    message: 'Email tidak valid',
                  },
                }}
              />
              <PasswordInput
                id='password'
                label='Password'
                placeholder='Password'
                validation={{
                  required: 'Password tidak boleh kosong',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
                  },
                }}
              />
            </div>
            <div className='space-y-4'>
              <Button
                type='submit'
                size='large'
                isLoading={loginIsLoading}
                className='w-full font-semibold'
              >
                Masuk
              </Button>
              <Typography variant='b3' className='text-center text-gray-300'>
                Belum punya akun?{' '}
                <button
                  type='button'
                  onClick={() => setAuth(!auth)}
                  className='text-base-yellow hover:text-hover-yellow'
                >
                  daftar di sini
                </button>
              </Typography>
            </div>
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...signupMethods}>
          <form
            onSubmit={handleSignupSubmit(onSubmitSignup)}
            className='space-y-8'
          >
            <div className='space-y-2.5'>
              <Input
                id='nama'
                label='Nama'
                placeholder='Nama'
                validation={{ required: 'Nama tidak boleh kosong' }}
              />
              <Input
                id='no_telp'
                label='No. Telepon'
                placeholder='Contoh : 62812345678'
                validation={{
                  required: 'Nomor telepon tidak boleh kosong',
                  pattern: {
                    value: REGEX.PHONE_NUMBER,
                    message: 'Nomor telepon tidak valid',
                  },
                }}
              />
              <DatePicker
                id='tanggal_lahir'
                label='Tanggal Lahir'
                validation={{
                  required: 'Date must be filled',
                  valueAsDate: true,
                }}
                placeholder='dd/mm/yyyy'
              />
              <Input
                id='email'
                label='Email'
                placeholder='Email'
                validation={{
                  required: 'Email tidak boleh kosong',
                  pattern: {
                    value: REGEX.EMAIL,
                    message: 'Email tidak valid',
                  },
                }}
              />
              <PasswordInput
                id='password'
                label='Password'
                placeholder='Password'
                validation={{
                  required: 'Password tidak boleh kosong',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
                  },
                }}
              />
            </div>
            <div className='space-y-4'>
              <Button
                type='submit'
                size='large'
                isLoading={signupIsLoading}
                className='w-full font-semibold'
              >
                Daftar
              </Button>
              <Typography variant='b3' className='text-center text-gray-300'>
                Sudah punya akun?{' '}
                <button
                  type='button'
                  onClick={() => setAuth(!auth)}
                  className='text-base-yellow hover:text-hover-yellow'
                >
                  masuk di sini
                </button>
              </Typography>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default function LoginModal({ children }: LoginModalProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title='Welcome Back!'>
        <Modal.Section>
          <Auth closeModal={closeModal} />
        </Modal.Section>
        <Modal.Section></Modal.Section>
      </Modal>
    </>
  );
}
