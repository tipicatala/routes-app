import s from './style.module.scss';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <>
        <div className={s.error}>404</div>
        <div className={s.Oops}>Oops! Page not found</div>
        <div className={s.notFound}>
          This page doesn’t exist or was removed.\nWe recommend returning to the home page.
        </div>
        <div className={s.back} onClick={() => (window.location.href = '/')}>
          Back to home
        </div>
      </>
    </div>
  );
};

export default NotFound;
