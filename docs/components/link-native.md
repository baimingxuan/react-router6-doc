# `<Link>` `(React Native)`

类型声明

```javascript
declare function Link(props: LinkProps): React.ReactElement;

interface LinkProps extends TouchableHighlightProps {
  children?: React.ReactNode;
  onPress?(event: GestureResponderEvent): void;
  replace?: boolean;
  state?: any;
  to: To;
}
```

`<Link>`是一种元素，允许用户通过点击它导航到另一个视图，类似于`<a>`元素在 Web 应用程序中的工作方式。在`react-router-native`中，a`<Link>`呈现 a `TouchableHighlight`。要覆盖默认样式和行为，请参阅[Props 参考`TouchableHighlight`](https://reactnative.dev/docs/touchablehighlight#props)。

```javascript
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