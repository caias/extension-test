/**
 * Slack 메세지 버튼
 *
 * @author kern86
 * @since 2019.11.26 - draft
 */
// plugins
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

// antd css
import 'antd/dist/antd.css';

// props
interface IProps {
  buttonType?: 'primary' | 'danger';
  label?: string;
  className?: string;
  style?: object;
  loading?: boolean;
  inProgress?: boolean;
  sended?: boolean;
  reset?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
}

// defaultProps
const defaultProps: IProps = {
  buttonType: 'primary',
  label: '로딩 버튼',
  className: '',
  style: {},
  loading: false,
  onClick: () => void(0),
};

const styles = {
  button: {
  },
};

const LoadingButton = (props: IProps = defaultProps): JSX.Element => {
  // props
  const {
    label,
    className,
    onClick,
    style,
    buttonType,
    reset,
  } = props;
  // state
  const [ inProgress, setProgress ] = useState(false);
  const [ sended, setSended ] = useState(false);

  useEffect(() => {
    setSended(false);
  }, [reset]);

  // 버튼 클릭시 실행
  const handleClick = () => {
    // inprogress 실행
    setProgress(true);
    onClick && onClick();

    // 인터랙션을 위해 1초 후에 해당 state 변경
    const timer = setTimeout(() => {
      setProgress(false);
      setSended(true);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <Button
      className={className}
      style={Object.assign({}, styles.button, style)}
      onClick={handleClick}
      type={buttonType}
      icon={sended ? 'check' : 'slack'}
      shape='round'
      loading={inProgress}
      disabled={sended}>
    {label}
    </Button>
  );
};

export default LoadingButton;