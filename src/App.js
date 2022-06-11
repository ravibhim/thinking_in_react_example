import React from "react";
import "./styles.css";

class App extends React.Component {
  products = [
    {
      category: "Sporting Goods",
      price: "$49.99",
      stocked: true,
      name: "Football"
    },
    {
      category: "Sporting Goods",
      price: "$9.99",
      stocked: true,
      name: "Baseball"
    },
    {
      category: "Sporting Goods",
      price: "$29.99",
      stocked: false,
      name: "Basketball"
    },
    {
      category: "Electronics",
      price: "$99.99",
      stocked: true,
      name: "iPod Touch"
    },
    {
      category: "Electronics",
      price: "$399.99",
      stocked: false,
      name: "iPhone 5"
    },
    {
      category: "Electronics",
      price: "$199.99",
      stocked: true,
      name: "Nexus 7"
    },
    {
      category: "Electronics",
      price: "$699.99",
      stocked: true,
      name: "Bhim Phone"
    }
  ];

  state = {
    query: ""
  };

  handleInput = (input) => {
    console.log(input);
    this.setState(input);
  };

  filteredProducts = () => {
    const query = this.state.query;
    return this.products.filter((product) => product.name.includes(query));
  };

  render() {
    return (
      <div>
        <SearchBar
          query={this.state.query}
          showStocked={false}
          handleInput={this.handleInput}
        />
        <SearchResults products={this.filteredProducts()} />
      </div>
    );
  }
}

const SearchBar = (props) => {
  const { query, showStocked, handleInput } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(value);
    handleInput({ [name]: value });
  };

  return (
    <form>
      <label htmlFor="query">Query</label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

const SearchResults = (props) => {
  const { products } = props;

  const groupByCategory = products.reduce((group, product) => {
    const { category } = product;
    group[category] = group[category] ?? [];
    group[category].push(product);
    return group;
  }, {});

  const categorizedProductsView = Object.entries(groupByCategory).map(
    ([k, v]) => {
      return <CategorizedProducts key={k} category={k} products={v} />;
    }
  );

  return <div> {categorizedProductsView} </div>;
};

const CategorizedProducts = (props) => {
  const { category, products } = props;

  const rows = products.map((product, index) => {
    return (
      <tr key={index}>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  });

  return (
    <>
      <h4> {category} </h4>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

const Product = (props) => {
  const { name, price } = props;

  return (
    <tr>
      <td> {name} </td>
      <td> ${price} </td>
    </tr>
  );
};

export default App;
