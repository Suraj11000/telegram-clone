import React from 'react';

const UserProfilePhoto = ({ firstName, lastName, size = 'default' }) => {
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : 'N';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  const profilePhotoStyle = {
    width: size === 'message' ? '30px' : '45px',
    height: size === 'message' ? '30px' : '45px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: size === 'message' ? '12px' : '24px',
    textTransform: 'uppercase',
  };

  return (
    <div style={profilePhotoStyle}>
      {getInitials(firstName, lastName)}
    </div>
  );
};

export default UserProfilePhoto;
