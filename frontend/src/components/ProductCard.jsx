import {
    Box,
    Image,
    HStack,
    VStack,
    Heading,
    Input,
    Text,
    Button,
  } from "@chakra-ui/react";
  import { Toaster, toaster } from "@/components/ui/toaster";
  import { useProductStore } from "@/store/product";
  import { useState } from "react";
  import { RxUpdate } from "react-icons/rx"; // Update icon
  import { RiDeleteBin6Fill } from "react-icons/ri"; // Delete icon
  
  const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const { deleteProduct, updateProduct } = useProductStore();
  
    const handleDeleteProduct = async (pid) => {
      const { success, message } = await deleteProduct(pid);
      if (!success) {
        toaster.create({
          title: "Error",
          description: message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Success",
          description: message,
          type: "success",
        });
      }
    };
  
    const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);
      setIsModalOpen(false);
      if (!success) {
        toaster.create({
          title: "Error",
          description: message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Success",
          description: "Product updated successfully",
          type: "success",
        });
      }
    };
  
    return (
      <>
        <Toaster />
        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
          bg="gray.800"
          color="white"
          p={4}
        >
          <Image
            src={product.image}
            alt={product.name}
            h="250px"
            w="full"
            objectFit="cover"
          />
          <Box p={4}>
            <Heading as="h3" size="md" mb={2} color="white">
              {product.name}
            </Heading>
  
            <Text fontWeight="bold" fontSize="xl" color="cyan.400" mb={4}>
              ${product.price}
            </Text>
  
            <HStack spacing={2}>
              {/* Update Button (React Icon) */}
              <div
                onClick={() => setIsModalOpen(true)}
                style={{
                  color: "cyan.400",
                  backgroundColor: "gray.700",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "cyan.500")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "gray.700")}
              >
                <RxUpdate size={24} />
              </div>
  
              {/* Delete Button (React Icon) */}
              <div
                onClick={() => handleDeleteProduct(product._id)}
                style={{
                  color: "red.500",
                  backgroundColor: "gray.700",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "red.600")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "gray.700")}
              >
                <RiDeleteBin6Fill size={24} />
              </div>
            </HStack>
          </Box>
        </Box>
  
        {/* Modal Replacement */}
        {isModalOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="full"
            h="full"
            bg="blackAlpha.800"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000"
          >
            <Box
              bg="gray.800"
              p={6}
              rounded="lg"
              shadow="lg"
              w={{ base: "90%", md: "400px" }}
            >
              <VStack spacing={4}>
                <Heading as="h3" size="md" color="white">
                  Update Product
                </Heading>
                <Input
                  placeholder="Product Name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                  }
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                  }
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <Input
                  placeholder="Image URL"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                  }
                  bg="gray.700"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <HStack spacing={4}>
                  <Button
                    colorScheme="cyan"
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                  <Button colorScheme="red" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        )}
      </>
    );
  };
  
  export default ProductCard;
  