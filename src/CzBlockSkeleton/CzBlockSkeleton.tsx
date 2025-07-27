import mergeProps from '@cozka/react-merge/mergeProps';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import styledSkeleton from 'src/styledSkeleton';
import { CzBlockSkeleton } from './types';

const CzDivSkeleton = styledSkeleton('div');
const CzHiddenDiv = styled('div')({
  visibility: 'hidden',
});

const CzBlockSkeleton = forwardRef<HTMLDivElement, CzBlockSkeleton>(
  (props, ref) => {
    const { children, ...rest } = props;
    const skeletonProps = mergeProps(
      { ref, className: 'cz-blockskeleton' },
      rest,
    );
    return (
      <CzDivSkeleton {...skeletonProps}>
        <CzHiddenDiv>{children}</CzHiddenDiv>
      </CzDivSkeleton>
    );
  },
);
CzBlockSkeleton.displayName = 'CzBlockSkeleton';
export default CzBlockSkeleton;
