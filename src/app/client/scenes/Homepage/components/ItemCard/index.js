import React from "react";
import { Card } from "antd";

const ItemCard = ({ index, name, weight, price }) => {
  return (
    <Card title={index} bordered={false}>
      <div>Name: <b>{name}</b></div>
      <div>Weight: <b>{weight}</b></div>
      <hr/>
      <div>Price: <b>{price}</b></div>
    </Card>
  );
}

export default React.memo(ItemCard);
