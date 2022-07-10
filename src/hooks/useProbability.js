import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../states/products/productsSlice";
import getPercent from "../services/getPercent";

const useProbability = () => {
  const items = useSelector(selectItems);
  const { maxWeight } = items.reduce((currentWeights, nextItem) => {
    if (nextItem.weight > currentWeights.maxWeight) {
      currentWeights.maxWeight = nextItem.weight;
    }

    if (nextItem.weight < currentWeights.minWeight) {
      currentWeights.minWeight = nextItem.weight;
    }

    return currentWeights;
  }, {
    minWeight: Number.MAX_SAFE_INTEGER,
    maxWeight: 0
  });

  return useCallback((itemWeight) => {
    // return getPercent(minWeight, maxWeight, itemWeight);
    return getPercent(0, maxWeight, itemWeight);
  }, [/*minWeight, */maxWeight]);
}

export default useProbability;
