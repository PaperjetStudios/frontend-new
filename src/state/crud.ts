import produce from "immer";
import _ from "lodash";
import * as R from "ramda";

const popKeys = (keys) => {
  return { lastKey: R.takeLast(1, keys), keys: R.dropLast(1, keys) };
};

const fetchCollection = (data, keys) => {
  const lensPath = R.lensPath(keys);
  return R.view(lensPath, data);
};

const getItemFromCollection = (data, keys, value) => {
  const k = popKeys(keys);
  const baseCollection = fetchCollection(data, k.keys);

  const index = _.findIndex(baseCollection, (o) => {
    return o[k.lastKey] === value;
  });

  console.log(index);

  return { data: data[index], index: index, k: k };
};

export const crud = {
  getCollection: (data, keys) => {
    return fetchCollection(data, keys);
  },
  getItem: (data, keys, value) => {
    return getItemFromCollection(data, keys, value);
  },
  removeCollection: (data, keys) => {
    return R.dissocPath(keys, data);
  },
  clearCollection: (data, keys) => {
    const lensPath = R.lensPath(keys);
    return R.set(lensPath, [], data);
  },
  findIndex: (data, valueKeys, value) => {
    const valuePath = R.lensPath(valueKeys);
    return _.findIndex(data, (o) => {
      return R.view(valuePath, o) === value;
    });
  },
  removeItem: (data, keys, value) => {
    const item = getItemFromCollection(data, keys, value);
    if (item.index > -1) {
      // remove it
      return R.dissocPath([...item.k.keys, item.index], data);
    } else {
      return data;
    }
  },
  addItem: (data, keys, value) => {
    const lensPath = R.lensPath(keys);
    const collection = fetchCollection(data, keys);
    const transformedData = produce(collection, (draft) => {
      draft.push(value);
    });
    return R.set(lensPath, transformedData, data);
  },
  addItems: (data, keys, values) => {
    const ePath = R.lensPath(keys);
    const collection = fetchCollection(data, keys);
    const transformedData = produce(collection, (draft) => {
      values.foreach((val) => {
        draft.push(val);
      });
    });
    return R.set(ePath, values, transformedData);
  },
  updateItem: (data, keys, value) => {
    const lensPath = R.lensPath(keys);
    return R.set(lensPath, value, data);
    /*
    const item = getItemFromCollection(data, keys, value);
    console.log("item", item);
    if (item.index > -1) {
      
    } else {
      return data;
    }*/
  },
};
