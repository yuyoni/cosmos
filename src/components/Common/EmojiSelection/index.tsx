import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_CODE } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import EmojiButton from '../EmojiButton';
import styles from './EmojiSelection.module.scss';

interface EmojiSelectionProps {
  emojiList: EmojiType[]; // 내가 눌렀는지 확인용
  isVisible?: boolean; // 이모지 표시 눌렀는지 아닌지에 따라 보이고 안보이는 상태
  setIsEmojiContainerVisible: (args: boolean) => void;
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void; // 추가/삭제 요청
  setCurrentEmojiList: (args: EmojiType[]) => void;
  isPending?: boolean; // 펜딩 상태
}

const cn = classNames.bind(styles);

export default function EmojiSelection({
  emojiList,
  isVisible,
  setIsEmojiContainerVisible,
  handleEmojiClick,
  setCurrentEmojiList,
  isPending,
}: EmojiSelectionProps) {
  const filteredCurrentEmojiList = emojiList.filter(
    (emoji) => emoji.emojiCount !== 0,
  );
  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <div
          className={cn('emoji-container', {
            left: filteredCurrentEmojiList.length <= 1,
            middle:
              filteredCurrentEmojiList.length >= 2 &&
              filteredCurrentEmojiList.length <= 3,
            right: filteredCurrentEmojiList.length >= 4,
          })}
        >
          {EMOJI_CODE.map((emojiCode) => (
            <EmojiButton
              key={emojiCode}
              setIsEmojiContainerVisible={setIsEmojiContainerVisible}
              isClickVisible={false}
              emojiCode={emojiCode}
              emojiList={emojiList}
              setCurrentEmojiList={setCurrentEmojiList}
              handleEmojiClick={handleEmojiClick}
              isPending={isPending}
            />
          ))}
        </div>
      </div>
    )
  );
}
