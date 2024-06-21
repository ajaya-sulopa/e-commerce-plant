import * as React from 'react';
import Svg, {Path, G, Defs, ClipPath} from 'react-native-svg';

const LeaveAReviewSvg: React.FC = () => {
  return (
    <Svg width={115} height={27} fill='none'>
      <Path
        fill='#23374A'
        d='M1.573 19V7.48h1.344V19H1.573Zm7.115.192c-.758 0-1.43-.17-2.016-.512a3.808 3.808 0 0 1-1.392-1.456c-.331-.619-.496-1.35-.496-2.192 0-.832.165-1.557.496-2.176.33-.63.789-1.115 1.376-1.456.597-.352 1.285-.528 2.064-.528.768 0 1.429.176 1.984.528.565.341.997.795 1.296 1.36a3.846 3.846 0 0 1 .432 2.176v.4h-6.32c.032.608.17 1.115.416 1.52.256.395.57.693.944.896.384.203.789.304 1.216.304.554 0 1.018-.128 1.392-.384.373-.256.645-.603.816-1.04h1.328a3.606 3.606 0 0 1-1.232 1.84c-.598.48-1.366.72-2.304.72Zm0-7.184c-.64 0-1.211.197-1.712.592-.491.384-.774.95-.848 1.696h4.992c-.032-.715-.278-1.275-.736-1.68-.459-.405-1.024-.608-1.696-.608Zm8.181 7.184c-.661 0-1.21-.112-1.648-.336-.437-.224-.763-.523-.976-.896a2.41 2.41 0 0 1-.32-1.216c0-.81.31-1.435.928-1.872.619-.437 1.461-.656 2.528-.656h2.144v-.096c0-.693-.181-1.216-.544-1.568-.363-.363-.848-.544-1.456-.544-.523 0-.976.133-1.36.4-.373.256-.608.635-.704 1.136h-1.376c.053-.576.245-1.061.576-1.456a3.258 3.258 0 0 1 1.264-.896 4.044 4.044 0 0 1 1.6-.32c1.11 0 1.941.299 2.496.896.565.587.848 1.37.848 2.352V19h-1.2l-.08-1.424a3.187 3.187 0 0 1-.992 1.152c-.427.31-1.003.464-1.728.464Zm.208-1.136c.512 0 .95-.133 1.312-.4a2.53 2.53 0 0 0 .848-1.04 3.24 3.24 0 0 0 .288-1.344v-.016h-2.032c-.79 0-1.35.139-1.68.416-.32.267-.48.603-.48 1.008 0 .416.15.752.448 1.008.31.245.741.368 1.296.368Zm7.8.944-3.009-7.936h1.408l2.384 6.64 2.4-6.64h1.376L26.428 19h-1.552Zm9.217.192c-.758 0-1.43-.17-2.016-.512a3.807 3.807 0 0 1-1.392-1.456c-.33-.619-.496-1.35-.496-2.192 0-.832.165-1.557.496-2.176.33-.63.79-1.115 1.376-1.456.597-.352 1.285-.528 2.064-.528.768 0 1.43.176 1.984.528a3.45 3.45 0 0 1 1.296 1.36 3.847 3.847 0 0 1 .432 2.176v.4h-6.32c.032.608.17 1.115.416 1.52.256.395.57.693.944.896.384.203.79.304 1.216.304.554 0 1.018-.128 1.392-.384.373-.256.645-.603.816-1.04h1.328a3.607 3.607 0 0 1-1.232 1.84c-.598.48-1.366.72-2.304.72Zm0-7.184c-.64 0-1.21.197-1.712.592-.49.384-.773.95-.848 1.696h4.992c-.032-.715-.278-1.275-.736-1.68-.459-.405-1.024-.608-1.696-.608Zm12.416 7.184c-.662 0-1.211-.112-1.648-.336-.438-.224-.763-.523-.976-.896a2.41 2.41 0 0 1-.32-1.216c0-.81.309-1.435.928-1.872.618-.437 1.461-.656 2.528-.656h2.144v-.096c0-.693-.182-1.216-.544-1.568-.363-.363-.848-.544-1.456-.544-.523 0-.976.133-1.36.4-.374.256-.608.635-.704 1.136h-1.376c.053-.576.245-1.061.576-1.456a3.259 3.259 0 0 1 1.264-.896 4.044 4.044 0 0 1 1.6-.32c1.109 0 1.941.299 2.496.896.565.587.848 1.37.848 2.352V19h-1.2l-.08-1.424a3.186 3.186 0 0 1-.992 1.152c-.427.31-1.003.464-1.728.464Zm.208-1.136c.512 0 .949-.133 1.312-.4.373-.267.656-.613.848-1.04a3.24 3.24 0 0 0 .288-1.344v-.016h-2.032c-.79 0-1.35.139-1.68.416-.32.267-.48.603-.48 1.008 0 .416.149.752.448 1.008.309.245.741.368 1.296.368ZM56.76 19v-7.936h1.216l.112 1.52a2.876 2.876 0 0 1 1.12-1.248c.502-.31 1.12-.464 1.856-.464v1.408h-.368c-.47 0-.901.085-1.296.256-.394.16-.71.437-.944.832-.234.395-.352.939-.352 1.632v4H56.76Zm9.084.192c-.757 0-1.43-.17-2.016-.512a3.807 3.807 0 0 1-1.392-1.456c-.33-.619-.496-1.35-.496-2.192 0-.832.165-1.557.496-2.176.33-.63.79-1.115 1.376-1.456.597-.352 1.285-.528 2.064-.528.768 0 1.43.176 1.984.528a3.45 3.45 0 0 1 1.296 1.36 3.847 3.847 0 0 1 .432 2.176v.4h-6.32c.032.608.17 1.115.416 1.52.256.395.57.693.944.896.384.203.79.304 1.216.304.555 0 1.019-.128 1.392-.384s.645-.603.816-1.04h1.328a3.607 3.607 0 0 1-1.232 1.84c-.597.48-1.365.72-2.304.72Zm0-7.184c-.64 0-1.21.197-1.712.592-.49.384-.774.95-.848 1.696h4.992c-.032-.715-.277-1.275-.736-1.68-.459-.405-1.024-.608-1.696-.608ZM73.36 19l-3.008-7.936h1.408l2.384 6.64 2.4-6.64h1.376L74.913 19H73.36Zm6.871-9.696a.943.943 0 0 1-.671-.256.943.943 0 0 1-.257-.672c0-.256.086-.47.257-.64a.943.943 0 0 1 .671-.256c.257 0 .475.085.656.256.182.17.272.384.272.64 0 .267-.09.49-.272.672a.923.923 0 0 1-.656.256ZM79.561 19v-7.936h1.343V19h-1.343Zm7.252.192c-.758 0-1.43-.17-2.016-.512a3.809 3.809 0 0 1-1.392-1.456c-.331-.619-.496-1.35-.496-2.192 0-.832.165-1.557.496-2.176.33-.63.789-1.115 1.376-1.456.597-.352 1.285-.528 2.064-.528.768 0 1.429.176 1.984.528.565.341.997.795 1.296 1.36a3.846 3.846 0 0 1 .432 2.176v.4h-6.32c.032.608.17 1.115.416 1.52.256.395.57.693.944.896.384.203.789.304 1.216.304.554 0 1.018-.128 1.392-.384.373-.256.645-.603.816-1.04h1.328a3.606 3.606 0 0 1-1.232 1.84c-.598.48-1.366.72-2.304.72Zm0-7.184c-.64 0-1.211.197-1.712.592-.491.384-.774.95-.848 1.696h4.992c-.032-.715-.278-1.275-.736-1.68-.459-.405-1.024-.608-1.696-.608ZM93.64 19l-2.32-7.936h1.344l1.68 6.224 1.856-6.224h1.52l1.873 6.224 1.664-6.224h1.36L100.298 19h-1.377l-1.952-6.544L95.019 19H93.64Z'
      />
      <G clipPath='url(#a)'>
        <Path
          stroke='#23374A'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='m110 18 4-4-4-4'
        />
      </G>
      <Defs>
        <ClipPath id='a'>
          <Path fill='#fff' d='M109 9h6v10h-6z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LeaveAReviewSvg;