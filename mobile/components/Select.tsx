import { colors, fontSize, spacing } from "@/constants/theme";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

export function Select({
    label,
    placeholder = "Selecione...",
    options,
    selectedValue,
    onValueChange,
}: SelectProps) {
    const [visible, setVisible] = useState(false);

    const selectedLabel =
        options.find((opt) => opt.value === selectedValue)?.label || placeholder;

    function handleSelect(value: string) {
        onValueChange(value);
        setVisible(false);
    }

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={styles.trigger}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        styles.triggerText,
                        !selectedValue && styles.triggerPlaceholder,
                    ]}
                >
                    {selectedLabel}
                </Text>
                <ChevronDown size={18} color={colors.gray} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>
                            {label || "Selecione"}
                        </Text>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            style={styles.list}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === selectedValue &&
                                        styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            item.value === selectedValue &&
                                            styles.optionTextSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {item.value === selectedValue && (
                                        <View style={styles.dot} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setVisible(false)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.cancelText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
    },
    label: {
        color: colors.brandLight,
        fontSize: fontSize.sm,
        fontWeight: "600",
        letterSpacing: 1.5,
        marginBottom: spacing.xs,
    },
    trigger: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        paddingHorizontal: spacing.md,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    triggerText: {
        color: colors.primary,
        fontSize: fontSize.md,
    },
    triggerPlaceholder: {
        color: colors.gray,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.xl,
    },
    modal: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 16,
        width: "100%",
        maxHeight: "70%",
        padding: spacing.lg,
    },
    modalTitle: {
        color: colors.primary,
        fontSize: fontSize.lg,
        fontWeight: "bold",
        marginBottom: spacing.md,
    },
    list: {
        maxHeight: 300,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: spacing.md,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    optionSelected: {
        backgroundColor: colors.brand + "20",
    },
    optionText: {
        color: colors.primary,
        fontSize: fontSize.md,
    },
    optionTextSelected: {
        color: colors.brand,
        fontWeight: "600",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.brand,
    },
    cancelButton: {
        marginTop: spacing.md,
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderColor,
    },
    cancelText: {
        color: colors.gray,
        fontSize: fontSize.md,
        fontWeight: "600",
    },
});