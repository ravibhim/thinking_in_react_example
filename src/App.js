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
    query: "",
    showStocked: false
  };

  handleInput = (input) => {
    console.log(input);
    this.setState(input);
  };

  filteredProducts = () => {
    const query = this.state.query;
    const showStocked = this.state.showStocked;

    let filteredProducts = this.products.filter((product) =>
      product.name.includes(query)
    );
    if (showStocked) {
      filteredProducts = filteredProducts.filter((product) => product.stocked);
    }
    return filteredProducts;
  };

  render() {
    return (
      <div>
        <SearchBar
          query={this.state.query}
          showStocked={this.state.showStocked}
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

    if ("query" === name) {
      handleInput({ [name]: value });
    } else {
      console.log(event.target.checked);
      handleInput({ showStocked: event.target.checked });
    }
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
      <input
        type="checkbox"
        name="showStocked"
        id="showStocked"
        defaultChecked={showStocked}
        onChange={handleChange}
      />
      <label htmlFor="showStocked">Only show products in stock</label>
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
      <Product
        key={index}
        name={product.name}
        price={product.price}
        stocked={product.stocked}
      />
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
  const { name, price, stocked } = props;

  return (
    <tr className={stocked ? "stocked" : "not-stocked"}>
      <td> {name} </td>
      <td> {price} </td>
    </tr>
  );
};

export default App;
