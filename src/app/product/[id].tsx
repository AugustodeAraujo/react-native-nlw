import { View, ScrollView, Text, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/formatCurrency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { Feather } from "@expo/vector-icons";

import { useCartStore } from "@/stores/cart-store";

export default function Products() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function handleAddToCart() {
    cartStore.add(product);
    navigation.goBack();
  }

  return (
    <View className='flex-1'>
      <Image
        source={product.cover}
        className='w-full h-52'
        resizeMode='cover'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className='p-5 mt-4 flex-1'
      >
        <Text className='text-lime-400 text-2xl font-heading my-2'>
          {formatCurrency(product.price)}
        </Text>
        <Text className='text-slate-400 font-body text-base leading-6 mb-6'>
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className='text-slate-400 font-body text-base leading-6'
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </ScrollView>

      <View className='p-5 pb-8 gap-5'>
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name='plus-circle' size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title='Voltar ao cardápio' href='/' />
      </View>
    </View>
  );
}