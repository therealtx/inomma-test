import React from "react";
import { Button, Row, Col } from "antd";
import styles from "../../../admin/scenes/AddItem/index.module.scss";
import ItemCard from "./components/ItemCard";
import useRandomItems from "../../../../hooks/useRandomItems";

const Homepage = () => {
  const { itemsLimit, handlePickRandomItems, pickedItems } = useRandomItems();

  return (
    <div>
      <Button type="primary" onClick={handlePickRandomItems}>
        Pick random {itemsLimit} items
      </Button>

      <div>
        <Row type="flex">
          {pickedItems.map((item, index) => (
            <Col key={item.name} span={6} className={styles.col}>
              <ItemCard title={index} {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
};

export default Homepage;
