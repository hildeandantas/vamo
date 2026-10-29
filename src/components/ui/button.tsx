import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { Motion, Radius, Sizes, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
type Size = 'default' | 'lg' | 'icon';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  /** A string renders as a label; any other node is rendered as-is (e.g. icon + text). */
  children: ReactNode;
};

const variantColors: Record<
  Variant,
  { bg?: ThemeColor; pressed?: ThemeColor; fg: ThemeColor; border?: ThemeColor }
> = {
  default: { bg: 'primary', pressed: 'primaryPressed', fg: 'primaryForeground' },
  secondary: { bg: 'secondary', pressed: 'secondaryPressed', fg: 'secondaryForeground' },
  outline: { bg: 'background', pressed: 'muted', fg: 'foreground', border: 'input' },
  ghost: { pressed: 'muted', fg: 'foreground' },
  link: { fg: 'accentForeground' },
};

/** Mirrors the web `Button`: pill shape, 48 px min height, press scale and disabled state. */
export function Button({
  variant = 'default',
  size = 'default',
  loading = false,
  disabled,
  style,
  children,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const reduceMotion = useReducedMotion();
  const tone = variantColors[variant];
  const isDisabled = disabled || loading;
  const fg = colors[isDisabled ? 'disabledForeground' : tone.fg];

  return (
    <Pressable
      role="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        tone.border && { borderColor: colors[tone.border] },
        tone.bg && { backgroundColor: colors[tone.bg] },
        pressed && tone.pressed && { backgroundColor: colors[tone.pressed] },
        pressed && !reduceMotion && { transform: [{ scale: Motion.scalePress }] },
        isDisabled && variant !== 'link' && variant !== 'ghost' && {
          backgroundColor: colors.disabled,
          borderColor: 'transparent',
        },
        style,
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : typeof children === 'string' ? (
        <Text
          variant="label"
          style={[{ color: fg }, variant === 'link' && styles.linkLabel]}
          numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  default: { minHeight: Sizes.control, paddingHorizontal: Spacing[5] },
  lg: { minHeight: 56, paddingHorizontal: Spacing[6] },
  icon: { width: 40, height: 40 },
  linkLabel: { textDecorationLine: 'underline' },
});
