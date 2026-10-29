import { StyleSheet, View, type ViewProps } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Flat surface separated by tone and border (no shadow), 8 px radius. */
export function Card({ style, ...props }: ViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.card,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing[4],
    gap: Spacing[2],
  },
});
