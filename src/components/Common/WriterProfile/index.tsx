import { Writer } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './WriterProfile.module.scss';
import GenerationBadge from '../GenerationBadge';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';

interface WriterProfileProps {
  writer: Writer;
  createdAt?: string;
}

const cn = classNames.bind(styles);

export default function WriterProfile({
  writer,
  createdAt,
}: WriterProfileProps) {
  const router = useRouter();
  const { id: memberId, nickname, profileImageUrl, generation } = writer;

  const { checkMemberStatus } = useFetchMemberStatus();

  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={40}
        height={40}
        onClick={(event) => {
          event.stopPropagation();
          checkMemberStatus(() => router.push(`/profile?memberId=${memberId}`));
        }}
      />
      <div className={cn('info')}>
        <button
          type="button"
          className={cn('nickname')}
          onClick={(event) => {
            event.stopPropagation();
            checkMemberStatus(() =>
              router.push(`/profile?memberId=${memberId}`),
            );
          }}
        >
          {nickname}
        </button>
        <GenerationBadge generationInfo={generation} />
      </div>
      <span className={cn('created-at')}>{createdAt}</span>
    </div>
  );
}
