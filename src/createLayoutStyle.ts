/**
 * レイアウト用のスタイルを作成する
 * @param props レイアウトプロパティ
 * @returns
 */
export default function createLayoutStyle<P extends LayoutProps = {}>(
  props: P,
) {
  const { layout, scroll, childStyle: cStyle } = props;
  // layoutを取得
  const { getContainerStyle, getChildStyle, defaultProps } = (LAYOUTS[layout] ||
    LAYOUTS.stack) as Layout;
  const argProps = { ...props };
  if (defaultProps) {
    for (const key in defaultProps) {
      if (argProps[key] === undefined) {
        argProps[key] = defaultProps[key];
      }
    }
  }
  // コンテナーのスタイル
  let containerStyle = getContainerStyle ? getContainerStyle(argProps) : null;
  if (scroll) {
    containerStyle = containerStyle || {};
    containerStyle.overflow = 'auto';
  }
  // 子要素のスタイル
  let childStyle = getChildStyle ? getChildStyle(argProps) : null;
  if (cStyle) {
    childStyle = { ...childStyle, ...cStyle };
  }
  return { containerStyle, childStyle };
}
