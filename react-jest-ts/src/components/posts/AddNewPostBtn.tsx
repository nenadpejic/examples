import React from 'react'

interface Props {
  onClick: () => void
}

const AddNewPostBtn: React.FC<Props> = ({ onClick }) => {

  const handleClickAddPost = () => {
    onClick()
  }

  return (
    <button onClick={handleClickAddPost}>Add New Post</button>
  );
}

export default AddNewPostBtn