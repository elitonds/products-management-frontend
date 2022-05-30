import { Button, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card/card";
import PaginatedList from "../../../components/paginated-list/paginated-list";
import CategoryService from "../../../services/category.service";

interface Props {}

const CategoryList: React.FC<Props> = () => {
  const { Search } = Input;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState("");
  const totalPerPage = 10;

  const findAllCategories = useCallback(
    async (searchContent = "", take = 10, skip = 0) => {
      const paginatioData = await CategoryService.findAll(
        searchContent,
        take,
        skip
      );
      const { dataSource, totalResults } = paginatioData.data;
      const listCategories =
        dataSource?.map((category: any) => {
          return { ...category, key: category.code };
        }) || [];
      setCategories(listCategories);
      setTotalResults(totalResults);
    },
    []
  );

  useEffect(() => {
    findAllCategories();
  }, [findAllCategories]);

  const onChangePage = async (page: number) => {
    const skip = page * totalPerPage - totalPerPage;
    await findAllCategories(search, 10, skip);
  };

  const onSearch = async (value: string) => {
    setSearch(value);
    await findAllCategories(value);
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

  const onSelectCategory = (category: any) => {
    if (category?.id) navigate(`/category/${category.id}`);
  };

  return (
    <>
      <Card title="Categoria">
        <div className="col-md-12 d-flex justify-content-end mb-3">
          <Button
            key="btn-new"
            id="btn-new"
            type="primary"
            onClick={() => navigate("/category/new")}
          >
            Novo
          </Button>
        </div>
        <Search
          placeholder="Digite o nome da categoria"
          onSearch={onSearch}
          enterButton
          allowClear
        />
        <PaginatedList
          total={totalResults}
          columns={columns}
          dataSource={categories}
          onChangePage={(page: number) => onChangePage(page)}
          totalPerPage={totalPerPage}
          onSelectRow={onSelectCategory}
        />
      </Card>
    </>
  );
};

export default CategoryList;
