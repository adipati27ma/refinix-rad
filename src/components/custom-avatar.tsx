import { getNameInitials } from '@/utilities';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';

type Props = AvatarProps & {
  name?: string;
  styles?: React.CSSProperties;
};

const CustomAvatar = ({ name, styles, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name ? name : "Adipati Alamsyah's avatar"}
      size="small"
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        ...styles,
      }}
      {...rest}
    >
      {getNameInitials(name || 'Adipati Alamsyah')}
    </AntdAvatar>
  );
};

export default CustomAvatar;
