import proxyStyle from '@cozka/react-style-proxy';
import createReactElement from '@cozka/react-utils/createReactElement';
import ensureComponent from '@cozka/react-utils/ensureComponent';
import transformContent from '@cozka/react-utils/transformContent';
import { cloneElement, ElementType, forwardRef } from 'react';
import { LAYOUT_PROPS_KEYS } from './_constants';
import createLayoutStyle from './createLayoutStyle';
import { LayoutProps } from './layouts';
import { WidthLayoutOptions } from './types';
import {jsx} from 'react/jsx-runtime';

/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withSkeleton<P = {}, T = unknown>(
  Component: ElementType<P>,
  options: WidthLayoutOptions = {},
) {
  const Comp = ensureComponent(Component);
  const name = Comp.displayName ?? 'unknown';
  const {
    displayName = `withLayout(${name})`,
    jsxRuntime = jsx,
    ...opts
  } = options;
  /**
   * レイアウト機能を追加したコンテナー
   */
  const Layout = forwardRef<T, P & LayoutProps>((props, ref) => {
    const { containerStyle, childStyle } = createLayoutStyle(props);
    const { children, ...rest } = props;
    // restからlayout用のプロパティを削除
    for (const key in LAYOUT_PROPS_KEYS) {
      delete rest[key];
    }
    // コンテナーのスタイル
    const containerProps = proxyStyle(rest, containerStyle, opts);
    // 子要素のスタイル
    const styledChildren =
      childStyle == null
        ? children
        : transformContent(children, (child) => {
            if (typeof child === 'string' || typeof child === 'number') {
              return child;
            } else {
              return cloneElement(
                child,
                proxyStyle(child.props, childStyle, opts),
              );
            }
          });

    return jsxRuntime(Component, {
      ref,
      ...(containerProps as P),
      children: styledChildren,
    });
  });
  Layout.displayName = displayName;
  return Layout;
}
