import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <Screen>
      <View style={styles.hero}>
        <Text variant="caption" color="accentForeground">
          VAMO
        </Text>
        <Text variant="title">
          {user ? `Olá, ${user.name.split(' ')[0]}.` : 'O próximo passo começa aqui.'}
        </Text>
        <Text color="mutedForeground">
          Encontre profissionais de confiança para o que você precisa.
        </Text>
      </View>

      <Card>
        <Text variant="section">Explorar serviços</Text>
        <Text variant="small" color="mutedForeground">
          Base do app pronta: tema, fontes, navegação e cliente da API.
        </Text>
        <View style={styles.actions}>
          <Button>Buscar</Button>
          <Button variant="outline">Ver categorias</Button>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: Spacing[3] },
  actions: { gap: Spacing[3], marginTop: Spacing[3] },
});
