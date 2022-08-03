/*
Prerequisites: 
- API: https://62e7d3dc93938a545bda1de1.mockapi.io/api/users
- Dependencies: React, axios and moment are free to be used


done 1. Create types for the users API call
done 2. Fetch all users and display them in a table by pressing the "Fetch users" button
done 3. Sort the table on creation-date by pressing the button "Sort users" (button toggles between ASC, DESC, No sort)
done 4. Transform the application, so that the users will be fetched on initialisation of the app
done 5. (extra) Show a list of all usernames, if you click on one of them, the user will be deleted in listA and put in listB and vice versa

*/

import "./styles.css";
import getAllUsers from "./api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Person = {
  createdAt: string;
  username: string;
  avatar: string;
  failedLogins: number;
  email: string;
  id: string;
};

export default function App() {
  const [structuredData, setStructuredData] = useState<Person[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<Person[]>([]);

  const getUsers = async () => {
    const res = await getAllUsers();

    setDeletedUsers([]);
    setStructuredData(res.data);
  };

  const deleteUserByName = (id: string) => {
    const newArr = structuredData.filter((person) => {
      return person.id !== id;
    });

    const deletedUser = structuredData.find((person) => person.id === id);

    if (deletedUser) {
      setDeletedUsers((prev) => [...prev, deletedUser]);
    }

    setStructuredData([...newArr]);
  };

  const reverseUser = (id: string) => {
    const newArr = deletedUsers.filter((person) => {
      return person.createdAt !== id;
    });

    const deletedUser = deletedUsers.find((person) => person.createdAt === id);

    setDeletedUsers([...newArr]);

    if (deletedUser) {
      setStructuredData([...structuredData, deletedUser]);
    }
  };

  const sortHandler = () => {
    const sortedData = structuredData?.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      return 0;
    });

    setStructuredData([...sortedData]);
  };

  const fetchHandler = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchHandler}>Fetch users</button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>E-mail</th>
            <th>Failed logins</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
          {structuredData?.map((person) => {
            return (
              <tr key={person.id}>
                <td>
                  <img src={person.avatar} alt="avatar" />
                </td>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.failedLogins}</td>
                <td>{dayjs(person.createdAt).format("MMM-DD-YYYY")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={sortHandler}>Sort users</button>

      <div className="extra">
        <ul className="listA">
          <li
            style={{
              color: "black",
              fontSize: "20px"
            }}
          >
            listItem Username
          </li>
          {deletedUsers.map((user) => (
            <li
              key={user.createdAt}
              className="li"
              onClick={() => reverseUser(user.createdAt)}
            >
              {user.username}
            </li>
          ))}
        </ul>

        <ul className="listB">
          <li
            style={{
              color: "black",
              fontSize: "20px"
            }}
          >
            listItem Username 2
          </li>

          {structuredData?.map((person) => (
            <li
              className="li"
              onClick={() => deleteUserByName(person.id)}
              key={person.id}
            >
              {person.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
