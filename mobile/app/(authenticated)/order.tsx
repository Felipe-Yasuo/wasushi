import { QuantityControl } from "@/components/QuantityControl";
import { OrderItem } from "@/components/OrderItem";
import { Select } from "@/components/Select";
import { colors, fontSize, spacing } from "@/constants/theme";
import api from "@/services/api";
import { Category, Item, Product } from "@/types";
import { Trash2 } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Order() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { order_id, table } = useLocalSearchParams<{
        order_id: string;
        table: string;
    }>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingAddItem, setLoadingAddItem] = useState(false);

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            loadProducts(selectedCategory);
        } else {
            setProducts([]);
            setSelectedProduct("");
        }
    }, [selectedCategory]);

    async function loadCategories() {
        try {
            const response = await api.get<Category[]>("/category");
            setCategories(response.data);
        } catch (err: any) {
            Alert.alert("Erro", err?.response?.data?.error || "Falha ao carregar categorias.");
        } finally {
            setLoadingCategories(false);
        }
    }

    async function loadProducts(categoryId: string) {
        try {
            setLoadingProducts(true);
            const response = await api.get<Product[]>("/category/product", {
                params: { category_id: categoryId },
            });
            setProducts(response.data);
        } catch (err: any) {
            Alert.alert("Erro", err?.response?.data?.error || "Falha ao carregar produtos.");
        } finally {
            setLoadingProducts(false);
        }
    }

    async function handleAddItem() {
        try {
            setLoadingAddItem(true);

            const response = await api.post<Item>("/order/add", {
                order_id: order_id,
                product_id: selectedProduct,
                amount: quantity,
            });

            setItems([...items, response.data]);
            setSelectedCategory("");
            setSelectedProduct("");
            setQuantity(1);
        } catch (err: any) {
            Alert.alert("Erro", err?.response?.data?.error || "Falha ao adicionar item.");
        } finally {
            setLoadingAddItem(false);
        }
    }

    async function handleRemoveItem(item_id: string) {
        try {
            await api.delete("/order/remove", {
                params: { item_id: item_id },
            });

            const updatedItems = items.filter((item) => item.id !== item_id);
            setItems(updatedItems);

            Alert.alert("Removido", "Item removido do pedido!");
        } catch (err: any) {
            Alert.alert("Erro", err?.response?.data?.error || "Erro ao remover item.");
        }
    }

    function handleAdvance() {
        if (items.length === 0) return;

        router.push({
            pathname: "/(authenticated)/finish",
            params: { order_id: order_id, table: table },
        });
    }

    async function handleDeleteOrder() {
        Alert.alert(
            "Cancelar pedido",
            "Tem certeza que deseja cancelar este pedido?",
            [
                { text: "Não", style: "cancel" },
                {
                    text: "Sim, cancelar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete("/order", {
                                params: { order_id: order_id },
                            });
                            router.back();
                        } catch (err: any) {
                            Alert.alert("Erro", err?.response?.data?.error || "Erro ao cancelar pedido.");
                        }
                    },
                },
            ]
        );
    }

    if (loadingCategories) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.brand} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Mesa {table}</Text>
                    <Pressable style={styles.closeButton} onPress={handleDeleteOrder}>
                        <Trash2 size={20} color={colors.primary} />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            >
                <Select
                    label="Categoria"
                    placeholder="Selecione a categoria..."
                    options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))}
                    selectedValue={selectedCategory}
                    onValueChange={setSelectedCategory}
                />

                {loadingProducts ? (
                    <ActivityIndicator
                        size="small"
                        color={colors.brand}
                        style={{ marginVertical: spacing.md }}
                    />
                ) : (
                    selectedCategory !== "" && (
                        <Select
                            label="Produto"
                            placeholder="Selecione um produto..."
                            options={products.map((product) => ({
                                label: product.name,
                                value: product.id,
                            }))}
                            selectedValue={selectedProduct}
                            onValueChange={setSelectedProduct}
                        />
                    )
                )}

                {selectedProduct !== "" && (
                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityLabel}>Quantidade</Text>
                        <QuantityControl
                            quantity={quantity}
                            onIncrement={() => setQuantity((q) => q + 1)}
                            onDecrement={() => {
                                if (quantity <= 1) return;
                                setQuantity((q) => q - 1);
                            }}
                        />
                    </View>
                )}

                {selectedProduct !== "" && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddItem}
                        disabled={loadingAddItem}
                        activeOpacity={0.8}
                    >
                        {loadingAddItem ? (
                            <ActivityIndicator color={colors.primary} />
                        ) : (
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        )}
                    </TouchableOpacity>
                )}

                {items.length > 0 && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsTitle}>Itens adicionados</Text>
                        {items.map((item) => (
                            <OrderItem
                                item={item}
                                key={item.id}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </View>
                )}

                {items.length > 0 && (
                    <TouchableOpacity
                        style={styles.advanceButton}
                        onPress={handleAdvance}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.advanceButtonText}>Avançar</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: fontSize.xl,
        color: colors.primary,
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: colors.red,
        padding: spacing.sm,
        borderRadius: 8,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    quantitySection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.md,
    },
    quantityLabel: {
        color: colors.primary,
        fontSize: fontSize.lg,
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginTop: spacing.sm,
    },
    addButtonText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: fontSize.md,
    },
    itemsSection: {
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    itemsTitle: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: fontSize.lg,
    },
    advanceButton: {
        backgroundColor: colors.brand,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: spacing.xl,
    },
    advanceButtonText: {
        color: colors.background,
        fontWeight: "bold",
        fontSize: fontSize.md,
    },
});