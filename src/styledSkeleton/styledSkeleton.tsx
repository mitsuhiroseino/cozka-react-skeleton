import mergeProps from '@cozka/react-merge/mergeProps';
import ensureComponent from '@cozka/react-utils/ensureComponent';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ElementType, forwardRef } from 'react';
import { StyledSkeletonOptions, StyledSkeletonProps } from './types';

const pulse = keyframes`
  0% {
    background-color: rgba(128, 128, 128, 0.4);
  }
  100% {
    background-color: rgba(128, 128, 128, 0.1);
  }`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }`;

export default function styledSkeleton<P extends object, T = any>(
  Component: ElementType<P>,
  options: StyledSkeletonOptions = {},
) {
  const { borderRadius = 4, css, className, displayName } = options;
  const StyledComponent = styled(ensureComponent(Component))([
    {
      backgroundColor: 'rgba(128, 128, 128, 0.4)',
      '&.cz-variant-rounded': {
        borderRadius,
      },
      '&.cz-variant-circle': {
        borderRadius: 1000000,
      },
      '&.cz-animation-pulse': {
        animation: `${pulse} 1.2s linear infinite alternate`,
      },
      '&.cz-animation-wave': {
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: "''",
          display: 'block',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          background:
            'linerar-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: `${wave} 1.2s linear infinite`,
        },
      },
    },
    css,
  ]);

  const Skeleton = forwardRef<T, P & StyledSkeletonProps>((props, ref) => {
    const { variant = 'rounded', animation = 'pulse', ...rest } = props;
    const componentProps = mergeProps<any, T>(
      {
        className: [
          className,
          `cz-variant-${variant}`,
          `cz-animation-${animation}`,
        ],
      },
      rest,
    );

    return <StyledComponent ref={ref} {...componentProps} />;
  });

  if (displayName) {
    StyledComponent.displayName = displayName;
  }

  return Skeleton;
}
