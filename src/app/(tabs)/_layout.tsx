import { NativeTabs } from "expo-router/unstable-native-tabs";

import { useTheme } from "@/hooks/use-theme";

/** Same entries as the web `MobileNavbar`: Home, Mensagens and Menu. */
export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <NativeTabs
      backgroundColor={colors.background}
      tintColor={colors.secondary}
      indicatorColor={colors.accent}
      labelStyle={{
        color: colors.mutedForeground,
        selected: { color: colors.foreground },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="mensagens">
        <NativeTabs.Trigger.Label>Mensagens</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "bubble.left", selected: "bubble.left.fill" }}
          md="chat_bubble"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="menu">
        <NativeTabs.Trigger.Label>Menu</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="line.3.horizontal" md="menu" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
