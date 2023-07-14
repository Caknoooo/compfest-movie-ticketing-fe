import { useMutation, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/toast/useMutationToast';
import api from '@/libs/axios';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { GetMeResponse } from '@/types/auth';
import { BankOption, PostTopUpForm, TopUpForm } from '@/types/wallet';

function convertStringToNumber(data: TopUpForm): {
  bank_id: number;
  jumlah: number;
} {
  return {
    ...data,
    bank_id: parseInt(data.bank_id),
  };
}

export default function Topup({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<number>>;
}) {
  const login = useAuthStore.useLogin();
  const user = useAuthStore.useUser();
  //#region  //*=========== fetch bank ===========
  const url = `${process.env.NEXT_PUBLIC_API_PRODUCTION_URL}/seeder`;
  const { data: opsiBank } = useQuery<ApiReturn<BankOption>>([url]);
  const opsi: { value: string; label: string }[] =
    opsiBank?.data.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    })) ?? [];
  //#endregion  //*======== fetch bank ===========

  //#region  //*=========== option 1 (isi saldo) ===========
  const methods = useForm<TopUpForm>({
    mode: 'onChange',
  });
  const { handleSubmit: handleTopUp } = methods;
  const { mutateAsync: topup, isLoading: topupIsLoading } = useMutationToast<
    ApiReturn<undefined>,
    PostTopUpForm
  >(useMutation((data) => api.post('/topup', data)));
  const onSubmitTopUp = (data: TopUpForm) => {
    const postData = convertStringToNumber(data);
    topup(postData).then(() => {
      setOption(-1);
      api.get<ApiReturn<GetMeResponse>>('/user/me').then((res) => {
        login({
          id: res.data.data.id,
          nama: res.data.data.nama,
          email: res.data.data.email,
          no_telp: res.data.data.no_telp,
          age: res.data.data.age,
          role: res.data.data.role,
          saldo: res.data.data.saldo,
          token: user?.token ?? '',
        });
      });
    });
  };
  //#endregion  //*======== option 1 (isi saldo) ===========
  return (
    <div className='space-y-4 p-4 border border-base-subtle'>
      <Typography variant='s0' className='text-base-yellow'>
        Top Up Saldo
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleTopUp(onSubmitTopUp)} className='space-y-2.5'>
          <Input
            id='jumlah'
            label='Jumlah'
            validation={{
              required: 'Jumlah top up tidak boleh kosong',
              valueAsNumber: true,
            }}
            placeholder='30000'
            leftIcon='Rp'
          />
          <SearchableSelectInput
            id='bank_id'
            label='Opsi Bank'
            defaultValue='male'
            options={opsi}
            className='mb-6'
          />
          <div className='flex items-center gap-x-2.5'>
            <Button
              className='w-full'
              variant='dark'
              type='button'
              onClick={() => setOption(-1)}
            >
              Batal
            </Button>
            <Button className='w-full' type='submit' isLoading={topupIsLoading}>
              Top Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
