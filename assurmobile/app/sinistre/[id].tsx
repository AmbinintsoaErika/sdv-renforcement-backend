import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card, Menu, TextInput, HelperText, List, Divider } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import fetchData from "@/hooks/fetchData";

type SinistreType = {
  id: string | number;
  contrat?: {
    id: string | number;
    numeroContrat: string;
    immatriculationVehicule: string;
    user_id: string;
  };
  user?: {
    firstname: string;
    lastname: string;
  };
  documents?: [{
    id: string;
    titre: string;
    type: string;
    chemin: string;
  }];
  statut?: string;
  dateAppel?: string;
  dateSinistre?: string;
  contexte?: string;
  attestationAssurance?: number;
  carteGrise?: number;
  cin?: number;
};

export default function SinistreDetails() {
  const { id } = useLocalSearchParams();
  const [sinistre, setSinistre] = useState<SinistreType | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>("---");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (id) {
      loadSinistre();
    }
  }, [id]);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      setFile({
        uri: file.uri,
        name: file.name,
        size: file.size,
        type: file.file?.type || 'application/octet-stream',
      });
    } else {
      alert("Aucun fichier sélectionné.");
    }
  };
  
  const handleFileUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier !");
      return;
    }

    if (!documentType || documentType === "---") {
        setError("Veuillez sélectionner un type de document !");
        return;
    }
  
    try {
      const formData = new FormData();
      formData.append("chemin", file.uri);
      formData.append("titre", file.name);
      formData.append("type", documentType);

      const response = await fetchData("/documents", "POST", formData, true);
      if(!response.ok) { setError("Erreur lors de l'envoi du document."); return; }

      console.log(JSON.stringify(response));
      
      alert("Document envoyé avec succès !");
      setFile(null);
      setError(null);

      loadSinistre();
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Erreur lors de l'envoi du document.");
    }
  };
  
  const loadSinistre = async () => {
    setLoading(true);
    try {
        const data = await fetchData(`/sinistres/${id}`, "GET", {}, true);
        const contratDetails = await fetchData(`/contrats/${data.sinistre.contrat_id}`, "GET", {}, true);
        const userDetails = await fetchData(`/users/${contratDetails.contrat.user_id}`, "GET", {}, true);

        setSinistre({
            ...data.sinistre,
            contrat: contratDetails.contrat,
            user: userDetails.user,
        });
    } catch (err) {
      console.error("Error loading sinistre:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !sinistre) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
      <Text style={[styles.label, styles.subtitle]}>SINISTRE N°${sinistre.id}</Text>
        <Card.Content>
          <Text style={styles.label}>Contrat:</Text>
          <Text style={styles.value}>Numéro: {sinistre.contrat?.numeroContrat}</Text>
          <Text style={styles.value}>Immatriculation véhicule: {sinistre.contrat?.immatriculationVehicule}</Text>

          <Text style={styles.label}>Informations client :</Text>
          <Text style={styles.value}>Nom : {sinistre.user?.lastname}</Text>
          <Text style={styles.value}>Prénom : {sinistre.user?.firstname}</Text>

          <Text style={styles.label}>Statut:</Text>
          <Text style={styles.value}>{sinistre.statut}</Text>

          <Text style={styles.label}>Date Appel:</Text>
          <Text style={styles.value}>{sinistre.dateAppel}</Text>

          <Text style={styles.label}>Date Sinistre:</Text>
          <Text style={styles.value}>{sinistre.dateSinistre}</Text>

          <Text style={styles.label}>Contexte:</Text>
          <Text style={styles.value}>{sinistre.contexte}</Text>

          <Divider style={{ marginBlock: 10 }} />
          
        </Card.Content>
      </Card>

      <Card style={styles.fileCard}>
        <Text style={[styles.label, styles.subtitle]}>AJOUTER UN DOCUMENT</Text>
        <Card.Content>
          <Button mode="outlined" onPress={pickDocument} style={styles.input}>
            {file ? `Fichier: ${file.name}` : "Choisir un fichier"}
          </Button>
          
          <Text style={styles.label}>Type de document</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.input}>
                {documentType}
              </Button>
            }
          >
            <Menu.Item onPress={() => setDocumentType("attestation d'assurance")} title="Attestation d'assurance" />
            <Menu.Item onPress={() => setDocumentType("carte grise")} title="Carte Grise" />
            <Menu.Item onPress={() => setDocumentType("cin")} title="CIN" />
          </Menu>
          <HelperText type="error" visible={Boolean(error)}>{error}</HelperText>

          <Button mode="contained" onPress={handleFileUpload} style={styles.saveButton}>
            Envoyer le document
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  card: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#25232a",
  },
  fileCard: {
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  value: {
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 15,
    color: "#7173f6",
    fontSize: 18,
  },
  input: {
    minHeight: 40,
    marginBottom: 15,
  },
  saveButton: {
    alignSelf: "center",
    maxWidth: 185,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    borderWidth: 0,
    fontSize: 25,
    alignSelf: "flex-start",
    color: "#000000",
  },
});