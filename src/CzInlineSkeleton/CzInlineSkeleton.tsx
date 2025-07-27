import mergeProps from '@cozka/react-merge/mergeProps';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import styledSkeleton from '../styledSkeleton';
import { CzInlineSkeleton } from './types';

const CzSpanSkeleton = styledSkeleton('span');
const CzHiddenSpan = styled('span')({
  visibility: 'hidden',
});

const CzInlineSkeleton = forwardRef<HTMLDivElement, CzInlineSkeleton>(
  (props, ref) => {
    const { children, ...rest } = props;
    const skeletonProps = mergeProps(
      { ref, className: 'cz-inlineskeleton' },
      rest,
    );
    return (
      <CzSpanSkeleton {...skeletonProps}>
        <CzHiddenSpan>{children}</CzHiddenSpan>
      </CzSpanSkeleton>
    );
  },
);
CzInlineSkeleton.displayName = 'CzInlineSkeleton';
export default CzInlineSkeleton;
