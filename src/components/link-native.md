# `<Link>` `(React Native)`

> NOTE
>
> 这是 `<Link>` 的 React Native 版本。要查看Web版，[请点击此处](https://baimingxuan.github.io/react-router6-doc/components/link)。

类型声明

```ts
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps extends TouchableHighlightProps {
  children?: React.ReactNode;
  onPress?(event: GestureResponderEvent): void;
  replace?: boolean;
  state?: any;
  to: To;
}
```

`<Link>` 是一种元素，用户可以通过点击它导航到另一个视图，类似于 `<a>` 元素在网络应用中的工作方式。在 `react-router-native` 中， `<Link>` 会呈现 `TouchableHighlight` 。要覆盖默认样式和行为，请参阅[`TouchableHighlight`的属性参考文档](https://reactnative.dev/docs/touchablehighlight#props)。

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