import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { Typography, type ThemeColor, type TypographyVariant } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: ThemeColor;
};

/** Typography primitive. Headings (display/title/section) use Montserrat; the rest Inter. */
export function Text({ variant = 'body', color = 'foreground', style, ...props }: TextProps) {
  const { colors } = useTheme();
  const isHeading = variant === 'display' || variant === 'title' || variant === 'section';

  return (
    <RNText
      role={isHeading ? 'heading' : undefined}
      style={[Typography[variant], { color: colors[color] }, style]}
      {...props}
    />
  );
}
