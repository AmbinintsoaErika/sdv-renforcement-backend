import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '@/contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';
import fetchData from "@/hooks/fetchData";

type JwtPayload = {
  user: {}
}

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useContext(UserContext);
    const router = useRouter();

    const login = async () => {
        try {
          if(!email || !password) {
            setError("Veuillez remplir tous les champs !");
            return;
          }

          const { token } = await fetchData("/auth/login",'POST', { email, password }, false)
          
          await AsyncStorage.setItem("token", token);

          const { user } = jwtDecode<JwtPayload>(token);
          setUser(user);

          router.push({ pathname: '/' });
        } catch(err: any) {
          console.log("Login error : ", err);
          setError(err.message);
        }
    }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Connexion</Text>

          <TextInput
            label="Identifiant"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            
          />
          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <HelperText type="error" visible={Boolean(error)}>{error}</HelperText>

          <Button mode="contained" onPress={login} style={styles.button}>
            Se connecter
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    color: '#6200EE',
  },
});
