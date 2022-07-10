import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../states/products/productsSlice";
import getRandomBetween from "../services/getRandomBetween";
import useProbability from "./useProbability";

const useRandomItems = () => {
  const probabilityCalculator = useProbability();
  const [pickedItems, setPickedItems] = useState([]);

  const items = useSelector(selectItems);
  const sortedItems = items
    .map(item => ({
      ...item,
      probability: probabilityCalculator(item.weight)
    }))
    .sort((a, b) => a.probability - b.probability);

  const itemsLimit = Math.min(items.length, 5);

  const pickRandomItemByProbability = useCallback((probability, alreadyPickedItems) => {
    const pickedNames = alreadyPickedItems.map(a => a.name);
    return sortedItems.find(i => !pickedNames.includes(i.name) && i.probability >= probability);
  }, [sortedItems]);

  const handlePickRandomItems = useCallback(() => {
    const randomItems = [];

    while (randomItems.length < itemsLimit) {
      const rand = getRandomBetween(0, 100);
      const result = pickRandomItemByProbability(rand, randomItems);
      if (result) randomItems.push(result);
    }
    setPickedItems(randomItems);
  }, [itemsLimit, pickRandomItemByProbability]);


  return {
    itemsLimit,
    handlePickRandomItems,
    pickedItems
  }
}

export default useRandomItems;
