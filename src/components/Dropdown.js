import React from 'react';
import InfiniteScroll from "./InfiniteScroll";


class Dropdown extends React.Component {
constructor(props){
 super(props);
  this.handleChange = this.handleChange.bind(this);
  this.state = { animal: 'shibe' };

};

handleChange(event) {
    this.setState({ animal: event.target.value });
  }

  saveItem() {
    const item = {};
    item.animal = this.state.animal;
    // do more with item object as required (e.g. save to database)
  }

  render() {
    return (
    <div>
      <select name="animal" value={this.state.animal} onChange={this.handleChange}>
          <option value="shibe">Dogs</option>
          <option value="cats">Cats</option>
          <option value="birds">Birds</option>
      </select>
      <InfiniteScroll data={this.state.animal}></InfiniteScroll>
      </div>
    )
  }


}

export default Dropdown;