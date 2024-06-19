import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const NtfcBellYellowSvg: React.FC = () => {
  return (
    <Svg
      width={24}
      height={24}
      fill='none'
    >
      <Path
        fill='#F5B715'
        d='M0 0h24v24H0z'
      />
      <Path
        fill='#fff'
        fillRule='evenodd'
        d='M7.512 11.325c-.148.936-.3 1.902-.527 2.798-.168.663-.482 1.428-.775 2.07-.176.386.113.807.483.807h10.614c.37 0 .66-.421.483-.807-.293-.642-.607-1.407-.775-2.07-.227-.896-.38-1.862-.527-2.798l-.068-.426c-.173-1.08-.355-2.105-.652-2.998-.296-.892-.694-1.608-1.269-2.103C13.935 5.313 13.152 5 12 5c-1.152 0-1.935.313-2.5.798-.575.495-.972 1.211-1.268 2.103-.297.893-.48 1.917-.652 2.998l-.068.426ZM8.848 5.04C9.625 4.373 10.652 4 12 4s2.375.373 3.152 1.04c.765.659 1.24 1.564 1.565 2.545.326.98.518 2.079.69 3.156l.07.432c.148.94.293 1.856.508 2.704.145.574.428 1.274.715 1.9.456 1-.241 2.223-1.393 2.223H6.693C5.54 18 4.844 16.776 5.3 15.778c.286-.627.57-1.327.715-1.9.215-.849.36-1.764.509-2.705l.068-.432c.173-1.077.365-2.176.69-3.156.327-.981.8-1.886 1.566-2.545Z'
        clipRule='evenodd'
      />
      <Path
        fill='#fff'
        fillRule='evenodd'
        d='M13.5 18c0-.176-.03-.343-.085-.499l.943-.332a2.5 2.5 0 1 1-4.717 0l.944.332A1.5 1.5 0 1 0 13.5 18Z'
        clipRule='evenodd'
      />
    </Svg>
  );
};

export default NtfcBellYellowSvg;
