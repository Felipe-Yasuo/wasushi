import { colors, fontSize, spacing } from "@/constants/theme";
import { Item } from "@/types";
import { formatPrice } from "@/utils/format";
import { Trash2 } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OrderItemProps {
    item: Item;
    onRemove: (item_id: string) => void;
}

export function OrderItem({ item, onRemove }: OrderItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.amount}>{item.amount}x</Text>
                <View style={styles.details}>
                    <Text style={styles.name}>{item.product.name}</Text>
                    <Text style={styles.price}>
                        {formatPrice(item.product.price * item.amount)}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item.id)}
            >
                <Trash2 size={16} color={colors.brand} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        padding: spacing.md,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        flex: 1,
    },
    amount: {
        color: colors.brandLight,
        fontSize: fontSize.md,
        fontWeight: "bold",
    },
    details: {
        flex: 1,
    },
    name: {
        color: colors.primary,
        fontSize: fontSize.md,
        fontWeight: "500",
    },
    price: {
        color: colors.gray,
        fontSize: fontSize.sm,
        marginTop: 2,
    },
    removeButton: {
        padding: spacing.sm,
    },
});