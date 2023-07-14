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
import { BankOption, PostTarikForm, TarikForm } from '@/types/wallet';

function convertStringToNumber(data: TarikForm): {
  bank_id: number;
  jumlah_penarikan: number;
  no_rek: string;
} {
  return {
    ...data,
    jumlah_penarikan: parseInt(data.jumlah_penarikan),
    bank_id: parseInt(data.bank_id),
  };
}

export default function Withdraw({
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

  //#region  //*=========== option 1 (tarik saldo) ===========
  const methods = useForm<TarikForm>({
    mode: 'onChange',
  });
  const { handleSubmit: handleTarik } = methods;
  const { mutateAsync: tarik, isLoading: tarikIsLoading } = useMutationToast<
    ApiReturn<undefined>,
    PostTarikForm
  >(useMutation((data) => api.post('/with-drawal', data)));
  const onSubmitTarik = (data: TarikForm) => {
    const postData = convertStringToNumber(data);
    tarik(postData).then(() => {
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
  //#endregion  //*======== option 1 (tarik saldo) ===========
  return (
    <div className='space-y-4 p-4 border border-base-subtle'>
      <Typography variant='s0' className='text-base-yellow'>
        Tarik Saldo
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleTarik(onSubmitTarik)} className='space-y-2.5'>
          <Input
            id='jumlah_penarikan'
            label='Jumlah'
            validation={{ required: 'Jumlah saldo tidak boleh kosong' }}
            placeholder='30000'
            leftIcon='Rp'
          />
          <Input
            id='no_rek'
            label='No. Rekening'
            validation={{ required: 'No. rekening tidak boleh kosong' }}
            placeholder='5839453859'
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
            <Button className='w-full' type='submit' isLoading={tarikIsLoading}>
              Tarik
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
