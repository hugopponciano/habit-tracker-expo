import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { signupAPI } from '../src/utils/handle-api';
import { useAuthStore } from '../src/store/useAuthStore';

export default function SignupScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await signupAPI({ name: name.trim(), email: email.trim(), password });
      setAuth(token, user);
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Comece a rastrear seus hábitos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#FFF" />
          : <Text style={styles.buttonText}>Criar Conta</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>
          Já tem uma conta? <Text style={styles.linkBold}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#5C6BC0', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD',
    borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16,
  },
  button: {
    backgroundColor: '#5C6BC0', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 8, marginBottom: 16,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#888', textAlign: 'center', marginTop: 8 },
  linkBold: { color: '#5C6BC0', fontWeight: 'bold' },
});