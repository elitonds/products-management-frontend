import { Button, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card/card";
import PaginatedList from "../../../components/paginated-list/paginated-list";
import ProductService from "../../../services/product.service";
interface Props {}

const ProductList: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState("");
  const totalPerPage = 10;

  const { Search } = Input;

  const findAllProducts = useCallback(async (searchContent='', take = 10, skip = 0) => {
    const paginatioData = await ProductService.findAll(searchContent, take, skip);
    const { dataSource, totalResults } = paginatioData.data;
    const listCategories =
      dataSource?.map((category: any) => {
        return { ...category, key: category.code };
      }) || [];
    setProducts(listCategories);
    setTotalResults(totalResults);
  }, []);

  useEffect(() => {
    findAllProducts();
  }, [findAllProducts]);

  const onChangePage = async (page: number) => {
    const skip = page * totalPerPage - totalPerPage;
    await findAllProducts(search, 10, skip);
  };

  const onSearch = async (value: string) => {
    setSearch(value);
    await findAllProducts(value);
  };

  const onSelectProduct = (category: any) => {
    if (category?.id) navigate(`/product/${category.id}`);
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <Card title="Produto">
        <div className="col-md-12 d-flex justify-content-end mb-3">
          <Button
            key="btn-new"
            id="btn-new"
            type="primary"
            onClick={() => navigate("/product/new")}
          >
            Novo
          </Button>
        </div>
        <Search
          placeholder="Digite o nome do produto"
          onSearch={onSearch}
          enterButton
          allowClear
        />
        <PaginatedList
          total={totalResults}
          columns={columns}
          dataSource={products}
          onChangePage={(page: number) => onChangePage(page)}
          totalPerPage={totalPerPage}
          onSelectRow={onSelectProduct}
        />
      </Card>
    </>
  );
};

export default ProductList;
