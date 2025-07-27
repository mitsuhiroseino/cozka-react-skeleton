import { Interpolation } from '@emotion/styled';

/**
 * styledSkeletonのオプション
 */
export type StyledSkeletonOptions = {
  /**
   * variant='rounded'の時の角の半径
   */
  borderRadius?: number;

  /**
   * デフォルトのスタイル
   */
  css?: Interpolation;

  /**
   * デフォルトのクラス名
   */
  className?: string;

  /**
   * 表示名
   */
  displayName?: string;
};

/**
 * styledSkeletonで作成したコンポーネントのプロパティ
 */
export type StyledSkeletonProps = {
  /**
   * スケルトンの形状
   *
   * - rounded: 角丸
   * - circle: 円
   * - sharp: 角あり
   */
  variant?: 'rounded' | 'circle' | 'sharp';

  /**
   * スケルトンのアニメーション
   *
   * - pulse: 点滅アニメーション
   * - wave: 波アニメーション
   * - none: アニメーションなし
   */
  animation?: 'pulse' | 'wave' | 'none';
};
