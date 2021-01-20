import React, { useState, useEffect, useRef } from 'react';
import {useQuery,} from 'react-query'
import { Pagination, List, Spin } from 'antd';
import getUsersData from './api';
import { Container, Avatar, ItemWrapper, UserInfo, ListWrapper, Input, ErrorMessage, GitHubLogo } from "./App.style";

function App() {
  const [page, setPage] = useState(1)
  const inputRef = useRef(null);
  const [user, setUser] = useState('');

  const { data, isError, error, isFetching, refetch } = useQuery(
      ['users', page],
      () => getUsersData(user, page),
      {
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!user
      }
  )

  useEffect(() => {
    if(user) {
      refetch();
    }
  }, [user])

  const search = () => {
    const value = inputRef.current?.state?.value || '';
    setUser(value);
    setPage(1);
  }

  return (
      <Container>
        <div>
          <GitHubLogo />
        </div>
        <Input placeholder="search user on GitHub" onPressEnter={search} ref={inputRef} disabled={isFetching} />
        {data?.totalItems ? <h3>Total Items: {data.totalItems}</h3> : null}
        {isFetching && <Spin size="large" />}
        {isError && <ErrorMessage>{error?.response?.data?.message || 'Failed to fetch data'}</ErrorMessage>}
        <ListWrapper
            itemLayout="horizontal"
            dataSource={data?.users || []}
            renderItem={item => (
                <List.Item>
                  <ItemWrapper>
                    <Avatar src={item.avatar_url}/>
                    <UserInfo>
                      <h3>{item.name}</h3>
                      <h4>{item.email}</h4>
                      <p>{item.bio}</p>
                    </UserInfo>
                  </ItemWrapper>
                </List.Item>
            )}
        />
        <Pagination current={page} onChange={setPage} total={data?.totalItems ?? 0} />
      </Container>
  )
}
export default App;
