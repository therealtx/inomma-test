import React from "react";
import { Form, InputNumber, Input, DatePicker } from "antd";
import itemTemplate from "../../../../constants/itemTemplate";

import styles from "./index.module.scss";

const SingleItemForm = (props) => {
  const { item, index, onChange } = props;
  const { fields, errors } = item;

  const getComponentByName = (name, itemIndex) => {
    const componentTemplate = itemTemplate.find(i => i.name === name);

    if (!componentTemplate) return null;

    const value = fields[name];


    let Component;
    switch (componentTemplate.type) {
      case "number":
        Component = (
          <InputNumber
            {...componentTemplate.inputProps}
            onChange={v => onChange(name, itemIndex, v)}
            value={value}
          />
        );
        break;
      case "text":
        Component = (
          <Input
            {...componentTemplate.inputProps}
            onChange={v => onChange(name, itemIndex, v.target.value)}
            value={value}
          />
        );
        break;
      case "date":
        Component = (
          <DatePicker
            {...componentTemplate.inputProps}
            format="DD-MM-YYYY"
            onChange={v => onChange(name, itemIndex, v ? v.valueOf() : null)}
            value={value ? value.valueOf() : null}
          />
        );
        break;
      default:
        Component = (
          <Input
            {...componentTemplate.inputProps}
            value={value}
            onChange={(value) => onChange(name, itemIndex, value)}
          />
        );
    }

    return (
      <Form.Item
        label={componentTemplate.label}
        name={componentTemplate.name}
        rules={[{
          required: true,
          message: `${componentTemplate.label} is required`
        }]}
        className={styles.formItem}
        status={!!errors[name] ? "error" : ""}
        help={errors[name] || ""}
      >
        {Component}
      </Form.Item>
    )
  };

  return (
    <Form
      layout="vertical"
      initialValues={fields}
    >
      {Object.keys(fields).map(name => (
        <React.Fragment key={name}>
          {getComponentByName(name, index)}
        </React.Fragment>
      ))}
    </Form>
  )
};

export default React.memo(SingleItemForm);
