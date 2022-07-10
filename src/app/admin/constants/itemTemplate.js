import moment from "moment";

const itemTemplate = [{
  name: "name",
  type: "text",
  label: "Name",
  value: null,
  inputProps: {},
  validations: {
    required: true
  }
}, {
  name: "price",
  type: "number",
  label: "Price",
  value: null,
  inputProps: {
    min: 1
  },
  validations: {
    required: true
  }
}, {
  name: "weight",
  type: "number",
  label: "Weight",
  value: null,
  inputProps: {
    min: 1
  },
  validations: {
    required: true
  }
}, {
  name: "startDate",
  type: "date",
  label: "Start Date",
  value: moment(),
  inputProps: {
    disabledDate: (current) => {
      return current && current > moment();
    }
  },
  validations: {
    required: true
  }
}, {
  name: "endDate",
  type: "date",
  label: "End Date",
  value: moment().add(1, "months"),
  inputProps: {
    disabledDate: (current) => {
      return current && current < moment().endOf('day');
    }
  },
  validations: {
    required: true
  }
}];

export const defaultItem = itemTemplate.reduce((current, next) => {
  current[next.name] = next.value;
  return current;
}, {});

export default itemTemplate;
