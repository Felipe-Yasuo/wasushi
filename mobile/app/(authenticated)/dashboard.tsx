import { colors, fontSize, spacing, borderRadius } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Order } from "@/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dashboard() {
    const { signOut } = useAuth();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [tableNumber, setTableNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        return () => { mountedRef.current = false; };
    }, []);

    async function handleOpenTable() {
        if (!tableNumber) {
            Alert.alert("Atenção", "Digite um número da mesa válido.");
            return;
        }

        const table = parseInt(tableNumber);

        if (isNaN(table) || table <= 0) {
            Alert.alert("Atenção", "Digite um número da mesa válido.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post<Order>("/order", {
                table: table,
            });

            router.push({
                pathname: "/(authenticated)/order",
                params: {
                    table: response.data.table.toString(),
                    order_id: response.data.id,
                },
            });

            if (mountedRef.current) setTableNumber("");
        } catch (err: any) {
            if (mountedRef.current) Alert.alert("Erro", err?.response?.data?.error || "Falha ao abrir mesa, tente mais tarde.");
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={colors.background} />

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
                        <TouchableOpacity
                            style={styles.signoutButton}
                            onPress={signOut}
                        >
                            <Text style={styles.signoutText}>Sair</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>
                                WA<Text style={styles.logoBrand}>SUSHI</Text>
                            </Text>
                        </View>

                        <Text style={styles.title}>Novo pedido</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Número da mesa..."
                            placeholderTextColor={colors.gray}
                            value={tableNumber}
                            onChangeText={setTableNumber}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleOpenTable}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.background} />
                            ) : (
                                <Text style={styles.buttonText}>Abrir mesa</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
    },
    signoutButton: {
        backgroundColor: colors.red,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
    },
    signoutText: {
        color: colors.primary,
        fontSize: fontSize.md,
        fontWeight: "600",
    },
    content: {
        flex: 1,
        justifyContent: "center",
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
    title: {
        fontSize: fontSize.xl,
        color: colors.primary,
        textAlign: "center",
        marginBottom: spacing.md,
        fontWeight: "600",
    },
    input: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        paddingHorizontal: spacing.md,
        paddingVertical: 14,
        color: colors.primary,
        fontSize: fontSize.md,
        marginBottom: spacing.md,
    },
    button: {
        backgroundColor: colors.brand,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: colors.background,
        fontWeight: "bold",
        fontSize: fontSize.md,
    },
});