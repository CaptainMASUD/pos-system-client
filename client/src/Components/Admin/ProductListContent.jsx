import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, TextInput, Select } from "flowbite-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductListContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    barcode: "",
    description: "",
    category: "",
    brand: "",
    purchasePrice: "",
    sellPrice: "",
    totalQuantity: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/productlist");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/brands/");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:4000/api/productlist/${editingProduct._id}`, newProduct);
      } else {
        await axios.post("http://localhost:4000/api/productlist", newProduct);
      }
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      setNewProduct({ barcode: "", description: "", category: "", brand: "", purchasePrice: "", sellPrice: "", totalQuantity: "" });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:4000/api/productlist/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Barcode</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Purchase Price</Table.HeadCell>
          <Table.HeadCell>Sell Price</Table.HeadCell>
          <Table.HeadCell>Total Quantity</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products.map((product, index) => (
            <Table.Row key={product._id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{product.barcode}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>{product.purchasePrice}</Table.Cell>
              <Table.Cell>{product.sellPrice}</Table.Cell>
              <Table.Cell>{product.totalQuantity}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color="info" size="sm" onClick={() => handleEdit(product)}>
                    <FaEdit />
                  </Button>
                  <Button color="failure" size="sm" onClick={() => handleDelete(product._id)}>
                    <FaTrash />
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-4">
        <Button onClick={() => setShowModal(true)}>
          <FaPlus className="mr-2" /> Add Product
        </Button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>{editingProduct ? "Edit Product" : "Add New Product"}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput name="barcode" value={newProduct.barcode} onChange={handleInputChange} placeholder="Barcode" />
            <TextInput name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" />
            <Select name="category" value={newProduct.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
              ))}
            </Select>
            <Select name="brand" value={newProduct.brand} onChange={handleInputChange}>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.brandName}>{brand.brandName}</option>
              ))}
            </Select>
            <TextInput name="purchasePrice" value={newProduct.purchasePrice} onChange={handleInputChange} placeholder="Purchase Price" type="number" />
            <TextInput name="sellPrice" value={newProduct.sellPrice} onChange={handleInputChange} placeholder="Sell Price" type="number" />
            <TextInput name="totalQuantity" value={newProduct.totalQuantity} onChange={handleInputChange} placeholder="Total Quantity" type="number" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveProduct}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
