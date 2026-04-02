import { colors, fontSize, spacing } from "@/constants/theme";
import api from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function Finish() {
    const router = useRouter();
    const { order_id, table } = useLocalSearchParams<{
        order_id: string;
        table: string;
    }>();

    const [customer, setCustomer] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleFinishOrder() {
        try {
            setLoading(true);

            await api.put("/order/send", {
                order_id: order_id,
                name: customer || "Sem nome",
            });

            Alert.alert("Sucesso", "Pedido enviado para a cozinha!");

            router.dismissAll();
            router.replace("/(authenticated)/dashboard");
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Falha ao enviar pedido.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.content}>
                    <View>
                        <Text style={styles.text}>
                            Deseja finalizar o pedido?
                        </Text>
                        <Text style={styles.table}>Mesa {table}</Text>
                    </View>

                    <Text style={styles.label}>NOME DO CLIENTE</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do cliente..."
                        placeholderTextColor={colors.gray}
                        value={customer}
                        onChangeText={setCustomer}
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleFinishOrder}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.background} />
                        ) : (
                            <Text style={styles.buttonText}>
                                Enviar para cozinha
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: spacing.xl,
    },
    content: {
        paddingHorizontal: spacing.xl,
        gap: spacing.lg,
    },
    text: {
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: "bold",
        textAlign: "center",
    },
    table: {
        color: colors.brand,
        fontSize: fontSize.xxl,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: spacing.xs,
    },
    label: {
        color: colors.brandLight,
        fontSize: fontSize.sm,
        fontWeight: "600",
        letterSpacing: 1.5,
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