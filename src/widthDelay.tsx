
/**
 * コンテナーのレイアウト機能を追加するHOC
 * @param Component コンポーネント
 * @param options オプション
 * @returns
 */
export default function withDelay<P = {}, T = unknown>(
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
