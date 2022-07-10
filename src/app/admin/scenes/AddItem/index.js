import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row } from "antd";
import c from "classnames";
import itemTemplate, { defaultItem } from "../../constants/itemTemplate";
import { addItems, selectItems } from "../../../../states/products/productsSlice";

import SingleItemForm from "./components/SingleItemForm";

import styles from "./index.module.scss";
import moment from "moment";

const AddItem = () => {
  const navigate = useNavigate();
  const items = useSelector(selectItems);

  const dispatch = useDispatch();
  const [newItems, setNewItems] = useState([{
    fields: defaultItem,
    errors: {}
  }]);

  const handleChange = useCallback((name, itemIndex, value) => {
    const items = [...newItems];
    const currentItem = { ...items[itemIndex] };
    currentItem.fields = {
      ...currentItem.fields,
      [name]: value
    };
    items.splice(itemIndex, 1, currentItem);
    setNewItems(items);
  }, [newItems]);

  const handleAddMore = () => {
    setNewItems([...newItems, {
      fields: defaultItem,
      errors: {}
    }]);
  }

  const validateItems = () => {
    let isValid = true;
    const validated = newItems.map(({ fields, errors }) => {
      Object.keys(fields).forEach(fieldName => {
        delete errors[fieldName];
        const fieldValue = fields[fieldName];

        const template = itemTemplate.find(i => i.name === fieldName);
        if (template && template.validations) {
          if (template.validations.required && (fieldValue === "" || fieldValue === null)) {
            errors[fieldName] = "Field is Required";
          } else if (template.validations.type === "number") {
            errors[fieldName] = "Should be number";
          }
        }
      });

      if (fields.name && items.find(i => i.name === fields.name)) {
        errors.name = "Item already exists";
      }

      if (isValid && Object.keys(errors).length) isValid = false;

      return {
        fields,
        errors
      };
    });

    if (!isValid) {
      setNewItems(validated);
      return false;
    }
    return true;
  };

  const handlePublish = () => {
    if (validateItems()) {
      dispatch(addItems(newItems.map(({ fields }) => {
        // fixing dates format
        fields.startDate = moment(fields.startDate).valueOf().toString();
        fields.endDate = moment(fields.endDate).valueOf().toString();
        return fields;
      })));
      navigate("/admin");
    }
  };

  return (
    <div>
      <h1>Add items</h1>
      <Row>
        {newItems.map((item, index) => (
          <Col key={index} span={6} className={styles.col}>
            <Card title={`Item #${index + 1}`} bordered={true}>
              <SingleItemForm index={index} item={item} onChange={handleChange}/>
            </Card>
          </Col>
        ))}
        <Col span={6} className={c(styles.col, styles.addMore)}>
          <Button onClick={handleAddMore} type="ghost">Add more +</Button>
        </Col>
      </Row>
      <div>
        <Button onClick={handlePublish} type="primary">Publish</Button>
      </div>
    </div>
  )
};

export default AddItem;
