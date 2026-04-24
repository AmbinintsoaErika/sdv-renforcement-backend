import { Button, Card, Text, Modal, Portal, TextInput } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from 'react';
import { Redirect, useRootNavigationState, useRouter } from 'expo-router';
import { UserContext } from "@/contexts/UserContext";
import fetchData from "@/hooks/fetchData";

type SinistreType = {
  id: number | string;
  contrat_id?: string;
  statut?: string;
  dateAppel?: string;
  dateSinistre?: string;
  contexte?: string;
  attestationAssurance?: number;
  carteGrise?: number;
  cin?: number;
  file?: any;
};

export default function Index() {
  const router = useRouter();
  const [sinistres, setSinistres] = useState<SinistreType[]>([]);
  const [loading, setLoading] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    loadSinistres();
  }, []);

  const loadSinistres = async () => {
    setLoading(true);
    try {
      const data = await fetchData('/sinistres', 'GET', {}, true);
      setSinistres(data.sinistres);
    } catch (err) {
      console.error("Error loading sinistres:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (rootNavigationState?.key) {
    return (
      <ScrollView>
        {sinistres.map((sinistre: SinistreType) => (
          <Card key={sinistre.id} style={styles.card}>
            <Card.Title title={`Sinistre n°${sinistre.id}`} />
            <Card.Content>
              <Text variant="bodyMedium">Statut: {sinistre.statut}</Text>
              <Text variant="bodyMedium">Date Appel: {sinistre.dateAppel}</Text>
              <Text variant="bodyMedium">Contexte: {sinistre.contexte}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  router.push({ pathname: '/sinistre/[id]', params: { id: sinistre.id } });
                }}
              >
                Voir
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#795c85",
  },
});