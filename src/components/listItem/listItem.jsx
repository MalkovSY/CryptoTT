import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color: #0a0aad;
  border: 1px solid #000;
  padding: 10px 0;
  margin: 1px 0px;
`;

const Text = styled.span`
  display: inline-block;
  color: #000;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;
`;


const ListItem = ({name, price, volume}) => {
  return (
    <Item>
      <Text>{name}</Text>
      <Text>{price}$</Text>
      <Text>{volume}</Text>
    </Item>
  );
};

export default ListItem;