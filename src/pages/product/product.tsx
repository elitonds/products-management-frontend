import { Button, Form, Input, message, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import { CategorySelectDto } from "../../dto/category/category-select.dto";
import { CreateUpdateProductDto } from "../../dto/product/create-edit-product.dto";
import CategoryService from "../../services/category.service";
import ProductService from "../../services/product.service";

interface Props {}

const Product: React.FC<Props> = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const findProduct = useCallback(async () => {
    if (id) {
      const product = await ProductService.findOne(id);
      form.setFieldsValue(product.data);
    }
  }, [id]);

  const findAllCategories = useCallback(async () => {
    const list = await CategoryService.findSelect();
    setCategories(list.data);
  }, []);

  useEffect(() => {
    if (!categories.length) findAllCategories();
  }, [categories, findAllCategories]);

  useEffect(() => {
    findProduct();
  }, [id, findProduct]);

  const goBack = () => {
    navigate("/product");
  };

  const createUpdateProduct = async (payload: CreateUpdateProductDto) => {
    try {
      const newProduct = id
        ? await ProductService.update(id, payload)
        : await ProductService.create(payload);
      if (newProduct) {
        message.success("Produto salvo com sucesso", 3);
        goBack();
      }
    } catch (e) {
      message.error("Erro ao salvar o produto", 3);
    }
  };

  const deleteProduct = async () => {
    try {
      await ProductService.delete(id);
      message.success("Produto excluído com sucesso", 3);
      setIsDeleteModalVisible(false);
      goBack();
    } catch (e) {
      message.error("Erro ao excluir o produto", 3);
    }
  };

  return (
    <>
      <Modal
        title="Excluir produto"
        visible={isDeleteModalVisible}
        onOk={() => deleteProduct()}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>{`Deseja excluir o produto '${form.getFieldValue("name")}'?`}</p>
      </Modal>
      <Card title="Cadastro de produto">
        <Form
          name="pacient-form"
          onFinish={(values) => createUpdateProduct(values)}
          className="d-flex row"
          form={form}
        >
          <Item
            name="code"
            className="col-md-6"
            rules={[
              { required: true, message: "O campo código é obrigatório" },
            ]}
            normalize={(value) => {
              return value.toUpperCase();
            }}
          >
            <Input
              id="code"
              placeholder="Código"
              maxLength={8}
              allowClear
              disabled={id !== undefined}
            />
          </Item>
          <Item
            name="name"
            className="col-md-6"
            rules={[{ required: true, message: "O campo nome é obrigatório" }]}
          >
            <Input id="name" placeholder="Nome" maxLength={150} allowClear />
          </Item>
          <Item
            name="price"
            className="col-md-6"
            rules={[{ required: true, message: "O campo preço é obrigatório" }]}
          >
            <Input type="number" id="price" placeholder="Preço" allowClear />
          </Item>
          <Item
            name="categoryId"
            className="col-md-6"
            rules={[
              {
                required: true,
                message: "O campo categoria deve ser informado",
              },
            ]}
          >
            <Select>
              {categories?.map((category: CategorySelectDto) => {
                return (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>
          </Item>
          <Item
            name="details"
            className="col-md-12"
            rules={[
              {
                required: true,
                message: "O campo detalhes é obrigatório",
              },
            ]}
          >
            <TextArea rows={3} id="details" placeholder="Detalhes" allowClear />
          </Item>
          <Item className="col-md-12" style={{ textAlign: "right" }}>
            <Button key="btn-new" id="btn-new" onClick={() => goBack()}>
              Voltar
            </Button>
            {id ? (
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                danger
                onClick={() => setIsDeleteModalVisible(true)}
              >
                Excluir
              </Button>
            ) : (
              ""
            )}
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              htmlType="submit"
            >
              {id ? "Salvar" : "Cadastrar"}
            </Button>
          </Item>
        </Form>
      </Card>
    </>
  );
};

export default Product;
