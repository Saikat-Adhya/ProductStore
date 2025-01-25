import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products, isLoading } = useProductStore(); // Assuming isLoading is provided

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12} bg="gray.900" color="white" borderRadius="lg">
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          color="white" // Solid white color for text
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        {isLoading ? ( // Assuming you have a loading state in your store
          <Spinner size="xl" />
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w="full"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.400">
                No products found 😢{" "}
                <Link to="/create">
                  <Text as="span" color="cyan.400" _hover={{ textDecoration: "underline" }}>
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
