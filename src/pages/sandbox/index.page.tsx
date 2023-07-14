import { SiThemoviedatabase } from 'react-icons/si';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import ExampleModal from '@/components/modal/ExampleModal';
import useDialog from '@/hooks/useDialog';

export default function Sandbox() {
  const dialog = useDialog();

  const openSuccess = () => {
    dialog({
      title: 'Success title',
      description: 'Success description whatever you want',
      submitText: 'Hurray',
      variant: 'success',
      catchOnCancel: true,
    });
  };
  return (
    <Layout>
      <main className='min-h-screen bg-base-dark '>
        <section className='flex items-center justify-center min-h-screen'>
          <SiThemoviedatabase size={1000} color='#fedd95' />
        </section>
        <section className='space-y-6 text-center'>
          <h1 className='font-secondary text-3xl font-bold'>Sandbox</h1>
          <div className='flex flex-wrap justify-center gap-4'>
            <ButtonLink href='/sandbox/button' size='base'>
              Button
            </ButtonLink>
            <ButtonLink href='/sandbox/button' size='base' variant='secondary'>
              Button
            </ButtonLink>
            <ButtonLink href='/sandbox/button' size='base' variant='tertiary'>
              Button
            </ButtonLink>
            <ExampleModal>
              {({ openModal }) => (
                <Button onClick={openModal}>Open Modal</Button>
              )}
            </ExampleModal>
            <Button onClick={openSuccess}>Success Alert</Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
