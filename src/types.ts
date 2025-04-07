import { StyleProxyOptions } from '@cozka/react-style-proxy';
import { ElementType, Key, ReactElement } from 'react';

export { LayoutProps } from './layouts/types';

export type WidthSkeletonOptions = StyleProxyOptions & {
  /**
   * コンポーネントに設定するdisplayName
   */
  displayName?: string;

  /**
   * jsxラインタイム
   * デフォルトは`react/jsx-runtime/jsx`または`react/jsx-runtime/jsxs`
   *
   * @param type
   * @param props
   * @param key
   * @returns
   */
  jsxRuntime?: (type: ElementType, props: unknown, key?: Key) => ReactElement;
};
