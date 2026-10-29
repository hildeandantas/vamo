import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';

export default function MessagesScreen() {
  return (
    <Screen>
      <Text variant="title">Mensagens</Text>
      <Text color="mutedForeground">Suas conversas com profissionais aparecerão aqui.</Text>
    </Screen>
  );
}
