# `useLinkPressHandler`

类型声明

```javascript
declare function useLinkPressHandler(
  to: To,
  options?: {
    replace?: boolean;
    state?: any;
  }
): (event: GestureResponderEvent) => void;
```

react-router-native`对应的,`useLinkClickHandler`返回自定义导航`

`useLinkPressHandler`的按下事件处理程序。`<Link>`

```javascript
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