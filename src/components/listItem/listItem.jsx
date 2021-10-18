import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color: #0a0aad;
  background-color: #f8f8f84c;
  border: 2px solid #460202;
  border-radius: 5px;
  padding: 10px 0;
  margin: 1px 0px;
`;

const Text = styled.span`
  display: flex;
  color: #000;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;
`;

const MyImg = styled.img`
  max-width: 25px;
  margin-right: 10px;
`;


const ListItem = ({name, price, volume, image}) => {
  return (
    <Item>
      <Text>
        <MyImg src={image} alt='logo'/>
        {name}
      </Text>
      <Text>{price}$</Text>
      <Text>{volume}</Text>
    </Item>
  );
};

export default ListItem;