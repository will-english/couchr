import React from 'react';
import { useAuthContext } from '../auth/auth_provider';
import MyMovieLists from '../Watchlists/MyMovieLists';

export default function UserDetail() {
  const { token } = useAuthContext();
  const { userName } = useAuthContext();


  // useEffect(() => {
  //   fetchData();
  // }, [{ token }]);

  return (
    <div>
      <div className='row'>
        <h1 className='col'>{userName}</h1>
        <button className='btn btn-danger edit-user-button col-sm-2'>Edit User Information</button>
      </div>
      <div className=''>
        <ul>
          <MyMovieLists/>
        </ul>
      </div>
    </div>
  )
}
