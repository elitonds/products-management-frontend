import { Button, Form, Input, message, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/card";
import { CreateUpdateCategoryDto } from "../../dto/category/create-edit-category.dto";
import CategoryService from "../../services/category.service";

interface Props {}

const Category: React.FC<Props> = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const findCategory = useCallback(async () => {
    if (id) {
      const category = await CategoryService.findOne(id);
      form.setFieldsValue(category.data);
    }
  }, [id]);

  useEffect(() => {
    findCategory();
  }, [id, findCategory]);

  const goBack = () => {
    navigate("/category");
  };

  const createUpdateCategory = async (payload: CreateUpdateCategoryDto) => {
    try {
      const newCategory = id
        ? await CategoryService.update(id, payload)
        : await CategoryService.create(payload);
      if (newCategory) {
        message.success("Categoria salva com sucesso", 3);
        goBack();
      }
    } catch (e) {
      message.error("Erro ao salvar a categoria", 3);
    }
  };

  const deleteCategory = async () => {
    try {
      await CategoryService.delete(id);
      message.success("Categoria excluída com sucesso", 3);
      setIsDeleteModalVisible(false);
      goBack();
    } catch (e) {
      message.error("Erro ao excluir a categoria", 3);
    }
  };

  return (
    <>
      <Modal
        title="Excluir categoria"
        visible={isDeleteModalVisible}
        onOk={() => deleteCategory()}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>{`Deseja excluir a categoria '${form.getFieldValue("name")}'?`}</p>
      </Modal>
      <Card title="Cadastro de categoria">
        <Form
          name="pacient-form"
          onFinish={(values) => createUpdateCategory(values)}
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
          <Item name="details" className="col-md-12">
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

export default Category;
