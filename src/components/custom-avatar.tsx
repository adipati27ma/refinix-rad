import { Avatar as AntdAvatar, AvatarProps } from 'antd';

type Props = AvatarProps & {
  name: string;
  style?: React.CSSProperties;
};

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={`Adipati Alamsyah's avatar`}
      size="small"
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
      }}
    >
      {name}
    </AntdAvatar>
  );
};

export default CustomAvatar;
