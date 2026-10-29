import { ActivityIndicator } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/providers/auth-provider';

export default function MenuScreen() {
  const { user, loading, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <Screen>
      <Text variant="title">Menu</Text>

      <Card>
        {loading ? (
          <ActivityIndicator color={colors.secondary} />
        ) : user ? (
          <>
            <Text variant="label">{user.name}</Text>
            <Text variant="small" color="mutedForeground">
              {user.email}
            </Text>
            <Button variant="outline" onPress={logout}>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Text variant="label">Você não está conectado</Text>
            <Text variant="small" color="mutedForeground">
              Entre para acompanhar pedidos e conversar com profissionais.
            </Text>
            <Button variant="secondary" disabled>
              Entrar (em breve)
            </Button>
          </>
        )}
      </Card>
    </Screen>
  );
}
