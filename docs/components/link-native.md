# `<Link>` `(React Native)`

这是 `<Link>` 的 React Native 版本。要查看Web版，[请前往此处](https://reactrouter.com/en/main/components/link)。

类型声明

```tsx
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps extends TouchableHighlightProps {
  children?: React.ReactNode;
  onPress?(event: GestureResponderEvent): void;
  replace?: boolean;
  state?: any;
  to: To;
}
```

`<Link>` 是一个元素，用户可以通过点击它导航到另一个视图，类似于网页应用中 `<a>` 元素的工作方式。在 `react-router-native` 中， `<Link>` 渲染一个 `TouchableHighlight` 。要覆盖默认样式和行为，请参阅[`TouchableHighlight`的Props参考文档](https://reactnative.dev/docs/touchablehighlight#props)。

```jsx
import * as React from "react";
import { View, Text } from "react-native";
import { Link } from "react-router-native";

function Home() {
  return (
    <View>
      <Text>Welcome!</Text>
      <Link to="/profile">
        <Text>Visit your profile</Text>
      </Link>
    </View>
  );
}
```