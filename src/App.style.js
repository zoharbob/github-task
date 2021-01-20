import styled from "styled-components";
import {Input as InputBase, List} from "antd";
import {ReactComponent as Logo} from "./assets/github.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-height: 800px;
  padding: 20px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ItemWrapper = styled.div`
    display: flex;
    min-width: 175px;
    justify-content: space-between;
`;

export const UserInfo = styled.div`
  margin-left: 15px;
`;

export const ListWrapper = styled(List)`
  width: 500px;
`

export const Input = styled(InputBase)`
  width: 300px;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

export const GitHubLogo = styled(Logo)`
  width: 50px;
  height: 50px;
`;