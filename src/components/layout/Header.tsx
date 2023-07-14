import Link from 'next/link';
import * as React from 'react';
import { BiSolidCameraMovie, BiSolidWallet } from 'react-icons/bi';
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiSearch, FiXCircle } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import { RiAccountCircleFill, RiHome6Fill } from 'react-icons/ri';
import { SiThemoviedatabase } from 'react-icons/si';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import AccountModal from '@/components/modal/AccountModal';
import LoginModal from '@/components/modal/LoginModal';
import Typography from '@/components/typography/Typography';
import clsxm from '@/libs/clsxm';
import useAuthStore from '@/store/useAuthStore';

type HeaderProps = {
  filter: string;
  onFilterChange: (value: string) => void;
  onClearFilter: () => void;
};

const Header: React.FC<HeaderProps> = ({
  filter,
  onClearFilter,
  onFilterChange,
}) => {
  const user = useAuthStore.useUser();
  const [isShift, setIsShift] = React.useState(false);

  const handleScroll = () => {
    setIsShift(window.scrollY >= 10);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const links = [
    { label: 'Home', href: '/', icon: RiHome6Fill },
    { label: 'Movie', href: '/', icon: BiSolidCameraMovie },
    { label: 'Wallet', href: '/wallet', icon: BiSolidWallet },
    { label: 'Ticket', href: '/ticket', icon: HiOutlineTicket },
  ];

  const socials = [
    { href: '/', icon: FaGithub },
    { href: '/', icon: FaInstagram },
    { href: '/', icon: FaDiscord },
    { href: '/', icon: FaTwitter },
  ];

  return (
    <header
      className={clsxm(
        'fixed top-0 w-full z-40 box-border flex justify-between items-center header-padding',
        isShift && ['backdrop-blur bg-base-dark bg-opacity-50'],
      )}
    >
      <div className='w-full nav-padding'>
        <div className='text-white flex items-center gap-x-4'>
          <SiThemoviedatabase size={32} color='#fedd95' />
          <Typography variant='s1'>Themoviedb</Typography>
        </div>
        <div className={clsxm('relative mt-1 self-start')}>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <FiSearch className='text-lg text-base-gray' />
          </div>
          <input
            type='text'
            onChange={(e) => onFilterChange(e.target.value)}
            value={filter ?? ''}
            className={clsxm(
              'flex w-full rounded-lg shadow-sm text-[15px]',
              'min-h-[2.25rem] py-0 px-9 md:min-h-[2.5rem]',
              'border-gray-300 focus:border-base-yellow focus:ring-base-yellow focus:outline-none',
            )}
            placeholder='Search...'
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <button type='button' className='p-1' onClick={onClearFilter}>
              <FiXCircle className='text-xl text-base-gray' />
            </button>
          </div>
        </div>
        <ul className='social-padding'>
          {socials.map(({ href, icon: Icon }, index) => (
            <ButtonLink
              key={index}
              rounded
              href={href}
              variant={
                index === 0
                  ? 'tertiary'
                  : index === 1
                  ? 'danger'
                  : index === 2
                  ? 'secondary'
                  : 'blue'
              }
              icon={Icon}
            />
          ))}
        </ul>
        <ul className='nav-cont'>
          {links.map(({ label, href, icon: Icon }, index) => (
            <li key={index} className=''>
              <Link href={href} className='nav-item group'>
                <Icon className='nav-icon' />
                <span className='nav'>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <AccountModal>
          {({ openModal }) => (
            <Button
              rounded
              onClick={openModal}
              leftIcon={RiAccountCircleFill}
              leftIconClassName='text-4xl'
              className='py-1 pr-6'
            >
              <div className='flex flex-col items-start'>
                <Typography variant='b3'>{user?.nama}</Typography>
                <Typography variant='c2' color='secondary'>
                  {user?.role}
                </Typography>
              </div>
            </Button>
          )}
        </AccountModal>
      ) : (
        <LoginModal>
          {({ openModal }) => <Button onClick={openModal}>Masuk</Button>}
        </LoginModal>
      )}
    </header>
  );
};

export default Header;
