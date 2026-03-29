import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const EditProductPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ProductForm mode="edit" id={id} />
    </div>
  );
};

export default EditProductPage;
