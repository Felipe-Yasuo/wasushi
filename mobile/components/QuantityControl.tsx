import { colors, fontSize, spacing } from "@/constants/theme";
import { Minus, Plus } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuantityControlProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export function QuantityControl({
    quantity,
    onIncrement,
    onDecrement,
}: QuantityControlProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onDecrement}>
                <Minus size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={onIncrement}>
                <Plus size={18} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    button: {
        backgroundColor: colors.backgroundInput,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    quantity: {
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: "bold",
        minWidth: 30,
        textAlign: "center",
    },
});