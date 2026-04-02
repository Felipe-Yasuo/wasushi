import { colors, fontSize, spacing } from "@/constants/theme";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        try {
            setLoading(true);
            await signIn(email, password);
            router.replace("/(authenticated)/dashboard");
        } catch (err: any) {
            const message = err?.response?.data?.error || "Erro ao fazer login";
            Alert.alert("Erro", message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        WA<Text style={styles.logoBrand}>SUSHI</Text>
                    </Text>
                    <Text style={styles.logoSubtitle}>Garçom App</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="seu@email.com"
                        placeholderTextColor={colors.gray}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>SENHA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor={colors.gray}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.background} />
                        ) : (
                            <Text style={styles.buttonText}>ENTRAR</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    scrollContent: {
        justifyContent: "center",
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },
    logoText: {
        fontSize: 38,
        fontWeight: "bold",
        color: colors.primary,
        letterSpacing: 4,
    },
    logoBrand: {
        color: colors.brand,
    },
    logoSubtitle: {
        color: colors.gray,
        fontSize: fontSize.md,
        letterSpacing: 2,
        marginTop: spacing.xs,
    },
    formContainer: {
        gap: spacing.sm,
    },
    label: {
        color: colors.brandLight,
        fontSize: fontSize.sm,
        fontWeight: "600",
        letterSpacing: 1.5,
        marginTop: spacing.sm,
    },
    input: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        paddingHorizontal: spacing.md,
        paddingVertical: 14,
        color: colors.primary,
        fontSize: fontSize.md,
    },
    button: {
        backgroundColor: colors.brand,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: spacing.md,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: colors.background,
        fontWeight: "bold",
        fontSize: fontSize.md,
        letterSpacing: 2,
    },
});