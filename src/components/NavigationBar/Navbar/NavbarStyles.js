import styled from "styled-components"

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0vh;
  right: ${props => (props.open ? "0" : "-100%")};
  width: 100%;
  height: 100vh;
  z-index: 9999;
  transition: right 0.3s linear;

  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-size: 1rem;
    color: #000 !important;
    transition: all 0.5s !important;

    .logo {
        overflow: hidden;

        img {
            max-height: 20px;
        }
    }
  }

  a:hover {
    color: #000 !important;
  }

  button {
    border: none;
    background: transparent;
  }

  .logged-in-menu {
    display: flex;
  }

  @media only screen and (min-width: 992px) {
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: center;
  }
  a {
    padding: 1rem;
    text-decoration: none;
  }
` 