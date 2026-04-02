import { colors, fontSize, spacing } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

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
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                    dropdownIconColor={colors.gray}
                >
                    <Picker.Item
                        label={placeholder}
                        value=""
                        color={colors.gray}
                    />
                    {options.map((option) => (
                        <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            color={colors.primary}
                        />
                    ))}
                </Picker>
            </View>
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
    pickerContainer: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        overflow: "hidden",
    },
    picker: {
        color: colors.primary,
        backgroundColor: "transparent",
    },
});