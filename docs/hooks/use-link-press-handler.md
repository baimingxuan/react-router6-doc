# `useLinkPressHandler`

类型声明

```tsx
declare function useLinkPressHandler(
  to: To,
  options?: {
    replace?: boolean;
    state?: any;
  }
): (event: GestureResponderEvent) => void;
```

" `react-router-native` " 的对应项是 " `useLinkClickHandler` "， `useLinkPressHandler` 返回一个按下事件处理程序，用于自定义 `<Link>` 导航。"

```jsx
import { TouchableHighlight } from "react-native";
import { useLinkPressHandler } from "react-router-native";

function Link({
  onPress,
  replace = false,
  state,
  to,
  ...rest
}) {
  let handlePress = useLinkPressHandler(to, {
    replace,
    state,
  });

  return (
    <TouchableHighlight
      {...rest}
      onPress={(event) => {
        onPress?.(event);
        if (!event.defaultPrevented) {
          handlePress(event);
        }
      }}
    />
  );
}
```