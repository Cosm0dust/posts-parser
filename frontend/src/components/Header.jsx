import React from 'react';
import { Link } from "react-router-dom";
import { Flex,Typography } from "antd"

const Header = () => {
   return (
      <Link><Flex align='center' vertical style={{ width: '100%', background: "purple", paddingBottom: 20, paddingTop: 10 }}>
         <Typography.Title style={{ color: 'white', }}>Posts Admin</Typography.Title>
      </Flex>
      </Link>
   )
}
export default Header