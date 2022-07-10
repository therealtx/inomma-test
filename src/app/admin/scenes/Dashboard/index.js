import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Table } from "antd";
import { selectItems, addItems } from "../../../../states/products/productsSlice";

import styles from "./index.module.scss";
import moment from "moment";
import getRandomBetween from "../../../../services/getRandomBetween";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (text) => moment(Number(text)).format("DD-MM-YYYY"),
    sorter: (a, b) => Number(a.startDate) - Number(b.startDate)
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (text) => moment(Number(text)).format("DD-MM-YYYY"),
    sorter: (a, b) => Number(a.endDate) - Number(b.endDate)
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const [loading, setLoading] = useState(false);

  const handleGenerateRandom = () => {
    setLoading(true);
    const existingItems = items.map(i => i.name);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (!Array.isArray(json)) return;
        dispatch(addItems(json.filter(i => !existingItems.includes(i.title)).map(i => ({
          name: i.title,
          price: i.price,
          weight: getRandomBetween(50, 1000),
          startDate: moment().subtract(getRandomBetween(1, 10), "months").valueOf(),
          endDate: moment().add(getRandomBetween(1, 10), "months").valueOf(),
        }))));
      })
  }

  return (
    <div>
      <h1>Items</h1>

      {items.length
        ? <Table className={styles.table} dataSource={items} columns={columns} pagination={false} rowKey="name"/>
        : <div className={styles.empty}>Items list is empty</div>}

      <div className={styles.buttonsWrapper}>
        <Button onClick={handleGenerateRandom} disabled={loading} className={styles.fillRandom}>
          Fill with random items
        </Button>
        <Button type="primary">
          <NavLink to={`/admin/add-item`}>Add items</NavLink>
        </Button>
      </div>
    </div>
  )
};

export default Dashboard;
