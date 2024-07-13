import { server } from "@/constants";
import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SearchPageCard from "../Card/SearchPageCard";

const SearchPage = () => {
  const { user } = useParams();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const userSet = useRef(new Set());

  const lastUserElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    // Reset the state variables when user changes
    setUsers([]);
    setPage(1);
    setHasMore(true);
    userSet.current.clear();
  }, [user]);

  useEffect(() => {
    const matchedUsers = async () => {
      try {
        const response = await axios.get(`${server}/dashboard/match/${user}`, {
          params: { page, limit: 3 },
          withCredentials: true,
        });
        const res = await response.data;
        console.log(res);

        const newUsers = res.data.docs.filter(
          (user) => !userSet.current.has(user._id)
        );
        newUsers.forEach((user) => userSet.current.add(user._id));

        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setHasMore(res.data.hasNextPage);
      } catch (error) {
        console.error(error);
      }
    };

    matchedUsers();
  }, [user, page]);

  return (
    <div>
      {users.map((user, index) => {
        if (users.length === index + 1) {
          return (
            <div ref={lastUserElementRef} key={user._id}>
              <SearchPageCard user={user} />
            </div>
          );
        } else {
          return <SearchPageCard key={user._id} user={user} />;
        }
      })}
    </div>
  );
};

export default SearchPage;
