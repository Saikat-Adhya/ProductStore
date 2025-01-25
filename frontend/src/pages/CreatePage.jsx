// "use client";

import { Container, Heading, VStack, Box, Input, Button } from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message || "Failed to create the product.",
        type: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message || "Product created successfully!",
        type: "success",
        isClosable: true,
      });

      // Clear the form fields on success
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <>
      <Toaster /> {/* Render the Toaster component */}
      <Container maxW={"container.sm"}>
        <VStack spacing={4}>
          <Heading
            as={"h1"}
            size={"2xl"}
            textAlign={"center"}
            mb={8}
            color={"white"} // White text for the heading
          >
            Create New Product
          </Heading>
          <Box
            w={"full"}
            bg={"gray.800"} // Dark background for the box
            p={8}
            borderRadius={"lg"}
            boxShadow={"lg"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                bg={"gray.700"} // Darker background for input
                color={"white"} // White text
                _placeholder={{
                  color: "gray.400", // Gray placeholder text for better contrast
                }}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                bg={"gray.700"}
                color={"white"}
                _placeholder={{
                  color: "gray.400",
                }}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                bg={"gray.700"}
                color={"white"}
                _placeholder={{
                  color: "gray.400",
                }}
              />
              <Button colorScheme={"cyan"} onClick={handleAddProduct} w={"full"}>
                Create Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePage;
