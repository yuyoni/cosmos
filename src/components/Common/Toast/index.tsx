import { RootState } from '@/redux/store';
import { hideToast } from '@/redux/toastSlice';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Toast.module.scss';
import { CompleteIcon, WarnIcon } from '../IconCollection';

const cn = classNames.bind(styles);
/**
 * @param {string} text - text 속성은 토스트에 표시할 텍스트
 * @param { React.ReactNode} icon - icon 속성은 토스트에 표시할 아이콘
 * @param {boolean} visible - visible 속성은 토스트의 가시성을 결정
 */

export default function Toast() {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.toast.visible);
  const type = useSelector((state: RootState) => state.toast.type);
  const text = useSelector((state: RootState) => state.toast.text);

  const hideTimeOut = setTimeout(() => {
    dispatch(hideToast());
  }, 3000);

  useEffect(() => {
    clearTimeout(hideTimeOut);
  }, [dispatch]);

  return (
    visible && (
      <div className={cn('toast-container')}>
        {type === 'check' ? (
          <CompleteIcon fill="#0ACF83" />
        ) : (
          <WarnIcon fill="#FFC700" />
        )}
        <span className={cn('toast-message')}>{text}</span>
      </div>
    )
  );
}
