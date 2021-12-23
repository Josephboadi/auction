import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, Footer, Navbar, PageHero } from '../components';
import Profile from '../components/User/Profile';

const ProfilePage = () => {
  return (
    <main>
      <Navbar />
      <PageHero title="profile" />
      <Wrapper className="page">
        <Profile />
      </Wrapper>
      <Footer />
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default ProfilePage;
