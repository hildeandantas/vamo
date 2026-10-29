import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { Sizes, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  /** Wraps content in a ScrollView (default). Disable for lists that scroll themselves. */
  scroll?: boolean;
  /** Tabs already handle the bottom inset, so only the top edge is padded by default. */
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
};

/** Page container: theme background, safe area, gutter and max content width. */
export function Screen({ children, scroll = true, edges = ['top'], contentStyle }: ScreenProps) {
  const { colors } = useTheme();
  const content = <View style={[styles.content, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor: colors.background }]}>
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1 },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: Sizes.content,
    alignSelf: 'center',
    paddingHorizontal: Sizes.gutter,
    paddingVertical: Spacing[8],
    gap: Spacing[6],
  },
});
