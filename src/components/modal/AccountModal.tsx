import * as React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import { PiSignOutBold } from 'react-icons/pi';
import { RiSendPlaneLine } from 'react-icons/ri';
import {
  TbChevronsDownLeft,
  TbScan,
  TbSquareRoundedPlus,
} from 'react-icons/tb';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import Topup from '@/components/modal/opsi/Topup';
import Withdraw from '@/components/modal/opsi/Withdraw';
import Typography from '@/components/typography/Typography';
import useAuthStore from '@/store/useAuthStore';

type ModalReturnType = {
  openModal: () => void;
};

const AccountOptions = [
  {
    icon: TbSquareRoundedPlus,
    label: 'Isi Saldo',
  },
  {
    icon: TbChevronsDownLeft,
    label: 'Tarik Saldo',
  },
  {
    icon: RiSendPlaneLine,
    label: 'Kirim Saldo',
  },
  {
    icon: TbScan,
    label: 'Pindai QR',
  },
];

const Account = () => {
  const [option, setOption] = React.useState(-1);
  const user = useAuthStore.useUser();
  const logout = useAuthStore((state) => state.logout);

  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between border border-base-subtle rounded p-4'>
        <div className='flex items-center gap-x-2.5'>
          <BsPersonFill size={40} />
          <div>
            <div className='flex items-center gap-x-2'>
              <span className='text-lg'>{user?.nama} </span>
              <Typography variant='s4'>(+{user?.no_telp})</Typography>
            </div>
            <Typography variant='s4' className='text-gray-400'>
              {user?.email}
            </Typography>
          </div>
        </div>
        <Button onClick={logout} icon={PiSignOutBold}></Button>
      </div>
      <div className='space-y-4'>
        <div className='flex items-center gap-x-3.5 text-hover-blue border border-base-subtle p-4'>
          <div className='bg-slate-100 p-2 rounded-full'>
            <FaMoneyBillWaveAlt size={25} />
          </div>
          <div className='flex items-center gap-x-1'>
            <div className='flex items-start h-6'>
              <Typography variant='b3' className=''>
                Rp
              </Typography>
            </div>
            <Typography variant='h1'>{user?.saldo}</Typography>
          </div>
        </div>
        {(option === -1 || option === 2 || option === 3) && (
          <div className='grid grid-cols-2 gap-4 border border-base-subtle rounded'>
            {AccountOptions.map(({ label, icon: Icon }, index) => (
              <button
                key={index}
                onClick={() => setOption(index)}
                className='flex flex-col justify-center items-center gap-y-2 px-2 py-3 text-gray-400 hover:bg-base-yellow rounded hover:text-base-dark border-none outline-none transition-colors duration-100'
              >
                <Icon size={25} />
                <Typography>{label}</Typography>
              </button>
            ))}
          </div>
        )}
        {option === 0 && <Topup setOption={setOption} />}
        {option === 1 && <Withdraw setOption={setOption} />}
      </div>
    </section>
  );
};

export default function AccountModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title>
        <Modal.Section>
          <Account />
        </Modal.Section>
        <Modal.Section></Modal.Section>
      </Modal>
    </>
  );
}
