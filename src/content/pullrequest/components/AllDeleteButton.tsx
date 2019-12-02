/**
 * stash pull request page안에 리뷰어 전체 삭제 버튼
 *
 * @author 이강원 (caias), 이주영(juu0124)
 * @since 2019.11.05
 */

import React from 'react';

const AllDeleteButton = () => {

  const removeReviewer = (e: React.MouseEvent) => {
    e.preventDefault();
    const clearButton = document.querySelectorAll('.select2-search-choice-close');

    // stash에 미리 정의된 클릭 이벤트를 발생시켜서 삭제
    clearButton.forEach((item: HTMLButtonElement) => item.click());
  };

  return (
    <div>
      <button onClick={removeReviewer} className='aui-button'>전체 삭제</button>
    </div>
  );
};

export default AllDeleteButton;